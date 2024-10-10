import { AccountBoxOutlined, AccountCircle, Logout, Person, Settings } from '@mui/icons-material'
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import React, { useState } from 'react'

export const MenuComp = ({ logout }) => {
    const [anchor, setAnchor] = useState(null)
    const open = Boolean(anchor)

    const handleOpen = (event) => {
        setAnchor(event.currentTarget)
    }  

    const handleClose = () => {
        setAnchor(null)
    }
  return (
    <div>
         <IconButton id="btn" onClick={handleOpen}>
            <Tooltip title="Account">
              <Avatar sx={{bgcolor: 'teal'}}>
                E
              </Avatar>
            </Tooltip>
          </IconButton>
        <Menu
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        MenuListProps={{
            "aria-labelledby": "btn"
        }}>
            <MenuItem onClick={handleClose} sx={{color: 'GrayText'}}>
                <ListItemIcon>
                    <AccountCircle sx={{color: 'teal'}} />
                </ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{color: 'GrayText'}}>
                <ListItemIcon>
                    <Settings sx={{color: 'teal'}} />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={logout} sx={{color: 'GrayText'}}>
                <ListItemIcon>
                    <Logout sx={{color: 'teal'}} />
                </ListItemIcon>
                Logout
            </MenuItem>
            
        </Menu>
    </div>
  )
}
