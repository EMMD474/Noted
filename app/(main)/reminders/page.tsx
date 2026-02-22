"use client";

import React from 'react'
import { Box, Typography, Paper, Stack, Chip, alpha, LinearProgress } from "@mui/material";
import { CalendarMonth, Rocket, NotificationsActive, EventRepeat, Email, TimeToLeave } from "@mui/icons-material";
import CommingSoon from "@/components/CommingSoon";
import Heading from '@/components/Heading';

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
           <Heading title="Reminders" description="View your Reminders" icon={<NotificationsActive sx={{ color: "white", fontSize: 24 }} />} />

            {/* Coming Soon Card */}
            <CommingSoon upCommingFeatures={upcomingFeatures} />
        </Box>
  )
}

export default RemindersPage