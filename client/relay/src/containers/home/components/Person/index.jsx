import React, {Component} from 'react';

import './style.scss';

export class Person extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        const {name, role, imgUrl} = this.props;

        return (
            <div className="person">
                <div>
                    <img src={imgUrl}/>
                </div>
                <div>
                    <h1>{name}</h1>
                </div>
                <div>
                    <h2>{role}</h2>
                </div>
            </div>
        );
    }
};

export default Person;
