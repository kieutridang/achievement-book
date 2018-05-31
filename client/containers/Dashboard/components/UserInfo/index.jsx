import React, { Component } from 'react';
import { UserInfoWrapper, Avatar, InfoWrapper, LabelUser, LabelAdress } from './styled.js'

export default class UserInfo extends Component {
    render() {
        const { avatar, username, address } = this.props;
        return (
            <UserInfoWrapper>
                <Avatar src={avatar} />
                <InfoWrapper>
                    <LabelUser>{username}</LabelUser>
                    <LabelAdress>{address}</LabelAdress>
                </InfoWrapper>

            </UserInfoWrapper>
        )
    }
}
UserInfo.defaultProps = {
    avatar: '../../../public/default-profile-pic.png',
    username: ' Minh Huy',
    address: 'Coder không thích sửa PC, yêu màu tím, ghét màu hồng và cực kì ghét sự giả dối ! ',
}
