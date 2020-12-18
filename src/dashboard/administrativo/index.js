import React from "react";
import {
  Container,
  Input,
  Button,
  Title,
  Label,
  InputFile,
  ButtonLogout,
} from "./style";
import firebase from "../../data/Firebase";
import history from "../../history";
import Sidebar from "react-sidebar";
import Header from "../../components/header";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      shoppingarray: [],
      _id: localStorage.getItem("@idshopping"),
      message: "",
      messageloja: "",
      segmentolist: [],
      nomefantasia: "",
      razaosocial: "",
      shopping: "",
      segmento: [],
      cnpj: "",
      telefone: "",
      email: "",
      site: "",
      responsavel: "",
      logo: "",
      capa: "",
      ischecked: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  componentDidMount() {
    fetch("http://192.168.15.69:3001/shopping/" + this.state._id, {
      headers: { Authorization: "Bearer " + localStorage.getItem("@token") },
    })
      .then((res) => res.json())
      .then((result) =>
        this.setState({ shoppingarray: result, message: result.message })
      )
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);
    this.listsegmento();
  }

  listsegmento() {
    fetch("http://192.168.15.69:3001/segmento/", {
      headers: { Authorization: "Bearer " + localStorage.getItem("@token") },
    })
      .then((res) => res.json())
      .then((result) => this.setState({ segmentolist: result }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);
  }

  cadastrarLoja() {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nomefantasia: this.state.nomefantasia,
        razaosocial: this.state.razaosocial,
        shopping: this.state.shopping,
        segmento: this.state.segmento,
        cnpj: this.state.cnpj,
        telefone: this.state.telefone,
        email: this.state.email,
        site: this.state.site,
        responsavel: this.state.responsavel,
        logo: this.state.logo,
        capa: this.state.capa,
      }),
    };
    fetch("http://192.168.15.69:3001/loja", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ messageloja: "Loja adicionada" }));
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        localStorage.removeItem("@token");
        history.push("/");
      })
      .catch(function (error) {});
  }


  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleChecked(event) {
      if(event.target.checked){
        this.setState({segmento:[...this.state.segmento, event.target.value]})
        //newarr.push([i, event.target.value])
      }
      console.log([this.state.segmento])
  }

  render() {
    console.log(this.state.segmentolist);
    const { shoppingarray, segmentolist , } = this.state;
    return (
      <Sidebar
        sidebar={
          <div style={{ background: "#51519B" }}>
            <b style={{ padding: 20 }}>
              Shopycash <br /> shopping Dashboard
            </b>
            <div style={{ background: "white" }}>Shopping </div>
            <ul style={{ background: "white" }}>
              <li>
                <a href="#">Cadastro</a>
              </li>
              <li>
                <a href="#">Lojas</a>
              </li>
            </ul>
                {this.state.message}
                {localStorage.getItem("@token")}<br />
            <ButtonLogout onClick={this.logout}> SAIR </ButtonLogout>
          </div>
        }
        docked={true}
        styles={{
          sidebar: { width: "auto", fontFamily: "Arial", textAlign: "center" },
        }}
      >
        <Header />
        <table style={{fontFamily: "Arial", padding:10}}>
          {shoppingarray.map((item) => (
            <tbody key={item.id}>
              <tr>
                <th>{item.nome} </th>
                <th> {item.endereco} </th>
                <th> {item.email} </th>
                <th> {item.site} </th>
                <th> {item.telefone}</th>
              </tr>
            </tbody>
          ))}
        </table>
        <Container style={{width:600}}>
        <Title>Cadastro de lojas </Title>
            
              <Input
                style={{ width: '100%' }}
                type="text"
                placeholder="Nome Fantasia"
                required="true"
                name="nomefantasia"
                value={this.state.nomefantasia}
                onChange={this.handleChange}
              />
              
              <Input
                value={this.state.razaosocial}
                style={{ width: '100%' }}
                type="text"
                placeholder="Razão social"
                name="razaosocial"
                required="true"
                onChange={this.handleChange}
              />
              <Input
                value={this.state.cnpj}
                style={{  width: '30%'}}
                type="number"
                placeholder="CNPJ"
                name="cnpj"
                required="true"
                onChange={this.handleChange}
              />

              <Input
                value={this.state.telefone}
                style={{ width: '20%' }}
                type="tel"
                placeholder="Telefone"
                name="telefone"
                required="true"
                onChange={this.handleChange}
              />
              <Input
                value={this.state.email}
                style={{ width: "30%" }}
                type="email"
                placeholder="Email"
                name="email"
                required="true"
                onChange={this.handleChange}
              />
              <Input
                value={this.state.site}
                style={{ width: "30%" }}
                type="url"
                placeholder="Site"
                name="site"
                onChange={this.handleChange}
              />
              <Input
                value={this.state.responsavel}
                style={{ width: "30%" }}
                type="text"
                placeholder="Responsavel"
                name="responsavel"
                required="true"
                onChange={this.handleChange}
              />
              <Label>Segmentos</Label>
              {segmentolist.map((seg, index) => {
                    return (
                      <div key={seg._id} style={{ display: 'block', width:'12em', fontFamily: "Arial"}}>
                          <div >
                            <input id={index} type="checkbox" value={seg.nome} name="segmento" onChange={this.handleChecked}/>
                            <span class="label-text">{seg.nome}</span>
                          </div>
                      </div>
                    );
                  })}
                  <br />
              <InputFile
                value={this.state.logo}
                style={{ width: "60%" }}
                type="file"
                placeholder="Logo"
                name="logo"
                onChange={this.handleChange}
              />
              <InputFile
                value={this.state.capa}
                style={{ width: "60%" }}
                type="file"
                placeholder="Capa"
                name="capa"
                onChange={this.handleChange}

              />
                    <hr/>
              <Button type="submit"> Cadastrar</Button>
              {shoppingarray.map((item) => {
                return (<Input /*hidden data*/ hidden disabled value={item.nome} />)})}

        </Container>
      </Sidebar>
    );
  }
}

export default Dashboard;
