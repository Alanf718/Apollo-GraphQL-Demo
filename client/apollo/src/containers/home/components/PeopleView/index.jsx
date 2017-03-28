import React, {Component} from 'react';
import Person from '../Person/index.jsx';
import {connect} from 'react-redux';

import './style.scss';

export class PeopleView extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        const {people=[], minimize, expand, visible=true, promoted, demoted, refetch} = this.props;

        if(visible) {
            return (
                <div className="people-view">
                    <button id="minimize" onClick={minimize}>Minimize</button>
                    {/*<button id="fetch">fetch</button>*/}
                    <button id="re-fetch" onClick={() => { refetch({}) }}>re-fetch</button>
                    {
                        people.map((person, i) => {
                            return (
                                <Person imgUrl={`https://api.adorable.io/avatars/285/${person.name}`}
                                        name={person.name}
                                        role={person.role}
                                        teams={person.teams}
                                        promoted={() => { promoted(); refetch({}); }}
                                        demoted={demoted}
                                        key={i}/>
                            );
                        })
                    }
                </div>
            );
        } else {
            return (
                <div className="people-view">
                    <button id="expand" onClick={expand}>Expand</button>
                </div>
            );

        }
    }
};

export default PeopleView