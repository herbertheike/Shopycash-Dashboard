import styled from "styled-components";


export const Container =  styled.div`
`;

export const Input = styled.input`
    padding: 15px;
    width: 400px;
    height: 30px;
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
    border: none;
    background: rgba(246,102,19, 0.2);
    border-radius: 3px;
    margin: 5px;
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
    padding: 10px;
    width: 120px;
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

export const Title = styled.p`
    font-weight: bold;
    color: #9b59b6;
    font-size: 22px;
`
export const Label = styled.p`
    font-weight: 100;
    color: #888888;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
`
