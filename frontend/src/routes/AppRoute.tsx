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

export const AppRoute = () => {

    const token = localStorage.getItem('token');

    if( token ){
        tokenAuth( token );
    }

    const dispatch = useDispatch();

    const isLoggedIn = useSelector( ( state: any ) => state.auth.authenticated );

    useEffect(() => {
        dispatch( getUser() );
    }, [])

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
