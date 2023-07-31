import React from 'react'
import './footerTemplate.scss'
import {Nav} from "react-bootstrap";

export const FooterTemplate: React.FC = () => {
    return <div className='footer'>
        <div className="copyright">2023</div>
        <Nav.Link className='navigation_link ps-3' href="/about">about</Nav.Link>
    </div>
};