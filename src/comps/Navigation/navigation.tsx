import React from 'react'
import './navigation.scss'
import ActionButton from "../actionButton/actionButton";
import Navbar from "react-bootstrap/Navbar";
import {Nav, NavDropdown} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useDispatch, useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {useNavigate} from "react-router";
import Logout from "../../assets/images/logout.png";
import apiService from "../../utils/apiService";
import {setIsAuthorizedAction} from "../../utils/store/actionCreators";

export const Navigation: React.FC<any> = () => {

    const navigate = useNavigate();

    const isAuthorized: boolean = useSelector((state: Types.MainState) => {
        return state.user.isAuthorized;
    });
    const user: Types.User = useSelector((state: Types.MainState) => {
        return state.user.currentUser;
    });

    const links = <>
        <Nav.Link className='navigation_link ps-3' href="/products">Products</Nav.Link>
        <Nav.Link className='navigation_link ps-3' href="/dishes">Dishes</Nav.Link>
        <Nav.Link className='navigation_link ps-3' href="/stats">Stats</Nav.Link>
    </>;

    const dispatch = useDispatch();

    const logout = () => {
        apiService.logout().then(res => {
            dispatch(setIsAuthorizedAction(false));
            // removeCookie('jwt');
            navigate('/auth');
        });
    };



    return <>
            {isAuthorized ? (
                <div className='navigation d-flex flex-column align-items-end'>
                    <div className="navigation_greeting pb-1 d-flex">welcome,
                        <div className='navigation_greeting_link ps-3' onClick={() => navigate("/user")}>{user.name || ' stay fit'}</div>
                        <div className="navigation_greeting_img_container" onClick={logout}>
                            <img src={Logout}/>
                        </div>

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