import React from 'react'
import Button from '../Button/index.jsx'


export default class HelloWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.alertHelloWorld = this.alertHelloWorld.bind(this);
    }

    alertHelloWorld() {
        alert('Hello World!!');
    }

    render() {
        return (
            <div>
                <p>Hello World</p>
                <Button 
                name='Hello'
                handleClick={() => this.alertHelloWorld()}></Button>
            </div>
        );
    }
}
