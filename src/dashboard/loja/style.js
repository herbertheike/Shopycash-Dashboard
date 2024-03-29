import styled from "styled-components";


export const Section = styled.section`
  padding: 25px;
  width: 100%;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
`;
export const Container = styled.div`
  display: inline;
  width: 600px;
  align-items: stretch;
  flex-wrap: wrap;
  flex-direction: column;
`;
export const Input = styled.input`
  font: inherit;
    letter-spacing: inherit;
    color: currentcolor;
    border: 0px;
    box-sizing: content-box;
    background: rgba(94, 170, 168, 0.2);
    height: 1.4375em;
    margin: 0px;
    -webkit-tap-highlight-color: transparent;
    display: block;
    min-width: 0px;
    width: 100%;
    animation-duration: 10ms;
    padding: 16.5px 14px;

  &:hover {
    background: rgba(94, 170, 168, 0.5);
    color: #000;
  }
  &:focus {
    background: rgba(94, 170, 168, 0.5);
    color: #000;
    border: none;
  }
  &::placeholder {
    textOverflow: 'ellipsis !important',
    color: 'blue'
`;
export const TextArea = styled.textarea`
padding: 10px;
height: 120px;
margin: 3px;
color: #000;
align-items: flex-start;
justify-content: center;
background: rgba(94, 170, 168, 0.2);
border-radius: 5px;
&:hover {
  background: rgba(94, 170, 168, 0.5);
  color: #000;
}
&:focus {
  background: rgba(94, 170, 168, 0.5);
  color: #000;
  border: none;
}
&::placeholder {
  textOverflow: 'ellipsis !important',
  color: 'blue'
}
`;

export const InputFile = styled.input`
  width: 400px;
  padding: 10px;
  align-items: center;
  border: none;
  background: rgba(94, 170, 168, 0.2);
  border-radius: 5px;
  margin-left: 5px;
  &:hover {
    background: rgba(94, 170, 168, 0.5);
    color: #000;
  }
`;

export const Button = styled.button`
  padding: 10px;
  width: 230px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: rgb(34, 35, 138);
  color: #fff;
  margin: 10px;
  font-weight: bold;
  &:hover {
    background: rgba(34, 35, 138, 0.5);
    color: #000;
  }
`;
export const ButtonLogout = styled.button`
  padding: 5px;
  width: 180px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #f6a33d;
  color: #fff;
  margin: 5px;
  font-weight: bold;
  &:hover {
    background: #ecf0f7;
    color: #000;
  }
`;

export const Title = styled.title`
  font-weight: bold;
  color: #9b59b6;
  font-size: 22px;
  margin:3px;
  text-align: center;
  padding-top: 5px;
  display: block;
`;
export const Title2 = styled.title`
  font-weight: bold;
  font-style:italic;
  color: #53aaa8;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
export const Span = styled.span`
  color: black;
  font-size: 10px;
  text-align: center;
  display: block;
`;
export const Label = styled.label`
  font-weight: bold;
  padding: 5px;
  color: black;
  font-size: 18px;
  text-align: center;
`;
export const EditBt = styled.button`
display:flex;
  padding: 10px;
  width: auto;
  height: 40px;
  background-color: rgb(40, 167, 69);
  border: none;
  border-radius: 10px;
  color: #fff;
  align-items: center;
  justify-content:center;
  margin: 5px;
  font-weight: bold;
`;
export const DeleteBt = styled.button`
display:flex;
  padding: 10px;
  width: auto;
  height: 40px;
  background-color: rgb(220, 53, 69);
  border: none;
  border-radius: 10px;
  color: #fff;
  align-items: center;
  justify-content:center;
  margin: 5px;
  font-weight: bold;
`;
export const Img =  styled.img`
    width:250px;
    padding:10px;
    &:hover{
      -webkit-transition: all .3s ease-in;
      -moz-transition: all .3s ease-in;
      -ms-transition: all .3s ease-in;
      -o-transition: all .3s ease-in;
      transition: all .3s ease-in;
      opacity: 1;
      transform: scale(1.6);
`;
export const Tr = styled.tr`
border-bottom-width:1px;
border-color:#000;
text-align: center;
`;
export const Td = styled.td`
text-align: center;
width:auto;
height:60px;
padding:10px;
`;
export const Tdr = styled.td`
text-align: left;
width:auto;
height:60px;
padding:10px;
`;