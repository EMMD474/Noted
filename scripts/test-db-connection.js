require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 5000,
});

(async () => {
    const originalUrl = process.env.DATABASE_URL;

    console.log('--- Test 1: Original Connection String ---');
    await testConnection(originalUrl);

    // Try modifying port to 5432 and removing pgbouncer param
    let altUrl = originalUrl.replace(':6543', ':5432').replace('?pgbouncer=true', '').replace('&pgbouncer=true', '');
    // If it didn't have 6543, maybe it already had 5432, but let's just be sure we act if it was 6543
    if (originalUrl.includes(':6543')) {
        console.log('\n--- Test 2: Alternative Port 5432 (Direct) ---');
        await testConnection(altUrl);
    }

    // Try authenticating to the direct Supabase host (db.<ref>.supabase.co)
    // Extract project ref from user: postgres.<ref>
    const userMatch = originalUrl.match(/\/\/([^:]+):/);
    if (userMatch) {
        const user = userMatch[1];
        const parts = user.split('.');
        if (parts.length === 2 && parts[0] === 'postgres') {
            const projectRef = parts[1];
            const directHost = `db.${projectRef}.supabase.co`;
            // Construct direct URL: postgres://postgres:<pass>@db.<ref>.supabase.co:5432/postgres
            // We need to replace user, host, port
            let directUrl = originalUrl
                .replace(user, 'postgres')
                .replace(/@([^/]+)/, `@${directHost}:5432`)
                .replace('?pgbouncer=true', '')
                .replace('&pgbouncer=true', '');

            console.log(`\n--- Test 3: Direct Host (${directHost}) ---`);
            await testConnection(directUrl);
        }
    }

    // Test 4: Check if port 443 is open on Pooler (Connectivity Check)
    // aws-1-eu-west-1.pooler.supabase.com on 443
    const poolerHost = originalUrl.match(/@([^:/]+)/)[1];
    if (poolerHost) {
        console.log(`\n--- Test 4: Connectivity Check (Port 443) on ${poolerHost} ---`);
        const canConnect = await checkPort(poolerHost, 443);
        console.log(canConnect ? '✅ Port 443 is OPEN (Network is reachable)' : '❌ Port 443 is CLOSED/TIMEOUT');
    }

})();

const net = require('net');
function checkPort(host, port) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(2000);
        socket.on('connect', () => {
            socket.destroy();
            resolve(true);
        });
        socket.on('timeout', () => {
            socket.destroy();
            resolve(false);
        });
        socket.on('error', (err) => {
            socket.destroy();
            resolve(false);
        });
        socket.connect(port, host);
    });
}

async function testConnection(connectionString) {
    const pool = new Pool({
        connectionString,
        connectionTimeoutMillis: 5000,
    });
    try {
        // Redact password more carefully for log
        const redacted = connectionString.replace(/(:[^:@\/]+)(@)/, ':****$2');
        console.log('Testing connection to:', redacted);
        const client = await pool.connect();
        const res = await client.query('SELECT NOW()');
        console.log('✅ Connection successful:', res.rows[0]);
        client.release();
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
        if (err.cause) console.error('   Cause:', err.cause);
    }
}
