import React, { useEffect } from 'react'
import Item from '../../component/Item'
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../api/postApi';
import { CircularProgress, Typography } from '@mui/material';


function Items() {
    const dispatch = useDispatch()
    const items = useSelector( state => state.getAllItems.items );
    const isLoading = useSelector( state => state.getAllItems.isLoading );
    const erorr = useSelector( state => state.getAllItems.erorr );

    useEffect( () => {
        const get = async () => {
            await dispatch( getItems( "api/manage/ads" ) )
        }
        get();
    }, [] )
    return (
        <div className="container d-flex justify-content-center flex-wrap gap-4 mt-5">
            { !isLoading ? items && items.data && items.data.data ? items.data.data.map( ( item, index ) => {
                return <Item key={ index } id={ item.id } tag={item.tag} title_ar={ item.title_ar } title_en={ item.title_en } description_ar={ item.description_ar } description_en={ item.description_en } valid_to={ item.valid_to } />
            } )
                : <div></div>
                : <CircularProgress />
            }
        </div>
    )
}

export default Items