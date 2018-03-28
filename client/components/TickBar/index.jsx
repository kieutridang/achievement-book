import React, { Component } from 'react';
import Tick from '../Tick/index.jsx';
import { _helper } from '../api/_helper';

export default class Tickbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: props.selected
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

    componentWillReceiveProps = (nextProps) => {
        var newSelected = nextProps.selected;
        var length = 12 - newSelected.length;
        for (var i = 0; i < length; ++i) {
          newSelected.push(false)
        }
        this.setState({ selected: newSelected })
      }

    render() {
        const { label, selections, onChange } = this.props;
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
                    this.setState({selected: newArr});
                    onChange(newArr);
                }}
            />
        )
        return (
            <div>
                <label className='page-label'>{ label }</label>
                {listSelections}
            </div>
        );
    }
}