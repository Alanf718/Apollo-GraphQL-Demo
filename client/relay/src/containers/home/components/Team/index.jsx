import React, {Component} from 'react';

import './style.scss';

export class Team extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        const {name, members} = this.props;

        return (
            <div className="team">
                <h3>{name}</h3>
                <div className="members">
                    {
                        members.map(member => {
                            return (
                                <div>{member.name}</div>
                            );
                        })
                    }
                </div>
            </div>

        );
    }
};

export default Team;
