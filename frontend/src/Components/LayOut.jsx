import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  ListItemIcon,
  ListItemButton,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  Container,
  Box,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Tooltip,
  Stack,
  MenuItem,
  Button,
} from "@mui/material";
import {
  AddCircleOutlineOutlined,
  SubjectOutlined,
  Menu,
  Favorite,
  FormatListBulleted,
  CalendarMonth,
  Schedule,
  LabelImportant,
  Star,
  ScheduleOutlined,
  Close,
  Person,
  Cancel,
  Logout,
} from "@mui/icons-material";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../scss/styles.css"
import { CreateNote } from "./CreateNote";
import { MenuComp } from "./MenuComp";
import { useAuth } from "./AuthProvider";

export const LayOut = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 500px)");
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const { setIsLogged } = useAuth()


  const handleDrawer = (opening) => () => setOpen(opening);

  const openModal = (category) => {
    setCategory(category);
    setModal(true);
  };
  const closeModal = () => setModal(false);

  const createList = [
    { text: "Todo", icon: <FormatListBulleted color="primary" />, category: "todo" },
    { text: "Note", icon: <SubjectOutlined color="primary" />, category: "note" },
    { text: "Reminder", icon: <ScheduleOutlined color="primary" />, category: "reminder" },
  ];

  const drawerItems = [
    { text: "Notes", icon: <SubjectOutlined color="primary" />, path: "/" },
    { text: "Todos", icon: <FormatListBulleted color="primary" />, path: "/todo" },
    { text: "View Calendar", icon: <CalendarMonth color="primary" />, path: "/calendar" },
  ];

  const drawerItems2 = [
    { text: "Favourite", icon: <Favorite color="primary" />, path: "/" },
    { text: "Urgent", icon: <Star color="primary" />, path: "/create" },
    { text: "Important", icon: <LabelImportant color="primary" />, path: "/create" },
    { text: "Pending", icon: <Schedule color="primary" />, path: "/create" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('authToken')
    setIsLogged(false)
    navigate('/login')
  }


  return (
    <Box className="container">
      <AppBar
        elevation={0}
        className="app"
        sx={{ width: isMobile ? "100%" : "calc(100% - 230px)", bgcolor: "#fff" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {isMobile ? (
            <IconButton onClick={handleDrawer(true)}>
              <Menu sx={{ color: "teal" }} />
            </IconButton>
          ) : (
            ""
          )}
          <Typography variant="h5" color="primary">
            Time
          </Typography>

         <MenuComp logout={handleLogout} />
        </Toolbar>
      </AppBar>
      {/* Drawer component  */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={handleDrawer(false)}
      >
        <Box sx={{ width: 230 }} role="presentation" onClick={handleDrawer(false)}>
          <Stack sx={{
            width: '100%',
            hieght: '1em',
            display: "flex",
            flexDirection: "row",
            justifyContent: 'space-between',
            padding: '.3em',
            paddingLeft: '1em',
            alignItems: 'center',
          }}>
            <Typography variant="h5" component="div" color="primary" >
              Noted
            </Typography>
              <IconButton sx={{display: isMobile? '': 'none'}} onClick={() => {handleDrawer(false)}}>
                <Close sx={{color: 'teal'}} />
              </IconButton>
          </Stack>
          <Divider />
          <List>
            {drawerItems.map((item, index) => (
              <ListItem 
                button 
                key={index} 
                sx={{bgcolor: location.pathname === item.path? "whitesmoke": "white"}} 
                onClick={() => handleNavigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {drawerItems2.map((item, index) => (
              <ListItem button key={index} onClick={() => handleNavigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Container
        sx={{
          width: isMobile ? "100%" : "calc(100% - 230px)",
          display: "flex",
          justifyContent: "center",
          marginTop: "5em",
          marginLeft: isMobile ? 0 : "14em"
        }}
        className="content"
      >
        <Outlet />
        <Box sx={{ position: "fixed", bottom: "3em", right: "3em" }}>
          <Tooltip title="Create">
            <SpeedDial ariaLabel="speed dial" icon={<SpeedDialIcon />}>
              {createList.map((action) => (
                <SpeedDialAction
                  key={action.text}
                  icon={action.icon}
                  tooltipTitle={action.text}
                  onClick={() => openModal(action.category)}
                />
              ))}
            </SpeedDial>
          </Tooltip>
        </Box>
        <CreateNote
          open={modal}
          closeModal={closeModal}
          category={category}
          mobile={isMobile}
        />
      </Container>
    </Box>
  );
};
