import React from 'react'
import Button from '../Button/index.jsx'
import Select from '../Select/index.jsx'
import SingleChoice from '../SingleChoice/index.jsx'
import MultipleChoice from '../MultipleChoice/index.jsx'
import Label from '../Label/index.jsx'

import {_helper} from '../api/_helper'

export default class HelloWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validate: {
                gender: false,
                department: false,
                haveClickedSubmit: false
            },
            info: {
                city: 'Ho Chi Minh',
                gender: '',
                department: []
            }
        }
    }

    handlingClick = () => {
        let validate = this.state.validate;
        let newValidate = this.state.validate;
        let newInfo = this.state.info;
        newValidate.haveClickedSubmit = true;
        this.setState({
            validate: newValidate,
            info: newInfo
        })
        if (validate.gender && validate.department) {
            alert('Submit successful');
        } else {
            alert('Fail');
        }
    }

    handlingCityChange = (value) => {
        let newValidate = this.state.validate;
        let newInfo = this.state.info;
        newInfo.city = value;
        this.setState({
            validate: newValidate,
            info: newInfo
        });
    }

    handlingGenderChange = (value) => {
        let newValidate = this.state.validate;
        let newInfo = this.state.info;
        newValidate.gender = true;
        newInfo.gender = value;
        this.setState({
            validate: newValidate,
            info: newInfo
        });
    }

    handlingDepartmentChange = (value) => {
        let newValidate = this.state.validate;
        let newInfo = this.state.info;
        if (value.length === 0) {
            newValidate.department = false;
        } else {
            newValidate.department = true;
            newInfo.department = value;
        }
        this.setState({
            validate: newValidate,
            info: newInfo
        });
    }

    render() {
        return (
            <div>
                <p>Hello World</p>
                <Button 
                    name='Hello'
                    handlingClick={() => {
                        _helper.fetchPOST(
                            "http://localhost:8080/api/testPost",
                            {
                                username: 'minhhuynk',
                                password: 'minhhuy123'
                            },
                            ['Content-Type: application/json'], (error, response) => {
                                if (error) {
                                    console.log('error');
                                    console.log(response);
                                }
                                else console.log(response);
                        });
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
                    handlingSelectChange={this.handlingCityChange}/>
                <SingleChoice
                    label = 'Gender'
                    property = 'gender'
                    optionsList = {[
                        'Male',
                        'Female'
                    ]}
                    validate = {this.state.validate.gender}
                    haveClickedSubmit = {this.state.validate.haveClickedSubmit}
                    handlingSingleChoiceChange={this.handlingGenderChange}/>
                <MultipleChoice
                    label = 'Department'
                    property = 'department'
                    optionsList = {[
                        {value: 'Student', checked: false},
                        {value: 'Teacher', checked: false},
                        {value: 'BlahBlah', checked: false}
                    ]}
                    validate = {this.state.validate.department}
                    haveClickedSubmit = {this.state.validate.haveClickedSubmit}
                    handlingMultipleChoiceChange = {this.handlingDepartmentChange}/>
                <Button 
                    name='Submit'
                    handlingClick={this.handlingClick}/>
                <Label
                    label = 'Name'
                    labelRequired  = {true}   
                />
            </div>
                );
            }
        }
