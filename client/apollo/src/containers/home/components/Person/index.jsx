import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import {connect} from 'react-redux';

import './style.scss';

export class Person extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        const {name, role, imgUrl, promotePerson, demotePerson, teams=[], promoted, demoted} = this.props;
        return (
            <div className="person">
                <div>
                    <img src={imgUrl}/>
                </div>
                <div>
                    <h1>{name}</h1>
                </div>
                <div>
                    <ul>
                        {
                            teams.map(team => (<li>{team.name}</li>))
                        }
                    </ul>
                </div>
                <div>
                    <h2>{role}</h2>
                </div>
                <div className="actions">
                    <button id="promote" onClick={() =>
                        promotePerson({ variables: { name: name } }).then(promoted)
                    }>Promote</button>
                    <button id="demote" onClick={() =>
                        demotePerson({ variables: { name: name } }).then(demoted)
                    }>Demote</button>
                </div>
            </div>
        );
    }
};

const promoteQuery = gql`
                mutation promotePerson($name: String!) {
                  promotePerson(name: $name)
                }
   `;

const demoteQuery = gql`
                mutation demotePerson($name: String!) {
                  demotePerson(name: $name)
                }

    `;

// dont want to use redux? no problem
export default graphql(demoteQuery, {name: `demotePerson`})(graphql(promoteQuery, {name: `promotePerson`})(Person));
