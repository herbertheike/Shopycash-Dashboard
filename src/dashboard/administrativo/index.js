import React from "react";
import ReactDOM from "react-dom";
import Modal from 'react-modal';
import {
  Section,
  Container,
  Input,
  Button,
  Title,
  InputFile,
  ButtonLogout,
  Label,
  EditBt,
  DeleteBt
} from "./style";
//import firebase from "../../data/Firebase";
import history from "../../history";
import { DashboardLayout } from "../../components/Layout";
import Icon from "awesome-react-icons";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      token: localStorage.getItem("@token"),
      message: "",
      messageloja: "",
      ischecked: false,
      _id: "",
      nome: "",
      endereco: "",
      cnpj: "",
      telefone: "",
      email: "",
      site: "",
      responsavel: "",
      shoppingslug: "",
      
      nomeedit: "",
      enderecoedit: "",
      cnpjedit: "",
      telefoneedit: "",
      emailedit: "",
      siteedit: "",
      responsaveledit: "",
      shoppingslugedit: "",

      shoppingarray: [],
      isModalOpen: false,
      isModalDelOpen:false,
      customStyles:{
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDelModal = this.closeDelModal.bind(this);
  }

  componentDidMount() {
    fetch("https://api-shopycash1.herokuapp.com/shopping")
      .then((res) => res.json())
      .then((result) => this.setState({ shoppingarray: result }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);
  }
  openModal= async (nome, endereco, cnpj, telefone,email, site, responsavel, shoppingslug)=> {
    this.setState({isModalOpen:true,
      nomeedit: nome,
      enderecoedit:endereco,
      cnpjedit:cnpj,
      telefoneedit:telefone,
      emailedit:email,
      siteedit:site,
      responsaveledit:responsavel,
      shoppingslugedit: shoppingslug});
  }
  openModalDelete = async (item)=> {
    this.setState({
      isModalDelOpen:true})
      const id = item;
      this.setState({_id: id}, () =>console.log(this.state._id))
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  closeModal(){
    this.setState({isModalOpen:false});
  }
  closeDelModal(){
    this.setState({isModalDelOpen:false});
  }
  deleteShopping =  () => {

    const _id = this.state._id;
    console.log(_id, 'new id')
     fetch("https://api-shopycash1.herokuapp.com/administrativo/delete/"+this.state._id, {
      method: "DELETE",
      headers: {
       Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("@token"),
      }})
    .then((res) => res.json(localStorage.setItem("@message", JSON.stringify(res))))
    .catch((error) => console.log(error))
    .finally(() => this.setState({ isLoaded: false }));
    
  }


  cadastrarShopping = async () => {
    // Simple POST request with a JSON body using fetch
    await fetch("https://api-shopycash1.herokuapp.com/administrativo", {
      method: "POST",
      headers: {
        
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
      body: JSON.stringify({
        nome: this.state.nome,
        endereco: this.state.endereco,
        cnpj: this.state.cnpj,
        telefone: this.state.telefone,
        email: this.state.email,
        site: this.state.site,
        responsavel: this.state.responsavel,
        shoppingslug: this.state.shoppingslug,
      }),
    })
      .then((res) => res.json(console.log(JSON.stringify(res))))
      .then((res) => localStorage.setItem("@message", JSON.stringify(res)))
      .catch((error) => {
        localStorage.setItem("@message", error);
        console.log(error);
      });

      window.location.reload();
  };

  updateShopping = async () =>{
    
    const shoppingslugedit = this.state.shoppingslugedit;
    console.log('SHOPPING--> '+ shoppingslugedit)
        await fetch("https://api-shopycash1.herokuapp.com/administrativo/update/"+shoppingslugedit, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
          body: JSON.stringify({
            nome: this.state.nomeedit,
            endereco: this.state.enderecoedit,
            cnpj: this.state.cnpjedit,
            telefone: this.state.telefoneedit,
            email: this.state.emailedit,
            site: this.state.siteedit,
            responsavel: this.state.responsaveledit,
            shoppingslug: this.state.shoppingslugedit,
          }),
        })
      .then((res) => res.json(console.log(JSON.stringify(res))))
      .then((res) => localStorage.setItem("@message", JSON.stringify(res)))
      .catch((error) => {
        localStorage.setItem("@message", error);
        console.log(error);
      });

      window.location.reload();
  };

  logout() {
    try {
      localStorage.removeItem("@token");
      history.push("/");
    } catch (error) {}
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { shoppingarray } = this.state;
    return (
      <DashboardLayout>
        <Section>
          <Title>Cadastro de Shoppings</Title>

          <Input
            style={{ width: "100%" }}
            type="text"
            placeholder="Shopping"
            required="true"
            name="nome"
            value={this.state.nome}
            onChange={this.handleChange}
          />

          <Input
            value={this.state.endereco}
            style={{ width: "100%" }}
            type="text"
            placeholder="Endereço"
            name="endereco"
            required="true"
            onChange={this.handleChange}
          />

          <Input
            value={this.state.cnpj}
            style={{ width: "25%" }}
            type="number"
            placeholder="CNPJ"
            name="cnpj"
            required="true"
            onChange={this.handleChange}
          />
          <Input
            value={this.state.telefone}
            style={{ width: "25%" }}
            type="tel"
            placeholder="Telefone"
            name="telefone"
            required="true"
            onChange={this.handleChange}
          />

          <Input
            value={this.state.email}
            style={{ width: "48.51%" }}
            type="email"
            placeholder="Email"
            name="email"
            required="true"
            onChange={this.handleChange}
          />
          <Input
            value={this.state.site}
            style={{ width: "50%" }}
            type="url"
            placeholder="Site"
            name="site"
            onChange={this.handleChange}
          />

          <Input
            value={this.state.responsavel}
            style={{ width: "24%" }}
            type="text"
            placeholder="Responsavel"
            name="responsavel"
            required="true"
            onChange={this.handleChange}
          />
          <Input
            value={this.state.shoppingslug}
            style={{ width: "24%" }}
            type="text"
            placeholder="Shoppign slug"
            name="shoppingslug"
            required="true"
            onChange={this.handleChange}
          />

          <hr />
          <Button value="Submit" onClick={this.cadastrarShopping}>
            Cadastrar
          </Button>

        </Section>
        <Section>
          <Label>Shoppings</Label>
          <table style={{borderWidth:'1px', width:'100%'}}>
            <thead style={{ backgroundColor:'rgba(254,145,29,0.5)'}}>
              <tr>
                <th>NOME</th>
                <th>ENDEREÇO</th>
                <th>CNPJ</th>
                <th>TELEFONE</th>
                <th>EMAIL</th>
                <th>SITE</th>
                <th>RESPONSAVEL</th>
                <th>SLUG</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            {shoppingarray.map((item) => {
              return (
                <tbody style={{fontFamily:'Helvetica', fontSize:'12px', textAlign: 'center'}}
                  key={item.shopping._id}>
                  <tr style={{borderWidth:'1px',height:'50px'}} >
                    <td style={{borderWidth:'1px'}}>{item.shopping.nome}</td>
                    <td style={{borderWidth:'1px'}}>{item.shopping.endereco}</td>
                    <td style={{borderWidth:'1px'}}>{item.shopping.cnpj}</td>
                    <td style={{borderWidth:'1px'}}>{item.shopping.telefone}</td>
                    <td style={{borderWidth:'1px'}}>{item.shopping.email}</td>
                    <td style={{borderWidth:'1px'}}>{item.shopping.site}</td>
                    <td style={{borderWidth:'1px'}}>{item.shopping.responsavel}</td>
                    <td style={{borderWidth:'1px'}}>{item.shopping.shoppingslug}</td>
                    <td style={{borderWidth:'1px'}}>
                      <EditBt onClick={() => this.openModal(
                        item.shopping.nome,
                        item.shopping.endereco,
                        item.shopping.cnpj,
                        item.shopping.telefone,
                        item.shopping.email,
                        item.shopping.site,
                        item.shopping.responsavel,
                        item.shopping.shoppingslug)}><Icon name='edit-pencil-simple' />EDITAR</EditBt>
                      <DeleteBt onClick={() => this.openModalDelete(item.shopping._id)}><Icon name="x"/>EXCLUIR</DeleteBt>
                      </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          </Section> 
          <div>
          <Modal
          isOpen={this.state.isModalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={this.state.customStyles}
        >
 
          <div>

            {this.state.shoppingslugedit}
          <Input
            style={{ width: "100%" }}
            type="text"
            placeholder="Shopping"
            required="true"
            name="nomeedit"
            value={this.state.nomeedit}
            onChange={this.handleChange}
          />

          <Input
            value={this.state.enderecoedit}
            style={{ width: "100%" }}
            type="text"
            placeholder="Endereço"
            name="enderecoedit"
            required="true"
            onChange={this.handleChange}
          />

          <Input
            value={this.state.cnpjedit}
            style={{ width: "25%" }}
            type="number"
            placeholder="CNPJ"
            name="cnpjedit"
            required="true"
            onChange={this.handleChange}
          />
          <Input
            value={this.state.telefoneedit}
            style={{ width: "25%" }}
            type="tel"
            placeholder="Telefone"
            name="telefoneedit"
            required="true"
            onChange={this.handleChange}
          />

          <Input
            value={this.state.emailedit}
            style={{ width: "48.51%" }}
            type="email"
            placeholder="Email"
            name="emailedit"
            required="true"
            onChange={this.handleChange}
          />
          <Input
            value={this.state.siteedit}
            style={{ width: "50%" }}
            type="url"
            placeholder="Site"
            name="siteedit"
            onChange={this.handleChange}
          />

          <Input
            value={this.state.responsaveledit}
            style={{ width: "24%" }}
            type="text"
            placeholder="Responsavel"
            name="responsaveledit"
            required="true"
            onChange={this.handleChange}
          />
          <Input
            value={this.state.shoppingslugedit}
            style={{ width: "24%" }}
            type="text"
            placeholder="Shoppign slug"
            name="shoppingslugedit"
            required="true"
            onChange={this.handleChange}
          />

          <hr />
          <Button value="Submit" onClick={this.updateShopping}>
            Alterar
          </Button>
          </div>
          <button onClick={this.closeModal}>close</button>
        </Modal>
        <Modal
          isOpen={this.state.isModalDelOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeDelModal}
          style={this.state.customStyles}
        ><div>
            {this.state._id}

         <DeleteBt onclick={() =>this.deleteShopping()}>DELETE</DeleteBt>

         </div>
         <button onClick={this.closeDelModal}>close</button>
          </Modal>
        </div>
        
      </DashboardLayout>
    );
  }
}

/*
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


  listsegmento() {
    fetch("http://192.168.15.69:3001/segmento/", {
      headers: { Authorization: "Bearer " + localStorage.getItem("@token") },
    })
      .then((res) => res.json())
      .then((result) => this.setState({ segmentolist: result }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);
  }

    handleChecked(event) {
      if(event.target.checked){
        this.setState({segmento:[...this.state.segmento, event.target.value]})
        //newarr.push([i, event.target.value])
      }
      console.log([this.state.segmento])
  }
    this.handleChecked = this.handleChecked.bind(this);
     this.listsegmento();
*/
export default Dashboard;
