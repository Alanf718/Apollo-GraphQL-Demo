import React, {Component} from 'react';
import PeopleView from './components/PeopleView/index.jsx';
import TeamView from './components/TeamView/index.jsx';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { push } from 'react-router-redux'
import {Actions as PeopleViewActions} from './components/PeopleView/actions';
import {Actions as PersonActions} from './components/Person/actions';


export class Welcome extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        const {data: {people, team, refetch},  default: {peopleView},
            minimize, expand, promoted, demoted} = this.props;

        return (
            <div className="body">
                <TeamView teams={team} visible={peopleView.visible}/>
                <PeopleView people={people}
                            minimize={minimize}
                            expand={expand}
                            promoted={promoted}
                            demoted={demoted}
                            refetch={refetch}
                            visible={peopleView.visible}/>
            </div>
        );
    }
};

const query = gql`
                query {
                  people {
                    __typename,
                    id,
                    name,
                    role,
                    teams {
                      id,
                      name
                    }
                  },
                  
                  team {
                    __typename,
                    id,
                    name
                  }
                }
            `
    ;

export default compose(
    graphql(query, {
        options: { pollInterval: 100000 },
    }),
    connect(
        (state) => state,
        {...PeopleViewActions, ...PersonActions}
    )
)(Welcome);
