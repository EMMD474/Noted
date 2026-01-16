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
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

    const DRAWER_WIDTH = 240;

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
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: isMobile ? "100%" : `calc(100% - ${DRAWER_WIDTH}px)`,
                    ml: isMobile ? 0 : `${DRAWER_WIDTH}px`,
                    bgcolor: "background.paper",
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
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                        {pathname === "/" ? "Dashboard" : pathname.substring(1).charAt(0).toUpperCase() + pathname.slice(2)}
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
                    },
                }}
            >
                <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                        Noted
                    </Typography>
                    {isMobile && (
                        <IconButton onClick={toggleDrawer(false)}>
                            <Close color="primary" />
                        </IconButton>
                    )}
                </Box>
                <Divider />
                <List>
                    {drawerItems.map((item) => (
                        <ListItem
                            key={item.text}
                            disablePadding
                        >
                            <Box
                                onClick={() => router.push(item.path)}
                                sx={{
                                    width: "100%",
                                    cursor: "pointer",
                                    bgcolor: pathname === item.path ? "action.selected" : "transparent",
                                    "&:hover": { bgcolor: "action.hover" },
                                    display: "flex",
                                    alignItems: "center",
                                    p: 1.5,
                                    borderRadius: 1,
                                    mx: 1,
                                    my: 0.5,
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ my: 1 }} />
                <List>
                    {drawerItems2.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <Box
                                onClick={() => router.push(item.path)}
                                sx={{
                                    width: "100%",
                                    cursor: "pointer",
                                    bgcolor: pathname === item.path ? "action.selected" : "transparent",
                                    "&:hover": { bgcolor: "action.hover" },
                                    display: "flex",
                                    alignItems: "center",
                                    p: 1.5,
                                    borderRadius: 1,
                                    mx: 1,
                                    my: 0.5,
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: isMobile ? "100%" : `calc(100% - ${DRAWER_WIDTH}px)`,
                    bgcolor: "background.default",
                }}
            >
                <Toolbar />
                <Container maxWidth="lg">
                    {children}
                </Container>

                <SpeedDial
                    ariaLabel="SpeedDial create"
                    sx={{ position: "fixed", bottom: 32, right: 32 }}
                    icon={<SpeedDialIcon />}
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
