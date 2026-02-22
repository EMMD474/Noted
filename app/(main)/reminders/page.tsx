"use client";

import React from 'react'
import { Box, Typography, Paper, Stack, Chip, alpha, LinearProgress } from "@mui/material";
import { CalendarMonth, Rocket, NotificationsActive, EventRepeat, Email, TimeToLeave } from "@mui/icons-material";
import CommingSoon from "@/components/CommingSoon";

const RemindersPage = () => {
  const upcomingFeatures = [
          {
              icon: <NotificationsActive sx={{ fontSize: 20 }} />,
              title: "Reminders",
              description: "Set reminders for important tasks and events",
          },
          {
              icon: <EventRepeat sx={{ fontSize: 20 }} />,
              title: "Recurring Tasks",
              description: "Create tasks that repeat daily, weekly, or monthly",
          },
          {
            icon: <Email sx={{ fontSize: 20 }} />,
            title: "Email Notifications",
            description: "Get Email notifcations of peding tasks and reminders",
          }
      ];
  
  return (
     <Box sx={{ py: 2 }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        }}
                    >
                        <TimeToLeave sx={{ color: "white", fontSize: 24 }} />
                    </Box>
                    <Box>
                        <Typography variant="h4" color="text.primary" sx={{ fontWeight: 700 }}>
                            Reminders
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            View your Reminders
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {/* Coming Soon Card */}
            <CommingSoon upCommingFeatures={upcomingFeatures} />
        </Box>
  )
}

export default RemindersPage