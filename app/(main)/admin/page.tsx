import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import {
    alpha,
    Avatar,
    Box,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import {
    AdminPanelSettings,
    CheckCircleOutline,
    DescriptionOutlined,
    Groups2Outlined,
    PlaylistAddCheckCircleOutlined,
    TrendingUpOutlined,
} from "@mui/icons-material";
import { authOptions } from "@/lib/auth-options";
import { getAdminDashboardData, isAdminSessionUser } from "@/lib/admin";

const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login");
    }

    if (!isAdminSessionUser(session.user)) {
        redirect("/notes");
    }

    const { stats, users, recentUsers, mostActiveUsers } = await getAdminDashboardData();

    const statCards = [
        {
            label: "Total users",
            value: stats.totalUsers,
            icon: <Groups2Outlined sx={{ color: "white" }} />,
            tone: "linear-gradient(135deg, #1a2e35 0%, #3a5058 100%)",
        },
        {
            label: "Verified accounts",
            value: stats.verifiedUsers,
            icon: <CheckCircleOutline sx={{ color: "white" }} />,
            tone: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
        },
        {
            label: "Notes created",
            value: stats.totalNotes,
            icon: <DescriptionOutlined sx={{ color: "white" }} />,
            tone: "linear-gradient(135deg, #4338ca 0%, #6366f1 100%)",
        },
        {
            label: "Pending todos",
            value: stats.pendingTodos,
            icon: <PlaylistAddCheckCircleOutlined sx={{ color: "white" }} />,
            tone: "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)",
        },
    ];

    return (
        <Box sx={{ py: 2 }}>
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, #1a2e35 0%, #6366f1 100%)",
                            boxShadow: "0 18px 45px -24px rgba(26, 46, 53, 0.8)",
                        }}
                    >
                        <AdminPanelSettings sx={{ color: "white", fontSize: 28 }} />
                    </Box>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            Admin dashboard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            View users, monitor activity, and track workspace health.
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
                    <Chip label={`${stats.adminUsers} Admins`} color="primary" variant="outlined" />
                    <Chip label={`${stats.totalTodos} Total todos`} variant="outlined" />
                    <Chip label={`${users.length} User records`} variant="outlined" />
                </Stack>
            </Box>

            <Grid container spacing={3} sx={{ mb: 3 }}>
                {statCards.map((card) => (
                    <Grid key={card.label} size={{ xs: 12, sm: 6, lg: 3 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                color: "white",
                                background: card.tone,
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: "auto -24px -24px auto",
                                    width: 96,
                                    height: 96,
                                    borderRadius: "50%",
                                    bgcolor: "rgba(255,255,255,0.08)",
                                }}
                            />
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        {card.label}
                                    </Typography>
                                    <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
                                        {card.value}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.14)", width: 44, height: 44 }}>
                                    {card.icon}
                                </Avatar>
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, xl: 8 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 4,
                            border: "1px solid",
                            borderColor: "divider",
                            overflow: "hidden",
                        }}
                    >
                        <Box sx={{ px: 3, py: 2.5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                All users
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Account summary with ownership and content totals.
                            </Typography>
                        </Box>
                        <Divider />
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell align="right">Notes</TableCell>
                                        <TableCell align="right">Todos</TableCell>
                                        <TableCell>Joined</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id} hover>
                                            <TableCell>
                                                <Stack spacing={0.5}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                        {user.username ?? user.name ?? "Unnamed user"}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {user.email}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={user.role}
                                                    size="small"
                                                    color={user.role === "ADMIN" ? "primary" : "default"}
                                                    variant={user.role === "ADMIN" ? "filled" : "outlined"}
                                                />
                                            </TableCell>
                                            <TableCell align="right">{user.noteCount}</TableCell>
                                            <TableCell align="right">{user.todoCount}</TableCell>
                                            <TableCell>{formatDate(user.createdAt)}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={user.emailVerified ? "Verified" : "Pending"}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: user.emailVerified
                                                            ? alpha("#10b981", 0.12)
                                                            : alpha("#f59e0b", 0.14),
                                                        color: user.emailVerified ? "#047857" : "#b45309",
                                                        fontWeight: 600,
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6, xl: 4 }}>
                    <Stack spacing={3}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                                <TrendingUpOutlined color="primary" />
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        Most active users
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Ranked by total notes and todos.
                                    </Typography>
                                </Box>
                            </Stack>
                            <List disablePadding>
                                {mostActiveUsers.map((user, index) => (
                                    <ListItem key={user.id} disableGutters sx={{ py: 1.25 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: alpha("#1a2e35", 0.08), color: "primary.main" }}>
                                                {index + 1}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={user.username ?? user.name ?? user.email}
                                            secondary={`${user.totalItems} items created`}
                                        />
                                        <Chip label={`${user.noteCount}/${user.todoCount}`} size="small" />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                Recent signups
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Latest users created in the workspace.
                            </Typography>
                            <List disablePadding>
                                {recentUsers.map((user) => (
                                    <ListItem key={user.id} disableGutters sx={{ py: 1.25 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: alpha("#6366f1", 0.12), color: "secondary.main" }}>
                                                {(user.username ?? user.email).charAt(0).toUpperCase()}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={user.username ?? user.name ?? "New user"}
                                            secondary={`${user.email} • ${formatDate(user.createdAt)}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
