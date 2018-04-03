import React, {Component} from 'react';
import DateSelection from '../DateSelection/index';
import { Link, Redirect } from 'react-router-dom';
import { _helper } from '../../components/api/_helper'
import checkAuthenticate from '../../components/functions/checkAuthenticate';
import Popup from './PopupContainer.js'
import './index.scss';

export default class NavigationBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            url: ''
        }
    }
    logout = () => {
        _helper.fetchAPI(
            "/user/logout",
            {}
        )
        .then((response) => {
            if (response) {
                const { data, status } = response;
                if (status == 200) {                 
                    //this.checkAuth();     
                }
            }
        });     
    }
    getURL = () => {
        const url = window.location.href.split("/")[window.location.href.split("/").length-1];
        this.setState({url});
    }
    getUser(){
        _helper.fetchGET(
          '/user/getuser',
          {}
        )
        .then((response) => {
            const {data, status} = response;
            if(status == 200 ) {  
            this.setState({user: data})
            }  
        })
      }
    componentDidMount() {
        this.getURL(); 
    }
    render() {
        const { authenticate } = this.props;
        if (!authenticate ) {
            if(this.state.url != 'login')
            {
                return (
                <div className='navigationbar sign-up'>
                    <div>
                        <img src='../../../public/logo.png'  alt='logo'/>
                    </div>
                    <div>
                        <Link to='/users/login'> Log in</Link>
                    </div>     
                </div>      
                );
            }  
        else {
            return (
                <div className='navigationbar login'>
                    <div>
                        <img src='../../../public/logo.png'  alt='logo'/>
                    </div>
                    <div>
                        <div>
                        <Link to='#'> Log in</Link>
                        </div>
                        <div>
                        <Link to='/users/signup'> Sign up</Link>
                        </div>
                    </div>
                   
                </div>
            );
        }  
    }
    else {
        this.getUser();
        return (
            <div className='navigationbar home'>
                <div >
                    <img src='../../../public/logo.png' alt='logo' />
                </div>
                <div>
                    <div className='notification'>
                        <img src='../../../public/notification.png'/>
                    </div>
                    <Popup username={this.state.user.fullname} avatar={this.state.user.avatar}>
                        <label className='list-link'>
                            <Link to='#'>View Profile</Link>
                            <Link to='#'>Edit Profile</Link>
                            <Link to='#'>Change Password</Link>
                            <Link to='#'>Help</Link>
                            <Link to='/users/login' onClick={this.logout}>Log out</Link>
                        </label>
                    </Popup>
                </div>
            </div>    
        );
        }
    }
}