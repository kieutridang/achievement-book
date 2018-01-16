import React from 'react'
import Button from '../Button/index.jsx'
import Select from '../Select/index.jsx'


export default class HelloWord extends React.Component {
    alertHelloWorld() {
        alert('Hello World!!');
    }

    handlingSelectChange(label, value) {
        alert(label + ': ' + value);
    }

    render() {
        return (
            <div>
                <p>Hello World</p>
                <Button 
                    name='Hello'
                    handleClick={this.alertHelloWorld}></Button>
                <Select
                    label = 'City'
                    property = 'city'
                    optionsList = {[
                        'Ho Chi Minh',
                        'Ha Noi',
                        'Da Nang'
                    ]}
                    _handlingChange={() => this.handlingSelectChange(label, value)}></Select>
            </div>
        );
    }
}
