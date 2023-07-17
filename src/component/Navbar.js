import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const  signout= () => { window.location.href = "/login" }
function DrawerAppBar( props ) {
    const { window } = props;
    const [ mobileOpen, setMobileOpen ] = React.useState( false );

    const handleDrawerToggle = () => {
        setMobileOpen( ( prevState ) => !prevState );
    };
    const userLoggedIn = localStorage.getItem( "user" ) != null ? JSON.parse( localStorage.getItem( "user" ) ).name : ""
    const navigate = useNavigate();
    const goToCreate = () => { navigate( "create" ) }
    const goToitems = () => { navigate( "/ads" ) }
    const SignOUt = () => {
        localStorage.removeItem( 'user' )
        localStorage.removeItem( 'token' )
        setTimeout( () => {
            // navigate( "/login" )
            signout()
        }, 500 );
    }
    const drawer = (
        <Box onClick={ handleDrawerToggle } sx={ { textAlign: 'center' } }>
            <Typography variant="h6" sx={ { my: 2 } }>
                { userLoggedIn }
            </Typography>
            <Divider />
            <List>

                <ListItem onClick={ goToCreate } disablePadding>
                    <ListItemButton sx={ { textAlign: 'center' } }>
                        <ListItemText primary={ "Create" } />
                    </ListItemButton>
                </ListItem>
                <ListItem onClick={ goToitems } disablePadding>
                    <ListItemButton sx={ { textAlign: 'center' } }>
                        <ListItemText primary={ "Ads" } />
                    </ListItemButton>
                </ListItem>
                <ListItem onClick={ SignOUt } disablePadding>
                    <ListItemButton sx={ { textAlign: 'center' } }>
                        <ListItemText primary={ "Logout" } />
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={ { display: 'flex' } }>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={ handleDrawerToggle }
                        sx={ { mr: 2, display: { sm: 'none' } } }
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={ { flexGrow: 1, display: { xs: 'none', sm: 'block' } } }
                    >
                        { userLoggedIn }
                    </Typography>
                    <Box sx={ { display: { xs: 'none', sm: 'block' } } }>

                        <Button onClick={ goToCreate } sx={ { color: '#fff' } }>
                            Create
                        </Button>
                        <Button onClick={ goToitems } sx={ { color: '#fff' } }>
                            Ads
                        </Button>
                        <Button onClick={ SignOUt } color="error" sx={ { color: '#fff' } }>
                            Logout
                        </Button>

                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={ container }
                    variant="temporary"
                    open={ mobileOpen }
                    onClose={ handleDrawerToggle }
                    ModalProps={ {
                        keepMounted: true, // Better open performance on mobile.
                    } }
                    sx={ {
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    } }
                >
                    { drawer }
                </Drawer>
            </Box>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;
