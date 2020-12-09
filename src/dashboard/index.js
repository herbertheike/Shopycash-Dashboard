import React from "react";
import { Container, Input, Button, Title, Label, InputFile, ButtonLogout } from "./style";
import firebase from "../data/Firebase";
import history from "../history";
import Sidebar from "react-sidebar";
import Header from "../components/header";



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
          nomefantasia : "",
          razaosocial: "",
          shopping:"",
          segmento: [],
          cnpj: "",
          telefone: "",
          email:"",
          site:"",
          responsavel:"",
          logo:"",
          capa: ""
        }    
      }

  componentDidMount() {
    fetch("http://192.168.15.69:3001/shopping/" + this.state._id, { headers: { Authorization: "Bearer " + localStorage.getItem("@token") },})
      .then((res) => res.json())
      .then((result) =>
        this.setState({ shoppingarray: result, message: result.message })
      )
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);
      this.listsegmento()
  }
  
  listsegmento(){
    fetch("http://192.168.15.69:3001/segmento/" , { headers: { Authorization: "Bearer " + localStorage.getItem("@token") }})
      .then((res) => res.json())
      .then((result) =>
        this.setState({segmentolist:result})
      )
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), [])
  }
 

  cadastrarLoja() {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "nomefantasia" : this.state.nomefantasia,
                              "razaosocial": this.state.razaosocial,
                              "shopping":this.state.shopping,
                              "segmento": this.state.segmento,
                              "cnpj": this.state.cnpj,
                              "telefone": this.state.telefone,
                              "email":this.state.email,
                              "site":this.state.site,
                              "responsavel":this.state.responsavel,
                              "logo":this.state.logo,
                              "capa": this.state.capa})
    };
    fetch('http://192.168.15.69:3001/loja', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ messageloja: "Loja adicionada" }));
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

  render() {
    console.log(this.state.segmentolist)
    const { shoppingarray, segmentolist } = this.state;
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
            <ButtonLogout onClick={this.logout}> SAIR </ButtonLogout>
          </div>
        }
        docked={true}
        styles={{
          sidebar: { width: "auto", fontFamily: "Arial", textAlign: "center" },
        }}
      >
        <Header />
        <table>
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
        {this.state.message}
        {localStorage.getItem("@token")}
        <Container>
          {shoppingarray.map((item) => (
            <form
              style={{
                marginLeft: 20,
                alignItems: "flex-start",
                justifyContent: "space-around",
                background: "white",
                width: '80%',
                fontFamily: "Georgia",
              }}
            >
              <Input
                value={this.state.nomefantasia}
                style={{width:'80%'}}
                type="text"
                placeholder="Nome Fantasia"
                name="Nome Fantasia"
                required= 'true' 
              />
              <Input
              value={this.state.razaosocial}
              style={{width:'80%'}}
                type="text"
                placeholder="Razão social"
                name="Razão social"
                required= 'true' 
              />
              <Input
              value={this.state.cnpj}
              style={{width:'40%'}}
                type="number"
                placeholder="CNPJ"
                name="CNPJ"
                required= 'true' 
              />
              
              <Input
              value={this.state.telefone}
              style={{width:'40%'}}
                type="tel"
                placeholder="Telefone"
                name="Telefone"
                required= 'true' 
              />
              <Input
              value={this.state.email}
              style={{width:'40%'}}
                type="email"
                placeholder="Email"
                name="Email"
                required= 'true' 
              />
              <Input
              value={this.state.site}
              style={{width:'40%'}}
              type="url" placeholder="Site" 
              name="Site" />
              <Input
              value={this.state.responsavel}
              style={{width:'40%'}}
                type="text"
                placeholder="Responsavel"
                name="Responsavel"
                required= 'true' 
              />

              <InputFile
              value={this.state.logo}
              style={{width:'60%'}}
                type="file"
                placeholder="Logo"
                name="Logo"
              />
              <InputFile
              value={this.state.capa}
              style={{width:'60%'}}
                type="file"
                placeholder="Capa"
                name="Capa"
              />
              <table>
        <tbody>
          {segmentolist.map((seg) =>{
            return(
              <tr key={seg._id}>
                <td>
                    <div>
                            <input type="checkbox" value={seg.nome} 
                            /> <span class="label-text">{seg.nome}</span>
                    </div>
                </td>
            </tr>
            )
          })}
          
        </tbody>
      </table>

              <Button type="submit"> Cadastrar</Button>
              <Input /*hidden data*/ hidden disabled value={item.nome} />
            </form>
          ))}
        </Container>
      </Sidebar>
    );
  }
}

export default Dashboard;
