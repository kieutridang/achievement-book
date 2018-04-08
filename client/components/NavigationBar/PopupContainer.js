import styled from 'styled-components';
import Popup from 'reactjs-popup';
import React, { PropTypes } from 'react';

const PopupContainer =  ({className, children, username, avatar}) =>{ 
    
    const srcImg =  (!avatar) ? '../../../public/default-profile-pic.png' : avatar;
    return (
    <div className={className}>
        <Popup trigger = { 
              <div className='popup-top'>
                <label className='label-name'>{username}</label>
                <img src={ srcImg} />
              </div>
            }
            position='bottom right'
            on='hover'  
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
    }
    .popup-content {
        top: 50px !important;
    }
    .label-name {
        font-size: 16px;
        margin-right: 10px;
         &:hover {
            color: green;
            cursor: pointer;
         }
        
    }
    .list-link {
        a {
            padding: 10px;
            text-decoration: none;
            color: black;
            font-size: 16px;
            display: block;
            white-space: nowrap;
            &:hover {
                cursor: pointer;
                background-color: rgba(54,54,54,0.2);
            }
        }
    }
`;
export default PopupWrapper;

