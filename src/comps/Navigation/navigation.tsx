import React from 'react'
import './navigation.scss'
import {Nav} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {useNavigate} from "react-router";
import Logout from "../../assets/images/logout.png";
import apiService from "../../utils/apiService";
import {setIsAuthorizedAction} from "../../utils/store/actionCreators";
import {Link} from "react-router-dom";

export const Navigation: React.FC<any> = () => {

    const navigate = useNavigate();

    const isAuthorized: boolean = useSelector((state: Types.MainState) => {
        return state.user.isAuthorized;
    });
    const user: Types.User = useSelector((state: Types.MainState) => {
        return state.user.currentUser;
    });

    const links = <>
        <Link className='navigation_link ps-3' to="/products">Products</Link>
        <Link className='navigation_link ps-3' to="/dishes">Dishes</Link>
        <Link className='navigation_link ps-3' to="/stats">Stats</Link>
    </>;

    const dispatch = useDispatch();

    const logout = () => {
        apiService.logout().then(res => {
            dispatch(setIsAuthorizedAction(false));
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
                    </div>
                </div>
            ) : (
                <div className="">NOT authorized</div>
            )}
        </>

};