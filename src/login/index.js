import React, { Component } from "react";
import { Container, Input, Button, Title, Label } from "./style";
import firebase from "../data/Firebase";
import history from "../history";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", pass: "", shopping: "" };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
              localStorage.setItem("@token",user.getIdToken(true));
              localStorage.setItem("@idshopping", '5fc57fdaa17de33248fd3674')
              console.log(user.getIdToken(true))
        history.push("/dashboard");
      } else {
        localStorage.removeItem("@token");
      }
    });
  };

  login = () => {
    const shopping = this.state.shopping;
    const email = this.state.email;
    const pass = this.state.pass;
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function () {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, pass)
          .then(function emailPassProfile() {
            const user = firebase.auth().currentUser;
              localStorage.setItem("@token",user.getIdToken(true));
              localStorage.setItem("@idshopping", '5fc57fdaa17de33248fd3674')
            firebase
              .database()
              .ref(shopping+"/user/" + user.uid)
              .update({
                lastLogin: Date.now(),
              });
              history.push("/dashboard");
              console.log()
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
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorCode + ": " + errorMessage);
      });
  };

  cadastro = () => {
    const shopping = this.state.shopping;
    const email = this.state.email;
    const pass = this.state.pass;
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function () {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, pass)
          .then(function emailPassProfile() {
            const user = firebase.auth().currentUser;
            firebase
              .database()
              .ref(shopping+"/user/" + user.uid)
              .set({
                loginType: "Email e Senha",
                email: user.email,
                shopping: shopping,
                createAt: Date.now(),
              });;
              localStorage.setItem("@token",user.refreshToken );
              localStorage.setItem("@idshopping", '5fc57fdaa17de33248fd3674')
              history.push("/dashboard");
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
      });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Container>
        <Title>Seja bem vindo, faça login para continuar </Title>
        <Label>Shopping</Label>

        <Input
          type="email"
          placeholder={"Shopping"}
          disabled
          value={this.state.shopping}
        />
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
export default Login;
