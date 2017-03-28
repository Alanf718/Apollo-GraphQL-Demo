import React, {Component} from 'react';
import Team from '../Team/index.jsx';

import './style.scss';

export class TeamView extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        const teams = [
            {name: 'Tools Team', members: [{name: 'John'}, {name: 'George'}, {name: 'Ben'}, {name: 'Roberto'}]},
            {name: 'Service Team', members: [{name: 'John'}, {name: 'George'}, {name: 'Ben'}, {name: 'Roberto'}]},
        ];
        return (
            <div className="team-view">
                {
                    teams.map(team => {
                        return (
                            <Team name={team.name} members={team.members}/>
                        );
                    })
                }
            </div>

        );
    }
};

export default TeamView;
