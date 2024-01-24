import React from 'react'
import { Switch, Route } from "react-router-dom";
import Login from '../components/login/login';
import Register from '../components/register/register';
import Users from '../components/ManageUsers/Users';
import PrivateRoutes from './PrivateRoutes'
import Role from '../components/Role/Role'
import GroupRole from '../components/GroupRole/GroupRole';

const AppRoutes = (props) => {
    const Projects = () => {
        return (
            <span>Projects</span>
        )
    }

    return (
        <>
            <Switch>
                <PrivateRoutes path='/users' component={Users} />
                <PrivateRoutes path='/projects' component={Projects} />
                <PrivateRoutes path='/roles' component={Role} />
                <PrivateRoutes path='/group-role' component={GroupRole} />

                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    home
                </Route>
                <Route path="*">
                    404 not found
                </Route>
            </Switch>
        </>
    )
}

export default AppRoutes