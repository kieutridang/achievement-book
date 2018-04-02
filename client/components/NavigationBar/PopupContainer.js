import styled from 'styled-components';
import Popup from 'reactjs-popup';
import React, { PropTypes } from 'react';

const PopupContainer =  ({className, children, username}) => (

    <div className={className}>
        <Popup trigger = { 
              <div className='popup-top'>
                <label>{username}</label>
                <img src='../../../public/default-profile-pic.png' />
              </div>
            }
            on='hover'  
            mouseLeaveDelay={500}
            
            >{children}
        </Popup>
    </div>
);
// PopupContainer.propTypes = {
//     className: PropTypes.string,
// }
const PopupWrapper = styled(PopupContainer)`
    .popup-top {
        display: flex;
        align-items: center;
        &:hover {
            cursor: pointer;
            }
    }
    .popup-content {
        padding: 10px !important;
        background-color: #000000 !important;
        width: auto !important;
        top: 50px !important;
        div {
            background-color: #000000 !important;
        }
    }
    .list-link {
        a {
            text-decoration: none;
            color: white;
            font-size: 16px;
            &:hover {
                color: rgb(0,255,0);
                cursor: pointer;
            }
        }
    }

`;
export default PopupWrapper;

