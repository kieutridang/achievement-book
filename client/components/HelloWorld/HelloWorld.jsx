import React from 'react'
import Button from '../Button/index.jsx'
import Select from '../Select/index.jsx'
import SingleChoice from '../SingleChoice/index.jsx'
import MultipleChoice from '../MultipleChoice/index.jsx'

import {_helper} from '../api/_helper'

export default class HelloWord extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            test: {
                username: 'minhhuynk',
                password: 'minhhuy123'
            }
        }
    }
    alertHelloWorld() {
        alert('Hello World!!');
    }

    handlingSelectChange = (label, value) => {
        alert(label + ': ' + value);
    }

    handlingSingleChoiceChange = (value) => {
        alert(value);
    }

    handlingMultipleChoiceChange = (value) => {
        alert(value);
    }

    

    render() {
        return (
            <div>
                <p>Hello World</p>
                <Button 
                    name='Hello'
                    handleClick={() => {
                        console.log(_helper.GET("http://localhost:8080/api/testGet", []));
                    }
                    }/>
                <Select
                    label = 'City'
                    property = 'city'
                    optionsList = {[
                        'Ho Chi Minh',
                        'Ha Noi',
                        'Da Nang'
                    ]}
                    handlingSelectChange={this.handlingSelectChange}/>
                <SingleChoice
                    label = 'Gender'
                    property = 'gender'
                    optionsList = {[
                        'Male',
                        'Female'
                    ]}
                    handlingSingleChoiceChange={this.handlingSingleChoiceChange}/>
                <MultipleChoice
                    label = 'Department'
                    property = 'department'
                    optionsList = {[
                        {value: 'Student', checked: false},
                        {value: 'Teacher', checked: false},
                        {value: 'BlahBlah', checked: false}
                    ]}
                    handlingMultipleChoiceChange = {this.handlingMultipleChoiceChange}/>
            </div>
        );
    }
}
