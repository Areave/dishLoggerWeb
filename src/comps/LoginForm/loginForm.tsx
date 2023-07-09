import * as React from "react";
import {Types} from "../../utils/types";
import {LoginFormTemplate} from "./loginFormTemplate";
import {connect} from 'react-redux'

const LoginFormHOC = (Comp: React.FC<any>): Types.HOC => {

    return (props) => {
      return <Comp {...props}/>
  }
};

const mapStateToProps = (state: Types.State) => {
    return state;
};
const mapDispatchToProps = {};

export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormHOC(LoginFormTemplate));