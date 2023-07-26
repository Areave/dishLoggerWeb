import React from 'react'
import './footerTemplate.scss'
import {Types} from '../../utils/types'
import NavigationButton from "../navigationButton/navigationButton";

export const FooterTemplate: React.FC<Types.ComponentProps> = (props) => {
    return <div className='footer'>
        <div className="copyright">2023</div>
    </div>
};