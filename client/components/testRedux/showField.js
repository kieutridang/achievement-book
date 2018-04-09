import React from 'react';
import { connect } from 'react-redux';

const ShowTodo = ({todos}) => {
  return (
    todos.map((todo, index) => {
      return (
        <span key={index}>{todo.text}</span>
      );
    })
  );
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
  }
}

export default connect(
  mapStateToProps,
)(ShowTodo);