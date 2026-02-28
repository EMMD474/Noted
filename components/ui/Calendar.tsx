"use client"
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Chip, Stack, Typography, alpha, useMediaQuery, useTheme } from "@mui/material";

const Calendar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                boxShadow: "0 20px 38px -28px rgba(15, 23, 42, 0.6)",
            }}
        >
            <Box
                sx={{
                    px: { xs: 2, md: 3 },
                    py: { xs: 2, md: 2.5 },
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(
                        theme.palette.secondary.main,
                        0.08
                    )} 100%)`,
                }}
            >
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between">
                    <Box>
                        <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                            Monthly Planner
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Drag events, switch views, and plan your week at a glance.
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Chip size="small" label="Month" color="primary" variant="outlined" />
                        <Chip size="small" label="Week" color="primary" variant="outlined" />
                        <Chip size="small" label="Day" color="primary" variant="outlined" />
                    </Stack>
                </Stack>
            </Box>

            <Box
                sx={{
                    p: { xs: 1.25, md: 2 },
                    "& .fc": {
                        "--fc-border-color": theme.palette.divider,
                        "--fc-today-bg-color": alpha(theme.palette.secondary.main, 0.08),
                        "--fc-page-bg-color": theme.palette.background.paper,
                        "--fc-button-bg-color": theme.palette.primary.main,
                        "--fc-button-border-color": theme.palette.primary.main,
                        "--fc-button-hover-bg-color": theme.palette.primary.dark,
                        "--fc-button-hover-border-color": theme.palette.primary.dark,
                        "--fc-button-active-bg-color": theme.palette.secondary.main,
                        "--fc-button-active-border-color": theme.palette.secondary.main,
                        "--fc-event-bg-color": alpha(theme.palette.primary.main, 0.9),
                        "--fc-event-border-color": "transparent",
                        "--fc-event-text-color": "#ffffff",
                    },
                    "& .fc .fc-toolbar.fc-header-toolbar": {
                        marginBottom: 2,
                        gap: 1,
                        flexWrap: "wrap",
                    },
                    "& .fc .fc-toolbar-title": {
                        color: theme.palette.text.primary,
                        fontWeight: 700,
                        fontSize: { xs: "1rem", md: "1.2rem" },
                        letterSpacing: "-0.01em",
                    },
                    "& .fc .fc-button": {
                        textTransform: "capitalize",
                        borderRadius: "10px",
                        boxShadow: "none",
                        fontWeight: 600,
                        padding: "0.45rem 0.7rem",
                    },
                    "& .fc .fc-button:focus": {
                        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.18)}`,
                    },
                    "& .fc .fc-col-header-cell-cushion": {
                        color: theme.palette.text.secondary,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        fontSize: "0.72rem",
                        padding: "0.75rem 0.4rem",
                    },
                    "& .fc .fc-daygrid-day-number": {
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        padding: "0.45rem",
                    },
                    "& .fc .fc-daygrid-day.fc-day-today": {
                        boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.secondary.main, 0.35)}`,
                    },
                    "& .fc .fc-event": {
                        borderRadius: "8px",
                        paddingInline: "2px",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                    },
                    "& .fc .fc-daygrid-day-frame": {
                        minHeight: { xs: "84px", md: "108px" },
                    },
                    "& .fc-theme-standard td, & .fc-theme-standard th": {
                        borderColor: alpha(theme.palette.primary.main, 0.12),
                    },
                }}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    height="auto"
                    aspectRatio={isMobile ? 0.9 : 1.5}
                    dayMaxEventRows={2}
                    fixedWeekCount={false}
                    headerToolbar={
                        isMobile
                            ? { left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek" }
                            : { left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay" }
                    }
                />
            </Box>
        </Box>
    );
};

export default Calendar;
