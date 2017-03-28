import React from 'react';
import ReactDOM from 'react-dom';
import Relay, {Route} from 'react-relay';
import Home from './containers/home/index.jsx';

class HomeRoute extends Route {
    static queries = {
        team: () => Relay.QL`query { team { id, name } }`,
    };
    static routeName = 'HomeRoute';
}

require('./style.scss');

ReactDOM.render(
    <Relay.RootContainer
        Component={Home}
        route={new HomeRoute()}
    />,
    document.getElementById('root')
);
