import React, { Component } from 'react';
import { DragSource } from 'react-dnd'

export const ItemTypes = {
  KNIGHT: 'knight'
}

const knightSource = {
  beginDrag(props) {
    return {};
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging,
  }
}

class Knight extends Component {
  state = {  }
  render() {
    const { connectDragSource, isDragging } = this.props;
    return (
      connectDragSource(
        <span style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: 'bold',
          cursor: 'move'}}
          >♘</span>
      )
    );
  }
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight)