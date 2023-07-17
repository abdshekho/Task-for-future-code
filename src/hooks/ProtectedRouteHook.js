import  { useEffect, useState } from 'react'

const ProtectedRouteHook = () => {

    const [ userData, setUserData ] = useState( JSON.parse( localStorage.getItem( "user" ) ) )
    const [ token, setToken ] = useState( localStorage.getItem( "token" ) )
    const [ isAdmin, setIsAdmin ] = useState( true )

    useEffect( () => {
        if ( userData != null && token != null ) {
            setIsAdmin( true )

        } else {
            setIsAdmin( false )
        }

    }, [] )



    return [ isAdmin, userData ]
}

export default ProtectedRouteHook