import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'

export const MenuTry = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const link = 'https://rjd9vng1-5173.euw.devtunnels.ms/'
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null)
    };
  return (
    <div>
        <Button onClick={handleClick}>
            Dashboard
        </Button>
        <Menu
        open={open}
        id='basic-menu'
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
            'araia-labelledby': 'basic-button',
        }}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My Account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
    </div>
  )
}
