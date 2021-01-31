import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducer/authReducer';
import { observationsReducer } from '../reducer/observationsReducer';
import { uiReducer } from '../reducer/uiReducer';
import { usersReducer } from '../reducer/usersReducer';
import { vehiclesReducer } from '../reducer/vehiclesReducer';

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    users: usersReducer,
    vehicles: vehiclesReducer,
    observations: observationsReducer,
    ui: uiReducer
});

export const store = createStore( 
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);