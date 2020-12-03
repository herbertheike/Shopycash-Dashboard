import React from "react";
import { Container, Input, Button, Title, Label } from "./style";
import firebase from "../data/Firebase";

export default class Login extends React.Component {
    constructor(props){
        super(props);
            this.state = { email : '', pass : '', shopping: "bhshopping" };
            this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      }

  login = () => {
    const shopping = this.state.shopping;
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.pass)
      .then(function emailPassProfile() {
        const user = firebase.auth().currentUser;
        firebase
          .database()
          .ref("/usershopping/"+shopping+ "/"+ user.uid)
          .update({
            lastLogin: Date.now(),
          });
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        alert("BEM VINDO");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          alert("Senha Fraca!");
        } else {
          alert(errorMessage);
        }
      });
  };

  cadastro = () => {
    const shopping = this.state.shopping;
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.pass)
      .then(function emailPassProfile() {
        const user = firebase.auth().currentUser;
        firebase
          .database()
          .ref("/usershopping/"+shopping+ "/" + user.uid)
          .set({
            loginType: "Email e Senha",
            email: user.email,
            shopping: shopping,
            createAt: Date.now(),
          });
        alert("Cadastro realizado com sucesso" );
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          alert("Senha Fraca!");
        } else {
          alert(errorMessage);
        }
      });
  };
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <Container>
        <Title>Seja bem vindo, faça login para continuar </Title>
        <Label>Shopping</Label>
        
        <Input type="email" placeholder={'Shopping'} disabled value={this.state.shopping} />
        <Input
          type="email"
          name="email"
          placeholder="Informe seu email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <Input
          type="password"
          name="pass"
          placeholder="Informe sua senha"
          value={this.state.pass}
          onChange={this.handleChange}
        />
        <Button onClick={this.login}> Entrar </Button>
        <Button onClick={this.cadastro}> cadastro </Button>
      </Container>
    );
  }
}
