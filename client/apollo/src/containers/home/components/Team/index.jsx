import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import './style.scss';

export class Team extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        let {name, data: {team}} = this.props;

        return (
            <div className="team">
                <h3>{name}</h3>
                <div className="members">
                    {
                        team ? team[0].members.map(member => {
                            return (
                                <div>{member.name}</div>
                            );
                        }) : <div></div>
                    }
                </div>
            </div>

        );
    }
};

// export default Team;

const query = gql`
                query GetTeam($teamName: String!) {
                  team(name: $teamName) {
                    __typename,
                    id,
                    name,
                    members {
                        id,
                        name
                    }
                  }
                }
    `;

// dont want to use redux? no problem
export default graphql(query, {
    options: (ownProps) => {
        return {
            variables: {
                teamName: ownProps.name
            }
        };
    }})(Team);

