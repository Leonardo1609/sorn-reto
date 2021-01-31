import { useDispatch, useSelector } from 'react-redux';
import { 
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import { tokenAuth } from '../config/tokenAuth';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import { AuthRoute } from './AuthRoute';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { getUser } from '../actions/auth';
import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { IAuthStateSelector } from '../reducer/authReducer';
import { IUiStateSelector } from '../reducer/uiReducer';

export const AppRoute = () => {

    const token = localStorage.getItem('token');

    if( token ){
        tokenAuth( token );
    }

    const dispatch = useDispatch();

    const isLoggedIn = useSelector( ( state: IAuthStateSelector ) => state.auth.authenticated );
    const loadingUser = useSelector( ( state: IUiStateSelector ) => state.ui.loadingUser );

    useEffect(() => {
        if( token ){
            dispatch( getUser() );
        }
    }, [ token, dispatch ]);

    if( loadingUser ) return <Loading />

    return (
        <Router>
            { isLoggedIn && <Header /> }
            <Switch>
                <PublicRoute 
                    component={ AuthRoute }
                    path="/auth"
                    isLoggedIn={ isLoggedIn }
                /> 
                <PrivateRoute
                    component={ AuthenticatedRoute }
                    path="/"
                    isLoggedIn={ isLoggedIn }
                />
            </Switch> 
        </Router>
    )
}
