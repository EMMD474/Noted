"use client";

import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Divider,
    ListItemIcon,
    Typography,
    AppBar,
    Toolbar,
    Container,
    Box,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction,
    Tooltip,
    Stack,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {
    SubjectOutlined,
    Menu as MenuIcon,
    Favorite,
    FormatListBulleted,
    CalendarMonth,
    Schedule,
    LabelImportant,
    Star,
    ScheduleOutlined,
    Close,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { CreateNote } from "@/components/CreateNote";
import { MenuComp } from "@/components/MenuComp";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [category, setCategory] = useState("");

    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

    const closeModal = () => setModalOpen(false);

    const openModal = (cat: string) => {
        setCategory(cat);
        setModalOpen(true);
    };

    const createList = [
        { text: "Todo", icon: <FormatListBulleted color="primary" />, category: "todo" },
        { text: "Note", icon: <SubjectOutlined color="primary" />, category: "note" },
        { text: "Reminder", icon: <ScheduleOutlined color="primary" />, category: "reminder" },
    ];

    const drawerItems = [
        { text: "Notes", icon: <SubjectOutlined color="primary" />, path: "/notes" },
        { text: "Todos", icon: <FormatListBulleted color="primary" />, path: "/todo" },
        { text: "Calendar", icon: <CalendarMonth color="primary" />, path: "/calendar" },
    ];

    const drawerItems2 = [
        { text: "Favourite", icon: <Favorite color="primary" />, path: "/favourite" },
        { text: "Urgent", icon: <Star color="primary" />, path: "/urgent" },
        { text: "Important", icon: <LabelImportant color="primary" />, path: "/important" },
        { text: "Pending", icon: <Schedule color="primary" />, path: "/pending" },
    ];

    const DRAWER_WIDTH = 280;

    if (status === "loading") {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Typography color="primary">Loading...</Typography>
            </Box>
        );
    }

    if (status === "unauthenticated") {
        router.push("/login");
        return null;
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: isMobile ? "100%" : `calc(100% - ${DRAWER_WIDTH}px)`,
                    ml: isMobile ? 0 : `${DRAWER_WIDTH}px`,
                    bgcolor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    {isMobile && (
                        <IconButton onClick={toggleDrawer(true)} edge="start" sx={{ mr: 2 }}>
                            <MenuIcon color="primary" />
                        </IconButton>
                    )}
                    <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700 }}>
                        {pathname === "/" ? "Dashboard" : pathname.substring(1).split('/')[0].charAt(0).toUpperCase() + pathname.substring(1).split('/')[0].slice(1)}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <MenuComp />
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        boxSizing: "border-box",
                        borderRight: "1px solid",
                        borderColor: "divider",
                        bgcolor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(20px)",
                    },
                }}
            >
                <Box sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                        Noted
                    </Typography>
                    {isMobile && (
                        <IconButton onClick={toggleDrawer(false)}>
                            <Close color="primary" />
                        </IconButton>
                    )}
                </Box>

                <Box sx={{ px: 2, mb: 2 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ opacity: 0.6, fontWeight: 700, px: 1 }}>
                        Home
                    </Typography>
                    <List sx={{ mt: 1 }}>
                        {drawerItems.map((item) => (
                            <ListItem
                                key={item.text}
                                disablePadding
                                sx={{ mb: 0.5 }}
                            >
                                <Box
                                    onClick={() => {
                                        router.push(item.path);
                                        if (isMobile) setDrawerOpen(false);
                                    }}
                                    sx={{
                                        width: "100%",
                                        cursor: "pointer",
                                        bgcolor: pathname === item.path ? "rgba(26, 46, 53, 0.08)" : "transparent",
                                        color: pathname === item.path ? "primary.main" : "text.secondary",
                                        "&:hover": { bgcolor: "rgba(26, 46, 53, 0.04)" },
                                        display: "flex",
                                        alignItems: "center",
                                        p: 1.25,
                                        px: 2,
                                        borderRadius: 2,
                                        transition: "0.2s",
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>{item.icon}</ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{ fontWeight: pathname === item.path ? 600 : 500 }}
                                    />
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box sx={{ px: 2 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ opacity: 0.6, fontWeight: 700, px: 1 }}>
                        Categories
                    </Typography>
                    <List sx={{ mt: 1 }}>
                        {drawerItems2.map((item) => (
                            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                                <Box
                                    onClick={() => {
                                        router.push(item.path);
                                        if (isMobile) setDrawerOpen(false);
                                    }}
                                    sx={{
                                        width: "100%",
                                        cursor: "pointer",
                                        bgcolor: pathname === item.path ? "rgba(26, 46, 53, 0.08)" : "transparent",
                                        color: pathname === item.path ? "primary.main" : "text.secondary",
                                        "&:hover": { bgcolor: "rgba(26, 46, 53, 0.04)" },
                                        display: "flex",
                                        alignItems: "center",
                                        p: 1.25,
                                        px: 2,
                                        borderRadius: 2,
                                        transition: "0.2s",
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>{item.icon}</ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{ fontWeight: pathname === item.path ? 600 : 500 }}
                                    />
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3, md: 4 },
                    width: isMobile ? "100%" : `calc(100% - ${DRAWER_WIDTH}px)`,
                    bgcolor: "background.default",
                }}
            >
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 2 }}>
                    {children}
                </Container>

                <SpeedDial
                    ariaLabel="SpeedDial create"
                    sx={{ position: "fixed", bottom: 32, right: 32 }}
                    icon={<SpeedDialIcon />}
                    FabProps={{
                        sx: {
                            bgcolor: "primary.main",
                            "&:hover": { bgcolor: "primary.dark" },
                            boxShadow: "0 8px 24px -6px rgba(0, 0, 0, 0.2)",
                        }
                    }}
                >
                    {createList.map((action) => (
                        <SpeedDialAction
                            key={action.text}
                            icon={action.icon}
                            tooltipTitle={action.text}
                            onClick={() => openModal(action.category)}
                        />
                    ))}
                </SpeedDial>
                <CreateNote
                    open={modalOpen}
                    closeModal={closeModal}
                    category={category}
                />
            </Box>
        </Box>
    );
}
