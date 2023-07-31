import React from 'react'
import './footerTemplate.scss'
import {Types} from '../../utils/types'
import NavigationButton from "../navigationButton/navigationButton";
import {Nav} from "react-bootstrap";

export const FooterTemplate: React.FC<Types.ComponentProps> = (props) => {
    return <div className='footer'>
        <div className="copyright">2023</div>
        <Nav.Link className='navigation_link ps-3' href="/about">about</Nav.Link>
    </div>
};