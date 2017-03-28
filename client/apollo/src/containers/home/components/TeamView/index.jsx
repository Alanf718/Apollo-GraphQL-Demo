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
        const {teams=[]} = this.props;

        return (
            <div className="team-view">
                <button id="moveLeft"><h1>&lt;---</h1></button>
                {
                    teams.map((team,i) => {
                        return (
                            <Team name={team.name} key={i}/>
                        );
                    })
                }
                <button id="moveLeft"><h1>---&gt;</h1></button>
            </div>

        );
    }
};

export default TeamView;
