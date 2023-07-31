import React from 'react'
import './search.scss'
import Form from "react-bootstrap/Form";

export const Search: React.FC<any> = ({onSearchChange}) => {

    return <div className='search'>
        <Form.Control type="text" placeholder="search" onChange={onSearchChange}/>
    </div>
};