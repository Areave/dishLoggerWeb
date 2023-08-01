import React from 'react'
import './loginFormTemplate.scss'
import Form from "react-bootstrap/Form";
import ActionButton from "../actionButton/actionButton";
import Loader from "../loader/loader";

export const LoginFormTemplate: React.FC<any> = ({login, register, onEmailChange, onPasswordChange, isLoading}) => {
    return <div className='login-form__container'>
        {isLoading ? ( <Loader/>) : (
            <Form className='login-form'>
                <Form.Label className='w-100 fs-2 text-center fw-bolder'>Authorization form</Form.Label>
                <Form.Group className="mb-3" controlId="formLogin">
                    <Form.Control type="text" placeholder="login" onChange={onEmailChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    {/*<Form.Label>Password</Form.Label>*/}
                    <Form.Control type="password" placeholder="password" onChange={onPasswordChange}/>
                </Form.Group>
                <div className="login-form__button-wrapper">
                    <ActionButton onClick={login} label={'login'}/>
                    <ActionButton onClick={register} label={'register'}/>
                </div>
            </Form>
        )}
    </div>
};