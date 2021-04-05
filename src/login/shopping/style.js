import styled from "styled-components";


export const Container =  styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding:100px;
`;

export const Img =  styled.img`
    width:250px;
    padding:10px;
    
`;

export const Input = styled.input`
    padding: 10px;
    width: 350px;
    height: 40px;
    border: none;
    background: rgba(94, 170, 168, 0.2);
    border-radius: 3px;
    margin: 5px;
    &:hover {
        background: rgba(94, 170, 168, 0.5);
        color: #000;
      }
`;

export const Button = styled.button`
    padding: 10px;
    width: 360px;
    height: 50px;
    border: none;
    border-radius: 8px;
    background: rgb(255,102,0);
    color: #fff;
    margin: 10px;
    font-weight: bold;
`; 

export const Title = styled.p`
    font-weight: bold;
    color: rgba(78,80,151,1);
    font-size: 26px;
`
export const Label = styled.p`
    font-weight: 100;
    color: #888888;
    font-size: 16px;
    padding: 10px;
`