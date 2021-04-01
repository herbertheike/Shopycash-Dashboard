import React from "react";
import {Container, Label, Section, Title, Link, SubSection} from './style'
import {BsTools, BsBuilding,BsFillBagFill} from 'react-icons/bs'
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
        <Section>
          <Link href="http://localhost:3000/administrativo/login">
          <BsTools/>
          <SubSection>
            <Label>
            Painel Administrativo
            </Label>
            </SubSection>
          </Link>
        </Section>
        <Section >
          <Link href="http://localhost:3000/shopping/login">
          <BsBuilding/>
          <SubSection>
            <Label>
            Painel Shopping
            </Label>
            </SubSection>
            </Link>
        </Section>
        <Section >
          <Link href="http://localhost:3000/store/login">
          <BsFillBagFill/>
          <SubSection>
            <Label>
            Painel Lojista
            </Label>
            </SubSection>
            </Link>
        </Section>
      </Container>
    );
  }
}

export default MainPage;
