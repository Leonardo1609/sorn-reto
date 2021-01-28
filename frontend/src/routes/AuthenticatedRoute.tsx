import { Redirect, Route, Switch } from "react-router-dom"
import { Header } from "../components/Header"
import { Home } from "../pages/Home"

export const AuthenticatedRoute = () => {
    return (
        <Switch>
            <Route path="/" component={ Home } exact/>
            <Redirect to="/" />
        </Switch>
    )
}
