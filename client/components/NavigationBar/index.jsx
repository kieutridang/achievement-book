import React, { Component } from 'react';
import DateSelection from '../DateSelection/index';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { _helper } from '../../components/api/_helper'
import checkAuthenticate from '../../components/functions/checkAuthenticate';
import Popup from './PopupContainer.js'
import './index.scss';
import SideBar from '../SideBar/index.jsx';

export default withRouter(class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSidebar: false,
        }
    }
    logout = () => {
        _helper.fetchAPI(
            "/user/logout",
            {}
        )
    }
    toggleSibar = () => {
        this.setState({ showSidebar: !this.state.showSidebar })
    }

    render() {
        const { user, history, type, date, handleDateChange } = this.props;
        const url = history.location.pathname;
        switch (url) {
            case '/users/signup':
                return (
                    <div className='navigationbar sign-up'>
                        <div>
                            <img id='logo' src='../../../public/logo.png' alt='logo' />
                        </div>
                        <div>
                            <Link to='/users/login'> Log in</Link>
                        </div>
                    </div>
                );
            case '/users/login':
                return (
                    <div className='navigationbar sign-up'>
                        <div>
                            <img id='logo' src='../../../public/logo.png' alt='logo' />
                        </div>
                        <div>
                            <Link to='/users/signup'> Sign up</Link>
                        </div>
                    </div>
                );
            case '/':
                return (
                    <div className='navigationbar intro'>
                        <div>
                            <img id='logo' src='../../../public/logo.png' alt='logo' />

                        </div>
                        <div>
                            <div>
                                <Link to='/users/login'> Log in</Link>
                            </div>
                            <div>
                                <Link to='/users/signup'> Sign up</Link>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className='navigationbar home'>
                        <div >
                            <img id='logo' src='../../../public/logo.png' alt='logo' onClick={() => history.push('/home') } />
                            <div className="toggle-sidebar">
                                <img
                                    src="../../../public/show-sidebar.png"
                                    alt=""
                                    className={this.state.showSidebar ? 'none-sidebar-icon' : 'sidebar-icon'}
                                    onClick={() => {
                                        this.toggleSibar();
                                    }}
                                />
                                <img
                                    src="../../../public/cancel-disable.png"
                                    alt=""
                                    className={this.state.showSidebar ? 'sidebar-icon' : 'none-sidebar-icon'}
                                    onClick={() => {
                                        this.toggleSibar();
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='notification'>
                                <img src='../../../public/notification.png' />

                            </div>
                            <Popup username={user && user.fullname} avatar={user && user.avatar}>
                                <label className='list-link'>
                                    <Link to='#'>View Profile</Link>
                                    <Link to='#'>Edit Profile</Link>
                                    <Link to='#'>Change Password</Link>
                                    <Link to='#'>Help</Link>
                                    <Link to='/users/login' onClick={this.logout}>Log out</Link>
                                </label>
                            </Popup>
                        </div>
                        <SideBar sideTop={'sideInTopNav'}
                            show={this.state.showSidebar}
                            type={type}
                            date={date}
                            handleDateChange={this.handleDateChange}
                        />
                    </div>
                );
        }
    }

})