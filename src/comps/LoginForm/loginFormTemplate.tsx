import React from 'react'
import './loginFormTemplate.scss'
import Form from "react-bootstrap/Form";
import ActionButton from "../actionButton/actionButton";
import Loader from "../loader/loader";

export const LoginFormTemplate: React.FC<any> = ({login, register, onEmailChange, onPasswordChange, isLoading}) => {
    return <div className='loginForm'>
        {isLoading ? ( <Loader/>) : (
            <Form className='container'>
                <Form.Label className='w-100 fs-2 text-center fw-bolder'>Authorization form</Form.Label>
                <Form.Group className="mb-3" controlId="formLogin">
                    <Form.Control type="text" placeholder="login" onChange={onEmailChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    {/*<Form.Label>Password</Form.Label>*/}
                    <Form.Control type="password" placeholder="password" onChange={onPasswordChange}/>
                </Form.Group>
                <div className="button_wrapper">
                    <ActionButton onClick={login} label={'login'}/>
                    <ActionButton onClick={register} label={'register'}/>
                </div>
            </Form>
        )}
    </div>
};