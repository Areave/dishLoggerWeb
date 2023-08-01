import React from 'react'
import './search.scss'
import Form from "react-bootstrap/Form";

export const Search: React.FC<any> = ({setSearchString}) => {

    return <div className='search meals-search'>
        <Form.Control type="text" placeholder="search" onChange={(e: any) => setSearchString(e.target.value)}/>
    </div>
};