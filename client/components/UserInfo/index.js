import styled from 'styled-components';
const gray =  '#666666';
export const UserInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    border: 2px solid #C6CACB ;
    width: 250px;
    height: 100px;
    align-items: center;
    justify-content: space-around;
`

export const Avatar = styled.img`
    width: 80px;
    height: 80px;
`
export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const LabelUser = styled.label`
    font-weight: bold;
    color: ${gray};
`
export const LabelAdress = styled.label`
    color: ${gray};
`
