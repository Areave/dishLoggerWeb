import React from 'react'
import './navigationButton.scss'
import {useNavigate} from 'react-router'

const NavigationButton: React.FC<{title: string, route: string}> = ({title, route}) => {
    const navigate = useNavigate();
    return <button className='navigationButton'
                   onClick={()=>navigate(route)}>
        {title}
    </button>
}

export default NavigationButton;