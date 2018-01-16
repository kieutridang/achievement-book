import React from 'react'
import Button from '../Button/index.jsx'


export default class HelloWord extends React.Component {
    state = {  }
    render() {
        return (
            <div>
                <p>Hello World</p>
                <Button name='Hello'></Button>
            </div>
        );
    }
}
