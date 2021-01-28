import { Redirect, Route, Switch } from "react-router-dom"
import { Home } from "../pages/Home"
import { Observations } from "../pages/Observations"
import { Users } from "../pages/Users"
import { Vehicles } from "../pages/Vehicles"

export const AuthenticatedRoute = () => {
    return (
        <Switch>
            <Route path="/" component={ Home } exact/>
            <Route path="/users" component={ Users } exact/>
            <Route path="/vehicles" component={ Vehicles } exact/>
            <Route path="/observations" component={ Observations } exact/>
            <Redirect to="/" />
        </Switch>
    )
}
