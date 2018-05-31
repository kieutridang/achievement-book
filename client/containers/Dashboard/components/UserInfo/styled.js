import styled from 'styled-components';
const gray =  '#000000';
export const UserInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    min-width: 200px;
    height: 400px;
    background: white;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 650px) {
        flex-direction: initial;
        width: 100%;
        height: 150px;
        justify-content: start;
        margin-bottom: 20px ;
    }
    
    
`

export const Avatar = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
   
`
export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    @media only screen and (max-width: 650px) {
        align-items: flex-start;
    }
`
export const LabelUser = styled.label`
    font-weight: bold;
    font-family: 'Muli', sans-serif;
    color: ${gray};
`
export const LabelAdress = styled.label`
    color: ${gray};
    font-family: 'Muli', sans-serif;
`
