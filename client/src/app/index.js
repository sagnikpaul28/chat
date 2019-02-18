import { render } from "react-dom";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import {Home} from "./components/Home";
import {SignUp} from "./components/SignUp";
import {ChatDashboard} from "./components/ChatDashboard";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/sign-up" component={SignUp} />
                    <Route exact path="/chat" component={ChatDashboard} />
                </Switch>
            </BrowserRouter>
        )
    }
}

render(<App/>, window.document.getElementsByClassName("app")[0]);

