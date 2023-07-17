import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAd } from '../api/postApi';
import { notifyError, notifySuccess } from '../hooks/useNotification';
import { ToastContainer } from 'react-toastify';

export default function Item( { id, title_ar, title_en, description_ar, description_en, valid_to, tag } ) {
    const navgite = useNavigate();
    const dispatch = useDispatch()
    const goToEdit = () => {
        // navgite( `/Edit/${id}` )
        navgite(
            `/Edit/${id}`,
            {
                state: {
                    id, title_ar, title_en, description_ar, description_en, valid_to, tag
                }
            }
        )
    }
    const [ open, setOpen ] = React.useState( false );
    const resDelete = useSelector( state => state.deleteAds.response )
    const isLoading = useSelector( state => state.deleteAds.isLoading )
    const handleClickOpen = () => { setOpen( true ); };
    const handleClose = () => { setOpen( false ); };
    const goToDelete = async () => {
        await dispatch( deleteAd( `api/manage/ads/${id}` ) )
        notifySuccess( "Ad is deleted" )
        handleClose();
        window.location.href = "/"
    }
    return (

        <div>

            <Card sx={ { maxWidth: 345 } }>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        alt={ title_en }
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            { title_en }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            { description_en }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            { valid_to }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={ goToEdit }>
                        Edite
                    </Button>

                    <Button size="small" color="error" onClick={ handleClickOpen }>
                        Delete
                    </Button>
                </CardActions>
                <Dialog
                    open={ open }
                    onClose={ handleClose }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        { " Are you sure to delete this ad?" }
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This process cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        { isLoading ? <CircularProgress /> : <div></div> }

                        <Button onClick={ handleClose } >Cancel</Button>
                        <Button onClick={ goToDelete } color="error">Yes</Button>
                    </DialogActions>
                </Dialog>

            </Card>
            <ToastContainer />
        </div>

    );
}