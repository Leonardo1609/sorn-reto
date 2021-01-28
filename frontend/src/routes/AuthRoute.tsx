import { Redirect, Route, Switch } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"

export const AuthRoute = () => {
    return (
        <Switch>
            <Route path="/auth/login" exact component={ Login } />
            <Route path="/auth/create-account" exact component={ Register } />

            <Redirect to="/auth/login" />
        </Switch>
    )
}
