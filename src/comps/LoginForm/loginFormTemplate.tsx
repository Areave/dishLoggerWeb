import React from 'react'
import './loginFormTemplate.scss'
import Form from "react-bootstrap/Form";
import ActionButton from "../actionButton/actionButton";
import {useCookies} from "react-cookie";
import apiService from "../../utils/apiService";

export const LoginFormTemplate: React.FC<any> = ({login, register, onEmailChange, onPasswordChange}) => {

    return <div className='loginForm'>
        <Form className='container'>
            <Form.Label>Authorization form</Form.Label>
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" placeholder="Enter login" onChange={onEmailChange}/>
                {/*<Form.Text className="text-muted">*/}
                {/*    We'll never share your email with anyone else.*/}
                {/*</Form.Text>*/}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={onPasswordChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me"/>
            </Form.Group>
            <div className="button_wrapper">
                <ActionButton onClick={login} label={'login'}/>
                <ActionButton onClick={register} label={'register'}/>
            </div>
        </Form>
    </div>
};