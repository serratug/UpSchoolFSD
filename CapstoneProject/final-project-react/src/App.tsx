import './App.css'
import {createTheme, CSSObject, styled, Theme, ThemeProvider} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import * as React from "react";
import DrawerList from "./components/DrawerList.tsx";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Login, Logout} from "@mui/icons-material";
import DashboardPage from "./pages/DashboardPage.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import OrdersPage from "./pages/OrdersPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import NotificationsPage from "./pages/NotificationsPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import {AppUserContext} from "./context/StateContext.tsx";
import {LocalUser} from "./types/AuthTypes.ts";
import {useState} from "react";
import CrawlerLiveLogsPage from "./pages/CrawlerLiveLogsPage.tsx";
import {SignalRProvider} from "./context/SignalRContext.tsx";

const theme = createTheme({
    palette: {
        mode: 'dark',
        // Customize other palette colors if needed
    },
    // Add any other necessary theme configurations
});

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


function App() {

    const navigate = useNavigate();

    const [appUser, setAppUser] = useState<LocalUser | undefined>(undefined);

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLoginOnClick = () => {
        navigate("/login");
    };

    const handleLogout = () => {

        localStorage.removeItem("crawler_user");

        setAppUser(undefined);

        navigate("/login");

    }


    return (
        <AppUserContext.Provider value={{appUser, setAppUser}}>
            <SignalRProvider>
                <ThemeProvider theme={theme}>

                    <Box sx={{ display: 'flex' }}>

                        <CssBaseline />
                        <AppBar position="fixed" open={open}>
                            <Toolbar sx={{ displax: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleDrawerOpen}
                                        edge="start"
                                        sx={{
                                            marginRight: 5,
                                            ...(open && { display: 'none' }),
                                        }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="h6" noWrap component="div">
                                        Crawler
                                    </Typography>
                                </div>
                                <div>
                                    {!appUser &&
                                        <IconButton color="inherit" onClick={handleLoginOnClick}>
                                            <Typography variant="h6" component="h6" sx={{ marginRight: 1 }}>
                                                Login
                                            </Typography>
                                            <Login />
                                        </IconButton>
                                    }
                                    {appUser &&
                                        <IconButton color="inherit" onClick={handleLogout}>
                                            <Logout />
                                        </IconButton>
                                    }
                                </div>
                            </Toolbar>
                        </AppBar>
                        <Drawer variant="permanent" open={open}>
                            <DrawerHeader>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </DrawerHeader>
                            <Divider />
                            <DrawerList />

                        </Drawer>
                        <Box component="main"
                             sx={{
                                 width: "max-content",
                                 flexGrow: 1,
                                 p: 0,
                                 m: 0,
                                 alignItems: "flex-start",
                                 justifyContent: "flex-start",
                            }}
                        >

                            <Routes>
                                <Route path="/" element={<DashboardPage />} />
                                <Route path="/orders" element={<OrdersPage />} />
                                <Route path="/users" element={<UsersPage />} />
                                <Route path="/notifications" element={<NotificationsPage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/crawlerlivelogs" element={<CrawlerLiveLogsPage />} />
                            </Routes>

                        </Box>

                    </Box>

                </ThemeProvider>
            </SignalRProvider>
        </AppUserContext.Provider>
    )
}

export default App