import React, {useState} from "react";
import './mainPage.scss';
import {Types} from '../../utils/types'
import {connect, useDispatch, useSelector} from 'react-redux'
import ActionButton from "../../comps/actionButton/actionButton";
import apiService from "../../utils/apiService";
import {getPortPromise} from "portfinder";
import {createSetItemAction, createSetItemsArrayAction, setUserAction} from "../../utils/store/actionCreators";
import {RootState} from "../../utils/store";
import {PRODUCT, DISH, MEAL} from "../../utils/store/itemTypes";



const MainPage: React.FC<any> = ({setUserAction}) => {

    // console.log(user);

    // const user = state.user || {};
    // const [users, setUsers] = useState();
    // const [products, setProducts] = useState();

    const dispatch = useDispatch();

    // @ts-ignore
    const user: {name: string} = useSelector((state: RootState) => {
        return state.user;
    });
    const product = useSelector((state: RootState) => {
        // @ts-ignore
        return state.items.currentProduct;
    });
    const products = useSelector((state: RootState) => {
        // @ts-ignore
        return state.items.allProducts;
    });

    const getContent = () => {
        // @ts-ignore
        if (user.currentUser && user.currentUser.name) {
            // console.log(users);
            // @ts-ignore
            return user.currentUser.name;
        }
        return 'no user';
    };
    const getUsers = () => {
        apiService.getAllUsers().then((products: any) => {
            // setProducts(products);
        })
    };
    const getUser = () => {
        apiService.getUserData().then((user: any) => {
            dispatch({type: "SET_USER", payload: user});
            // setUserAction(user);
        })
    };
    const getAllProducts = () => {
        apiService.getAllProducts().then((products: any) => {
            dispatch(createSetItemsArrayAction(PRODUCT, products));
            // setUserAction(user);
        })
    };
    const getOneProduct = () => {
        apiService.getProduct('64990c180fe5d33b76d0cdb1') .then((product: any) => {
            dispatch(createSetItemAction(PRODUCT, product));
            // setUserAction(user);
        })
    };
    const getUserBySaga = () => {
        apiService.getUserData().then((user: any) => {
            setUserAction(user);
        })
    };
    const login = () => {
        apiService.login({
            login: 'joe',
            password: '1234'
        }).then(data => console.log(data));
    };
    const logout = () => {
        apiService.logout();
    };
    const getProducts = () => {
        apiService.getAllProducts().then((products: any) => {
            console.log(products);
        })
    };
    const getAllUsers = () => {
        apiService.getAllUsers().then((users: any) => {
            console.log(users);
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


    // @ts-ignore
    return <div className="mainPage">
        <div className="">{getContent()}</div>
        <div className="">{Object.keys(user).length > 0 ? user.name : 'no user'}</div>
        <div className="">{Object.keys(product).length > 0 ? product.name : 'no product'}</div>
        <div className="">{products.length > 0 ? products[0].name : 'no products'}</div>
        <ActionButton onClick={getUsers} label={'getUsers'}/>
        <ActionButton onClick={getUser} label={'getUser'}/>
        {/*<ActionButton onClick={() => dispatch(setUserActionSaga())} label={'getUser by Saga'}/>*/}
        <ActionButton onClick={login} label={'login'}/>
        <ActionButton onClick={logout} label={'logout'}/>
        <ActionButton onClick={getAllProducts} label={'getAllProducts'}/>
        <ActionButton onClick={getOneProduct} label={'getOneProduct'}/>
        <ActionButton onClick={getAllUsers} label={'getAllUsers'}/>
        <ActionButton onClick={auth} label={'auth'}/>
            {/*<JokeComp/>*/}
    </div>
};
// const mapStateToProps = (state: Types.State) => {
//     console.log('state from mapStateToProps', state);
//     return {user: state.user}
// };
const mapDispatchToProps = {setUserAction};
// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         setUserAction: (user: any) => {
//             dispatch(setUserAction(user))
//         }
//     }
// };

export default connect(null, mapDispatchToProps)(MainPage);