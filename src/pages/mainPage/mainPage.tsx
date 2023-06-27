import React, {useState} from "react";
import './mainPage.scss';
import {Types} from '../../utils/types'
import {connect} from 'react-redux'
import DescriptionComp from "../../comps/descriptionComp/descriptionComp";
import {JokeComp} from "../../comps/jokeComp/jokeComp";
import ActionButton from "../../comps/actionButton/actionButton";
import apiService from "../../utils/apiService";



const MainPage: React.FC<any> = (props) => {

    const [users, setUsers] = useState();

    const getContent = () => {
        // @ts-ignore
        if (users) {
            console.log(users);
            // @ts-ignore
            return users[0].name;
        }
        return 'no users';
    };
    const getUsers = () => {
        apiService.getUsers().then((users: any) => {
            setUsers(users);
        })
    };
    const auth = () => {
        apiService.authorization({
            login: 'joe',
            password: '1234'
        }).then((res: any) => {
            console.log(res);
        })
    };

    return <div className="mainPage">
        <div className="">{getContent()}</div>
        <ActionButton onClick={getUsers} label={'getUsers'}/>
        <ActionButton onClick={auth} label={'auth'}/>
            <DescriptionComp/>
            <JokeComp/>
    </div>
};
const mapStateToProps = (state: Types.State) => {
    return {name: state.name, joke: state.joke, isError: state.isError}
};

export default connect(mapStateToProps)(MainPage);