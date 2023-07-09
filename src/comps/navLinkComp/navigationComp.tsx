import * as React from "react";
import {Types} from "../../utils/types";
import {NavigationCompTemplate} from "./navigationCompTemplate";
import {connect} from 'react-redux'

const NavigationHOC = (Comp: React.FC<any>): Types.HOC => {

    return (props) => {
      return <Comp {...props}/>
  }
};

const mapStateToProps = (state: Types.State) => {
    return {isAuthorized: state.user.isAuthorized}
};
const mapDispatchToProps = {};

export const NavigationComp = connect(mapStateToProps, mapDispatchToProps)(NavigationHOC(NavigationCompTemplate));