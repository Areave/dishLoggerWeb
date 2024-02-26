import './userPage.scss'
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Types} from "../../utils/types";
import {useSelector} from "react-redux";

const UserPage = () => {
    const currentUserData: Types.User = useSelector((state: Types.MainState) => {
        return state.user.currentUser;
    });
    const {tags, energyValue} = currentUserData.intakeData;

    // const [userData, setUserData] = useState(currentUserData);



    return <div className="page user-page">
        <div className="intake_data">

        </div>
    </div>
};
export default UserPage;
