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

export const HeaderTemplate: React.FC<Types.ComponentProps> = (props) => {
    // return <div className='header'>
    //     <PageTitleComp title={'DishLogger App'}/>
    //     <Navigation/>
    // </div>
    return <div>
        <Navbar className="header m-10" expand="sm">
            <Container>
                <div className='img_container'>
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
                {/*<Navbar.Toggle aria-controls="basic-navbar-nav"/>*/}
                {/*<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">*/}
                {/*    <Nav>*/}
                {/*        <Nav.Link href="/">Home</Nav.Link>*/}
                {/*        <Nav.Link href="#link">Link</Nav.Link>*/}
                {/*        <NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                {/*            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                {/*            <NavDropdown.Item href="#action/3.2">*/}
                {/*                Another action*/}
                {/*            </NavDropdown.Item>*/}
                {/*            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                {/*            <NavDropdown.Divider/>*/}
                {/*            <NavDropdown.Item href="#action/3.4">*/}
                {/*                Separated link*/}
                {/*            </NavDropdown.Item>*/}
                {/*        </NavDropdown>*/}
                {/*    </Nav>*/}
                {/*</Navbar.Collapse>*/}
            </Container>
        </Navbar>
    </div>
};