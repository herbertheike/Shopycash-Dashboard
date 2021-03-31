import React from "react";
import {Container, Label, Section, Title} from './style'
//import history from "../../history";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Container
        style={{
          padding: 10,
          justifyContent: "space-around",
          alignItems: "center",
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Title>Sistema Shopy Cash</Title>
        <Section >
          <a href="http://localhost:3000/administrativo/login">
            <Label>
            Painel Administrativo
            </Label>
            
          </a>
        </Section>
        <Section >
          <a href="http://localhost:3000/shopping/login">
              <Label>
              Painel Shopping
              </Label>
            </a>
        </Section>
        <Section >
          <a href="http://localhost:3000/store/login">
            <Label>
            Painel Lojista
            </Label>
            
            </a>
        </Section>
      </Container>
    );
  }
}

export default MainPage;
