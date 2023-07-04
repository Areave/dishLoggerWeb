import React, {ReactElement} from "react";

export namespace Types {

    export interface State {
        readonly isAuthorized: boolean,
        readonly user: any;
        readonly items: any;
    }

    export interface Action {
        type: string,
        payload?: any
    }

    export type HOC = (props: any) => ReactElement<any>

    export interface ErrorPageProps {
        isError: boolean,
        children?: React.ReactNode,
        errorMessage?: string,
        setError: (isError: boolean, errorMessage?: string) => void

    }
    export interface PageTitleProps {
        readonly title: string
    }
    export interface ComponentTitleCompProps {
        title: string
    }
    export interface NavigationButtonProps {
        route: string,
        title: string
    }
    export interface ActionButtonProps {
        onClick: (arg?: any) => void,
        label: string
    }
    export interface JokeCompProps {
        // loadJokeUsingRedux: (joke: string) => void,
        loadJokeUsingHook?: (joke: string) => void,
        joke: string
    }
    export interface ComponentProps {
    }
}