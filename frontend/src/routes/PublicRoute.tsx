import { ElementType } from "react"
import { Redirect, Route, RouteChildrenProps } from "react-router-dom"

interface IPrivateRoute {
    isLoggedIn: boolean,
    component: ElementType,
    path: string
}

export const PublicRoute = ({
    isLoggedIn,
    component: Component,
    ...ref
}: IPrivateRoute) => {
    return (
        <Route { ...ref } component={ ( props: RouteChildrenProps ) => 
            !isLoggedIn 
                ? <Component { ...props } />
                : <Redirect to="/home" />
        } />
    )
}