import styled from 'styled-components';
import Popup from 'reactjs-popup';
import React, { PropTypes } from 'react';

const PopupContainer =  ({className, children, username, avatar}) =>{ 
    
    const srcImg =  (avatar == null) ? '../../../public/default-profile-pic.png' : avatar.toString();
    return (
    <div className={className}>
        <Popup trigger = { 
              <div className='popup-top'>
                <label>{username}</label>
                <img src={ srcImg} />
              </div>
            }
            on='hover'  
            mouseLeaveDelay={500}
            >{children}
        </Popup>
    </div>
)};
// PopupContainer.propTypes = {
//     className: PropTypes.String,
// }
const PopupWrapper = styled(PopupContainer)`
    .popup-top {
        display: flex;
        align-items: center;
        &:hover {
            color: green;
            cursor: pointer;
            }
        label {
            margin-right: 20px;
        }
    }
    .popup-content {
        padding: 5px !important;
        background-color: #000000 !important;
        top: 50px !important;
        div {
            background-color: #000000 !important;
        }
    }
    .list-link {
        a {
            padding: 10px;
            text-decoration: none;
            color: white;
            font-size: 16px;
            display: block;
            white-space: nowrap;
            &:hover {
                color: rgb(0,255,0);
                cursor: pointer;
                background-color: rgba(255,255,255,0.3);
            }
        }
    }
`;
export default PopupWrapper;

