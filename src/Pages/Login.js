import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginSlice } from "../redux/postSlice";
import { postLogin } from "../api/postApi";
import axios from "axios";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { notifyError, notifySuccess } from "../hooks/useNotification";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = Joi.object( {
    phone: Joi.string().min( 12 ).max( 12 ).required().label( "Phone" ),
    password: Joi.string().min( 8 ).max( 40 ).required().label( "Password" ),
} );
const Login = () => {
    const { register, handleSubmit, formState: { errors, isValid }, } = useForm( { resolver: joiResolver( schema ) } );
    const navgite = useNavigate()


    const dispatch = useDispatch();
    const posts = useSelector( state => state.loginSlice.login );
    const isLoading = useSelector( state => state.loginSlice.isLoading );
    const erorr = useSelector( state => state.loginSlice.erorr );
    const SubmitLogin = async ( data ) => {

        await dispatch( postLogin( [ "api/login", { ...data, account_type: "admin" } ] ) );
    }
    useEffect( () => {
        if ( !isLoading ) {
            if ( posts && posts.status && posts.status === 1 && posts.data && posts.data.token && posts.data.user && erorr === null ) {
                notifySuccess( "Success login" )
                localStorage.setItem( "token", posts.data.token )
                localStorage.setItem( "user", JSON.stringify( posts.data.user ) )
                setTimeout( () => {
                    window.location.href = "/"
                }, 1000 )

            }
            else if ( erorr === "Rejected" ) {
                notifyError( "Error in login" )
            }
        }
    }, [ isLoading ] )



    return (
        <div className="container ">
            <div className="d-flex flex-column align-items-center  justify-content-center vh-100 ">

                <form onSubmit={ handleSubmit( ( data ) => SubmitLogin( data ) ) } className="text-bg-light p-5">
                <h1 className="mb-5 text-center">Login</h1>
                    <div className="mb-3">
                        {/* <label htmlFor="phone" className="form-label">phone address</label> */ }
                        <TextField   { ...register( "phone" ) } type="number" className="" id="text" label="Phone" fullWidth />
                        { errors.phone && ( <p className="text-danger"> { errors.phone.message } </p> ) }
                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="password" className="form-label">Password</label> */ }
                        <TextField { ...register( "password" ) } type="password" className="" id="password" label="password" fullWidth />
                        { errors.password && ( <p className="text-danger"> { errors.password.message } </p> ) }
                    </div>
                    {/* disabled={!isValid} */ }
                    <div className="d-flex justify-content-center ">
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;