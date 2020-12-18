import styled from "styled-components";


export const Container =  styled.div`
padding: 10px;
`;

export const Input = styled.input`
    padding: 10px;
    height: 20px;
    justify-content: center;
    border: none;
    background: rgba(246,102,19, 0.2);
    border-radius: 3px;
    margin: 5px;
    &:hover{
        background: rgba(80,79,162, 0.2);
        color: #000
      }
      &:focus{
        background: rgba(80,79,162, 0.2);
        color: #000
      }
`;
export const InputFile = styled.input`
    width: 400px;
    padding: 10px;
    align-items:right;
    border: none;
    background: rgba(246,102,19, 0.2);
    border-radius: 3px;
    margin-left: 5px;
    &:hover{
        background: rgba(80,79,162, 0.2);
        color: #000
      }
`;

export const Button = styled.button`
    padding: 10px;
    width: 230px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background:#F6A33D;
    color: #fff;
    margin: 10px;
    font-weight: bold;
    &:hover{
        background: #ecf0f7;
        color: #000
      }
`; 
export const ButtonLogout = styled.button`
    padding: 5px;
    width: 180px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background:#F6A33D;
    color: #fff;
    margin: 5px;
    font-weight: bold;
    &:hover{
        background: #ecf0f7;
        color: #000
      }
`; 

export const Title = styled.p`
    font-weight: bold;
    color: #9b59b6;
    font-size: 22px;
    margin: 5px;
    padding-left: 10px;
    padding-top: 5px;
    font-family: Arial;
`
export const Label = styled.p`
    font-weight: 100;
    padding: 5px;
    color: #888888;
    font-size: 16px;
    font-family: Arial;
`
