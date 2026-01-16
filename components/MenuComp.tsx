"use client";

import React, { useState } from "react";
import {
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    ListItemIcon,
    Typography,
} from "@mui/material";
import { Logout, Person } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";

export const MenuComp = () => {
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        signOut();
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <Avatar
                    sx={{ width: 40, height: 40, bgcolor: "primary.main" }}
                >
                    {session?.user?.name?.charAt(0).toUpperCase() || <Person />}
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        overflow: "visible",
                        mt: 1.5,
                        borderRadius: 2,
                        minWidth: 150,
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
            >
                <MenuItem disabled sx={{ opacity: "1 !important" }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                        {session?.user?.name}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Person fontSize="small" />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};
