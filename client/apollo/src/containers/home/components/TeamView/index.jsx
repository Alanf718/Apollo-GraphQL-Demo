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
        const {teams=[], visible=true} = this.props;

        return (
            <div className="team-view">
                {
                    visible ?
                        teams.map((team,i) => {
                            return (
                                <Team name={team.name} key={i}/>
                            );
                        })
                        :
                        null
                }
            </div>

        );
    }
};

export default TeamView;
