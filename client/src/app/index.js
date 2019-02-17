import { render } from "react-dom";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import {Home} from "./components/Home";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

render(<App/>, window.document.getElementsByClassName("app")[0]);

