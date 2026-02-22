import React from 'react'
import { Box, Typography, Stack } from '@mui/material'
import { TimeToLeave } from '@mui/icons-material'

const Heading = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => {
    return (
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
                    {icon}
                </Box>
                <Box>
                    <Typography variant="h4" color="text.primary" sx={{ fontWeight: 700 }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export default Heading