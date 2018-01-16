import React from 'react'
import Button from '../Button/index.jsx'


export default class HelloWord extends React.Component {
    alertHelloWorld() {
        alert('Hello World!!');
    }

    render() {
        return (
            <div>
                <p>Hello World</p>
                <Button 
                name='Hello'
                handleClick={this.alertHelloWorld}></Button>
            </div>
        );
    }
}
