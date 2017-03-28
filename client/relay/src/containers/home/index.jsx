import React, {Component} from 'react';
import PeopleView from './components/PeopleView/index.jsx';
import TeamView from './components/TeamView/index.jsx';
import Relay from 'react-relay';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { push } from 'react-router-redux'

// require('./style.scss');

export class Welcome extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){

        console.log('my props!:', this.props);
        return (
            <div className="body">
                <TeamView/>
                <PeopleView/>
            </div>

        );
    }
};

// export default Welcome;

export default Relay.createContainer(Welcome, {
    fragments: {
        store: () => Relay.QL`
        fragment on people {
            id,
            name
        }
        `
    }
});
