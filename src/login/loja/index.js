import React, { Component } from "react";
import { Container, Input, Button, Title, Label, Img } from "./style";
import history from "../../history";
import logoshopycash from "../../imgsrc/logo.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      satus: "",
      email: null,
      pass: null,
      nome: "",
      slug: null,
      slugresp: "",
      ljid: "",
      result: "",
      array: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount = () => {};

  login = async () => {
    if (this.state.slug === null) {
      alert("Insira o Shopping");
    }
    const email = this.state.email;
    const pass = this.state.pass;
    const credentials = btoa(email + ":" + pass);

    console.log(credentials);

    await fetch("https://api-shopycash1.herokuapp.com/api/loja/login", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + credentials,
      },
    })
      .then((response) =>
        response.json(this.setState({ status: response.status }))
      )
      .then((response) =>
        this.setState({
          ljid: response.user.lojaid,
          nome: response.user.nome,
          slugresp: response.user.lojaslug,
          token: response.token,
        })
      )
      .catch((error) => console.log(error));
    console.log(this.state.status);
    if (this.state.status === 401) {
      alert(
        "Usuario ou senha não conferem, verifique os dados e tente novamente"
      );
    } else if (
      this.state.status === 200 &&
      this.state.slugresp === this.state.slug
    ) {
      localStorage.setItem("@token", this.state.token);
      localStorage.setItem("@nome", this.state.nome);
      localStorage.setItem("@slug", this.state.slug);
      localStorage.setItem("@email", email);
      localStorage.setItem("@lojaid", this.state.ljid);

      history.push(
        "/store/" + localStorage.getItem("@slug") + "/dashboard/"
      );
    } else {
      alert("O usuario não pertence a loja, verifique e tente novamente");
    }
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Container>
        <Img alt="logomarca shopycash" src={logoshopycash} />
        <Title>Seja bem vindo, faça login para continuar </Title>
        <Label>Acesso Lojista</Label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: 20,
          }}
        >
          <Input
            type="text"
            name="slug"
            placeholder="Informe sua loja"
            value={this.state.slug}
            required={true}
            onChange={this.handleChange}
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
        </div>
      </Container>
    );
  }
}
export default Login;
