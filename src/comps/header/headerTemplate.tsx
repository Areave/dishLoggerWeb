import React from 'react'
import './headerTemplate.scss'
import {Types} from '../../utils/types'
import PageTitleComp from "../headerTitleComp/headerTitleComp";
import {Navigation} from "../navigation/navigation";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavDropdown} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from '../../assets/images/logo.png';
import {useNavigate} from "react-router";

export const HeaderTemplate: React.FC<Types.ComponentProps> = (props) => {
    // return <div className='header'>
    //     <PageTitleComp title={'DishLogger App'}/>
    //     <Navigation/>
    // </div>
    const navigate = useNavigate();

    return <div>
        <Navbar className="header p-3" expand="sm">
            <Container>
                <div className='img_container' onClick={() => {navigate('/')}}>
                    <img src={Logo}/>
                </div>
                {/*<Row>*/}

                    {/*<Col className='d-flex align-items-center'>*/}
                    {/*    <p className='text-nowrap mb-0'>DishLogger App</p>*/}
                    {/*</Col>*/}
                {/*</Row>*/}
                <Navigation/>
                {/*<Navbar.Brand href="/" className='text-lg-start'>*/}

                {/*    {' '}*/}
                {/*    React-Bootstrap</Navbar.Brand>*/}

            </Container>
        </Navbar>
    </div>
};