import styled from "styled-components";


export const Section =  styled.section`
display: flex;
flexDirection: row;
padding:25px;
margin:10px;
justify-content:center;
align-items:center;
background-color:rgba(94, 170, 168, 0.2);
width:200px;
height:60px;
&:hover {
    background-color: rgba(94, 170, 168, 0.5);
    color: #000;
  }
`;
export const Container = styled.div`
`;

export const Img =  styled.img`
   
`;

export const Input = styled.input`
    
`;

export const Title = styled.p`
font-weight:bold;
font-size: 36px;
color:rgba(78,80,151,1);
padding:10px;
`
export const Label = styled.text`
    
`