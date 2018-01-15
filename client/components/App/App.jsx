import React, { Component } from 'react';
import Form from '../Form/Form.jsx';
import Table from '../Table/Table.jsx';
import './App.scss'
import { Redirect } from 'react-router';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUserInfo: [],
      checkAuth: true
    }
    this.checkAuth();
    this.getServerData();
  }
  render() {
    if (!this.state.checkAuth) {
      return (
        <Redirect to={'/login'}/>
      )
    }
    return (
      <div className='page'>
        <div>
          <button onClick={this.logOut}>Log out</button>
        </div>
        <div>
          <Form addUserInfo={this._addUserInfo}/>
          <Table 
          listUserInfo = {this.state.listUserInfo}
          />
        </div>
      </div>
    );
  }
  _changeState = (property, value) => {
    this.setState({
      [property]: value
    })
  }
  checkAuth = () => {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    let changeState = this._changeState
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (this.responseText == 'true') {
              changeState('checkAuth', true);
            } else changeState('checkAuth', false);
        }
    })

    xhr.open("GET", "http://localhost:8080/api/check-auth");
    xhr.setRequestHeader("auth-key", localStorage.authKey);
    xhr.send();
  }
  _addUserInfo = (userInfo) => {
    let newListUserInfo = this.state.listUserInfo.map((user, index) => {
      return user;
    })
    for (let key in userInfo.validate) {
      if (userInfo.validate[key] == false) return;
    }
    this.pushToServer(userInfo.info)
  }
  pushToServer = (data) => {
    let getServerData = this.getServerData;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      console.log(this.readyState);
      if (this.readyState === 4) {
        location.reload();
        // getServerData();
      }
    })

    xhr.open("POST", "http://localhost:8080/api/uploadUserInfo");
    xhr.send(JSON.stringify(data));
  }
  updateListUserInfo = (data) => {
    this.setState({
      listUserInfo: data
    })
  }
  getServerData = () => {
    let updateListUserInfo = this.updateListUserInfo;

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        updateListUserInfo(JSON.parse(this.responseText))
      }
    })

    xhr.open("GET", "http://localhost:8080/api/ListUserInfo");
    xhr.setRequestHeader("accept", "application/json");
    xhr.send();
  }
  logOut = () => {
    localStorage.removeItem('authKey');
    this.checkAuth();
  }
}