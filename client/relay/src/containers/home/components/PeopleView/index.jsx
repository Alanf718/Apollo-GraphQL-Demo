import React, {Component} from 'react';
import Person from '../Person/index.jsx';

import './style.scss';

export class PeopleView extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){

        const people = [
                {name: 'John Doe', role: 'Front-End Developer'},
                {name: 'Jane Doe', role: 'Back-End Developer'},
                {name: 'Doe Doe', role: 'Program Manager'}
            ];
        return (
            <div className="people-view">
                {
                    people.map(person => {
                        return (
                            <Person imgUrl={`https://api.adorable.io/avatars/285/${person.name}`}
                                    name={person.name}
                                    role={person.role}/>
                        );
                    })
                }
            </div>

        );
    }
};

export default PeopleView;