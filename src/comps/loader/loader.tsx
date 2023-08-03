import React from 'react'
import './loader.scss'

const Loader: React.FC<any> = ({isLittle}) => {

    const getClassName = () => {
        if (isLittle) return ' loader_for-item-little'
        return '';
    };


    return <span className={'loader' + getClassName()}/>
};

export default Loader;