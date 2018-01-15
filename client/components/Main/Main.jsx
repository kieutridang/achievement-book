import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Page from '../Page/Page.jsx'

export default class Main extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Page></Page>
            </BrowserRouter>
        );
    }
}