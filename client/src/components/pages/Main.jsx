import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import MyProfile from './MyProfile';
import '../../styles/pages/Main.scss'

export default function Main() {
    return (
        <div id="main">
            <h1>Main</h1>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/myprofile" component={MyProfile} />
                <Route render={() => <h2>404</h2>} />
            </Switch>
        </div>
    )
}
