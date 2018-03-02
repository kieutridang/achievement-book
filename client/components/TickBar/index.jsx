import React, { Component } from 'react';
import Tick from '../Tick/index.jsx';
import { _helper } from '../api/_helper';

export default class Tickbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: props.selected,
            // selected: _helper.fetchGET(props.reqUrl).then((response) => {
            //     const {status, data} = response;
            //     if (status == 200) {
            //         return data;
            //     }
            //     else {
            //         console.log(data);
            //     }
            // })
        }
    }
    render() {
        const { label, selections, reqUrl } = this.props;
        const { selected } = this.state;
        const listSelections = selections.map((selection, index) => 
            <Tick
                key = { selection } 
                label = { selection }
                id = { index }
                selected = { selected[index] }
                onSelect = {(id) => {
                    let newArr = this.state.selected.map((value) => value);
                    newArr[id] = !newArr[id];
                    this.setState({
                        selected: newArr
                    }, () =>{
                        _helper.fetchAPI(reqUrl, newArr, [], "PUT")
                    })
                }}
            />
        )
        return (
            <div>
                <span>{ label }</span>
                {listSelections}
            </div>
        );
    }
}