const https = require('https');

https.get('https://accounts.google.com/.well-known/openid-configuration', (res) => {
  console.log('Status Code:', res.statusCode);
  res.on('data', (d) => {
    // process.stdout.write(d);
  });
}).on('error', (e) => {
  console.error('Error:', e);
});
