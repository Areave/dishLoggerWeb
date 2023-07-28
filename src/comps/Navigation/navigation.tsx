import React from 'react'
import './navigation.scss'
import ActionButton from "../actionButton/actionButton";
import Navbar from "react-bootstrap/Navbar";
import {Nav, NavDropdown} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {useNavigate} from "react-router";

export const Navigation: React.FC<any> = () => {

    const navigate = useNavigate();

    const isAuthorized = useSelector((state: Types.State) => {
        return state.user.isAuthorized;
    });
    const user = useSelector((state: Types.State) => {
        return state.user.currentUser;
    });

    const links = <>
        <Nav.Link className='navigation_link ps-3' href="/products">Products</Nav.Link>
        <Nav.Link className='navigation_link ps-3' href="/dishes">Dishes</Nav.Link>
        <Nav.Link className='navigation_link ps-3' href="/stats">Stats</Nav.Link>
    </>



    return <>
            {isAuthorized ? (
                <div className='navigation d-flex flex-column align-items-end'>
                    <div className="navigation_greeting d-flex">welcome,
                        <div className='navigation_greeting_link ps-3' onClick={() => navigate("/user")}>{user.name || ' stay fit'}</div>
                    </div>
                    <div className="navigation_menu">
                        <Nav className='justify-content-between'>
                            {links}
                        </Nav>
                        {/*<Navbar.Toggle aria-controls="basic-navbar-nav"/>*/}
                        {/*<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">*/}
                        {/*<Nav>*/}
                        {/*    {links}*/}
                            {/*<Nav.Link href="#link">Link</Nav.Link>*/}
                            {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                            {/*    {links}*/}
                            {/*    /!*<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*!/*/}
                            {/*    /!*<NavDropdown.Item href="#action/3.2">*!/*/}
                            {/*    /!*    Another action*!/*/}
                            {/*    /!*</NavDropdown.Item>*!/*/}
                            {/*    /!*<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*!/*/}
                            {/*    /!*<NavDropdown.Divider/>*!/*/}
                            {/*    /!*<NavDropdown.Item href="#action/3.4">*!/*/}
                            {/*    /!*    Separated link*!/*/}
                            {/*    /!*</NavDropdown.Item>*!/*/}
                            {/*</NavDropdown>*/}
                        {/*</Nav>*/}
                        {/*</Navbar.Collapse>*/}
                    </div>
                    {/*<ActionButton onClick={() => {}} label='Menu'/>*/}

                </div>
            ) : (
                <div className="">NOT authorized</div>
            )}
        </>

};