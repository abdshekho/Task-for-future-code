import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import avatar from "../../assets/avatar.png"
import { Button, CircularProgress, TextField } from '@mui/material';
import { getStores, postAd } from '../../api/postApi';
import { useDispatch, useSelector } from 'react-redux';
import { notifyError, notifySuccess } from '../../hooks/useNotification';
import { ToastContainer } from 'react-toastify';

export default function AddAd() {
    const [ type, settype ] = useState( '' );
    const [ img, setImg ] = useState( avatar );
    const [ store, setStore ] = useState( false );
    const [ link, setLink ] = useState( false );
    const [ imageState, setImageState ] = useState( true );
    const [ slectedFile, setSlectedFile ] = useState( null )
    const [ titleAr, setTitleAr ] = useState( "" );
    const [ titleEn, setTitleEn ] = useState( "" );
    const [ descriptionAr, setDescriptionAr ] = useState( "" );
    const [ descriptionEn, setDescriptioeEn ] = useState( "" );
    const [ tag, setTag ] = useState( "" );
    const [ validTo, setValidTo ] = useState( "2023-09-13" );
    const [ storeSelect, setStoreSelect ] = useState( "" )
    const [ linkField, setLinkField ] = useState( "" )

    const formData = new FormData();

    const dispatch = useDispatch()
    const stores = useSelector( state => state.getAllStores.stores );

    function onImageChange( event ) {
        if ( event.target.files && event.target.files[ 0 ] )
            setImg( URL.createObjectURL( event.target.files[ 0 ] ) )
        setSlectedFile( event.target.files[ 0 ] )
    }

    useEffect( () => {
        const get = async () => {
            await dispatch( getStores( "api/manage/stores" ) )
        }
        get();
    }, [] )
    const handleChangeType = ( event ) => {
        settype( event.target.value );
        if ( event.target.value === "image" ) {
            setStore( false )
            setLink( false )
            setImageState( true )
        }
        if ( event.target.value === "store" ) {
            setStore( true )
            setLink( false )
            setImageState( true )
        }
        if ( event.target.value === "link" ) {
            setStore( false )
            setLink( true )
            setImageState( true )
        }
    };
    const handleChangeStore = ( event ) => { setStoreSelect( event.target.value ) }


    const handelSubmit = async () => {
        if ( !titleAr || !titleEn || !descriptionAr || !descriptionEn || !tag ) {
            notifyError( "please complate all field" )
            return
        }
        formData.append( "title_ar", titleAr )
        formData.append( "title_en", titleEn )
        formData.append( "description_ar", descriptionAr )
        formData.append( "description_en", descriptionEn )
        formData.append( "tag", tag )
        formData.append( "valid_to", validTo )
        // formData.append( "image", img )
        formData.append( "image", slectedFile )
        if ( imageState && linkField ) {
            formData.append( "link", linkField )
        }
        if ( imageState && store ) {
            formData.append( "store_id", storeSelect )
        }
        await dispatch( postAd( [ "api/manage/ads", formData ] ) )

    }


    const addAds = useSelector( state => state.addAds.response );
    const LoadingAds = useSelector( state => state.addAds.isLoading );


    useEffect( () => {
        if ( !LoadingAds && addAds && addAds.data && addAds.status && addAds.status === 1 ) {
            notifySuccess( "Add advertisements success" )
            setTimeout( () => {
                window.location.href = "/ads"
            }, 1000 )

        }

    }, [ LoadingAds ] )

    return (

        <div className='container mt-5 mb-5 d-flex flex-column gap-4'>
            <Box sx={ { minWidth: 120 } }>
                <div className='my-4'>
                    <TextField id="outlined-basic" label="title-ar" variant="outlined" onChange={ ( e ) => setTitleAr( e.target.value ) } fullWidth />
                </div>
                <div className='my-4'>
                    <TextField id="outlined-basic" label="title-en" variant="outlined" onChange={ ( e ) => setTitleEn( e.target.value ) } fullWidth />
                </div>
                <div className='my-4'>
                    <TextField id="outlined-basic" label="description_ar" variant="outlined" onChange={ ( e ) => setDescriptionAr( e.target.value ) } fullWidth />
                </div>
                <div className='my-4'>
                    <TextField id="outlined-basic" label="description_en" variant="outlined" onChange={ ( e ) => setDescriptioeEn( e.target.value ) } fullWidth />
                </div>
                <div className='my-4'>
                    <TextField id="outlined-basic" label="tag" variant="outlined" onChange={ ( e ) => setTag( e.target.value ) } fullWidth />
                </div>
                <div className='my-4'>
                    <TextField id="outlined-basic" label="Valid_to" type='date' value={ validTo } onChange={ ( e ) => setValidTo( e.target.value ) } variant="outlined" fullWidth />
                </div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">type advertisements</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={ type } label="type advertisements" onChange={ handleChangeType }>
                        <MenuItem value={ "image" }>Image</MenuItem>
                        <MenuItem value={ "store" }>Store</MenuItem>
                        <MenuItem value={ "link" }>Link</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            { imageState ?
                <div className='d-flex flex-column mt-5'>
                    { img === avatar ? <span className=''>select photo</span> : null }
                    <label htmlFor='upload-photo' >
                        <img src={ img } alt='' className='btn w-25 h-25' height="100px" width="120px" />
                    </label>
                    <input id='upload-photo' type='file' name='photo' onChange={ onImageChange } className='d-none' />
                </div>
                : null }

            { store ?
                <div className='container mt-5'>
                    <Box sx={ { minWidth: 120 } }>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">store</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={ storeSelect } label="store" onChange={ handleChangeStore }>
                                { stores && stores.data && stores.data.data ?
                                    stores.data.data.map( ( item, index ) => {
                                        return <MenuItem key={ index } value={ item.id }>{ item.store_name }</MenuItem>
                                    } )
                                    : <MenuItem value={ "def" }>def</MenuItem> }

                            </Select>
                        </FormControl>
                    </Box>
                </div>
                : null }
            { link ?
                <div className='container mt-5'>
                    <div className='my-4'>
                        <TextField id="outlined-basic" label="Link" variant="outlined" onChange={ ( e ) => setLinkField( e.target.value ) } fullWidth />
                    </div>
                </div>
                : null }

            { LoadingAds ? <CircularProgress /> : <div></div> }
            <div className="d-flex justify-content-center my-4">
                <Button type="submit" variant="contained" onClick={ handelSubmit }>
                    Submit
                </Button>
            </div>
            <ToastContainer />
        </div>
    );
}