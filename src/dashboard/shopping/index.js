import React from "react";
import Modal from 'react-modal';
import {
  Section,
  Input,
  Button,
  Title,
  Label,
  EditBt,
  DeleteBt,
  InputFile
} from "./style";
import history from "../../history";
import { DashboardLayout } from "../../components/Layout";
import Icon from "awesome-react-icons";
import noimage from "../../imgsrc/logopad.jpg"
import { Checkbox } from '@mui/material';


class SbDashboard extends React.Component {
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
      nomefantasia: "",
      razaosocial: "",
      shopping: "",
      cnpj: "",
      email: "",
      site: "",
      telefone: "",
      responsavel: "",
      shoppingslug:localStorage.getItem("@slug"),
      lojaslug: "",
      lojaid:"",
      shoppingid:localStorage.getItem("@shoppingid"),
      imageURL:'',
      logobase64:null,
      capabase64:null,
      segmento:[],
      segmentolist:[],
      userrole: "loja",
      
      nomefantasiaedit: "",
      razaosocialedit: "",
      shoppingedit:"",
      cnpjedit: "",
      emailedit: "",
      siteedit: "",
      telefoneedit: "",
      responsaveledit: "",
      lojaslugedit: "",
      logoedit:null,
      capaedit:null,
      
      shdata:[],
      lojaarray: [],
      isModalOpen: false,
      isModalDelOpen:false,
      customStyles:{
        content : {
          top                   : '20%',
          left                  : '20%',
          right                 : '20%',
          bottom                : '20%',
        }
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDelModal = this.closeDelModal.bind(this);
    this.onLogoChange = this.onLogoChange.bind(this);
    this.onCapaChange = this.onCapaChange.bind(this);
    this.onLogoEdit = this.onLogoEdit.bind(this);
    this.onCapaEdit = this.onCapaEdit.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
          
   // this.fileInput = React.createRef();
    //this.handleUploadImage = this.handleUploadImage.bind(this);
  }



  componentDidMount() {
    this.listsegmento();
    fetch("https://api-shopycash1.herokuapp.com/indexby/shopping/"+localStorage.getItem("@shoppingid"),{                                                                          
    })
      .then((res) => res.json())
      .then((result) => this.setState({ lojaarray: result }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);


     fetch("https://api-shopycash1.herokuapp.com/indexsh/"+localStorage.getItem("@slug"),{                                                                          
    })
      .then((res) => res.json())
      .then((result) => this.setState({ shdata: result }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);
      console.log(this.state.shdata)      
  }
  openModal= async (nomefantasia, razaosocial,shopping, cnpj,email,site,telefone,responsavel,lojaslug,logo, capa)=> {
    this.setState({isModalOpen:true, 
      nomefantasiaedit: nomefantasia,
      razaosocialedit:razaosocial,
      cnpjedit:cnpj,
      shoppingedit:shopping,
      emailedit:email,
      siteedit:site,
      telefoneedit:telefone,
      responsaveledit:responsavel,
      lojaslugedit: lojaslug,
      logoedit:logo,
      capaedit:capa});
      console.log(logo)
  }
  openModalDelete = async (item)=> {
    this.setState({
      isModalDelOpen:true})
      const id = item;
      this.setState({_id: id}, () =>console.log(this.state._id))
  }
  afterOpenModal() {
    
  }
  closeModal(){
    this.setState({isModalOpen:false});
  }
  closeDelModal(){
    this.setState({isModalDelOpen:false});
  }
  deleteloja = async (item) => {

    const _id = item;
    console.log(_id, 'new id')
    await fetch("https://api-shopycash1.herokuapp.com/deletestore/"+_id, {
      method: "GET",
      headers: {
       Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("@token"),
      }})
    .then((res) => res.json(localStorage.setItem("@delmessage", JSON.stringify(res))))
    .catch((error) => console.log(error))
    .finally(() => this.setState({ isLoaded: false }));

    window.location.reload();
    
  }



  cadastrarloja = async () => {
    const payload = JSON.stringify({
      nomefantasia: this.state.nomefantasia,
      razaosocial: this.state.razaosocial,
      shopping: this.state.shopping,
      cnpj: this.state.cnpj,
      email: this.state.email,
      site: this.state.site,
      telefone: this.state.telefone,
      responsavel: this.state.responsavel,
      lojaslug: this.state.lojaslug,
      shopping_id: this.state.shoppingid,
      logo: this.state.logobase64,
      capa: this.state.capabase64,
      segmento:this.state.segmento
    })
    
    await fetch("https://api-shopycash1.herokuapp.com/insernewstore/"+localStorage.getItem("@slug"), {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
      body: payload,
    })
      .then((res) => res.json())
      .then((res) => this.setState({lojaid: res.data._id}))
      .catch((error) => {
        localStorage.setItem("@error", error);
        console.log(error);
      });
      this.cadastrausuario();
      //
      
  };

  updateloja = async () =>{
    const payload = JSON.stringify({
      nomefantasia: this.state.nomefantasiaedit,
      razaosocial: this.state.razaosocialedit,
      shopping: this.state.shoppingeditt,
      cnpj: this.state.cnpjedit,
      email: this.state.emailedit,
      site: this.state.siteedit,
      telefone: this.state.telefoneedit,
      responsavel: this.state.responsaveledit,
      lojaslug: this.state.lojaslugedit,
      logo: this.state.logoedit,
      capa: this.state.capaedit,
    })
    const lojaslugedit = this.state.lojaslugedit;
    console.log('SHOPPING--> '+ lojaslugedit)
        await fetch("https://api-shopycash1.herokuapp.com/updatstore/"+lojaslugedit, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
      body: payload,
        })
      .then((res) => res.json(console.log(JSON.stringify(res))))
      .then((res) => localStorage.setItem("@message", JSON.stringify(res)))
      .catch((error) => {
        localStorage.setItem("@message", error);
        console.log(error);
      });

      //window.location.reload();
  };
/*
  logout() {
    try {
      localStorage.clear();
      history.push("/");
    } catch (error) {}
  }
*/
  handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target;
    const type = target.type;
    const value = target.value;
    const name = target.name;

    if(type === 'file'){
      this.setState({ [name]: event.target.files});
    }else{
    this.setState({
      [name]: value,
    });
  }
  };

  onLogoChange (event) {
    event.preventDefault();
    console.log("LOGO:\n", event.target.files[0])
    let file = event.target.files[0];
    let baseurl = '';

    if(file){
      const reader = new FileReader();
     
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseurl = reader.result;
        console.log(baseurl)
        this.setState({logobase64:baseurl})
        //this._handleReaderLogo.bind(this)};
      }
    }    
  };

  onCapaChange (event) {
    event.preventDefault();
    console.log("CAPA:\n", event.target.files[0])
    let file = event.target.files[0];
    let baseurl = '';

    if(file){
      const reader = new FileReader();
     
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseurl = reader.result;
        console.log(baseurl)
        this.setState({capabase64:baseurl})
      }
    }  
  };

  onLogoEdit (event) {
    event.preventDefault();
    console.log("LOGO:\n", event.target.files[0])
    let file = event.target.files[0];
    let baseurl = '';

    if(file){
      const reader = new FileReader();
     
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseurl = reader.result;
        console.log(baseurl)
        this.setState({logoedit:baseurl})
      }
    }    
  };

  onCapaEdit (event) {
    event.preventDefault();
    console.log("CAPA:\n", event.target.files[0])
    let file = event.target.files[0];
    let baseurl = '';

    if(file){
      const reader = new FileReader();
     
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseurl = reader.result;
        console.log(baseurl)
        this.setState({capaedit:baseurl})
      }
    }  
  };
        listsegmento() {
          fetch("https://api-shopycash1.herokuapp.com/segmento/", {
            headers: { Authorization: "Bearer " + localStorage.getItem("@token") },
          })
            .then((res) => res.json())
            .then((result) => this.setState({ segmentolist: result }))
            .catch((error) => console.log(error))
            .finally(() => this.setState({ isLoaded: false }), []);
        }

          handleChecked(event) {
            let newcheck = '';
            
            if(this.state.segmento.length<=0 && event.target.checked){
              newcheck = event.target.value
              this.setState({segmento:[newcheck]})
            }else if(this.state.segmento.length>0 && event.target.checked){
              newcheck = event.target.value
              this.setState({segmento:[...this.state.segmento,newcheck]})
            }


            let array = [...this.state.segmento]
            let index = array.indexOf(event.target.value)
            if(event.target.checked === false){
              array.splice(index,1)
              this.setState({segmento:array})
            }
            console.log(event)
        }
          
/*-----------------------usuario loja-------------------*/
cadastrausuario = async () => {

  const payload = JSON.stringify({
    nome: this.state.nomeuser,
    email: this.state.emailuser,
    pass: this.state.passuser,
    userRole: this.state.userrole,
    shoppingslug: this.state.shoppingslug,
    lojaslug:this.state.lojaslug,
    shoppingid: this.state.shoppingid,
    lojaid: this.state.lojaid
  })

  console.log(payload)

  await fetch("https://api-shopycash1.herokuapp.com/api/loja/cadastro", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("@token"),
  },
  body: payload,
})
  .then((res) => res.json())
  .then((res) => localStorage.setItem("@messageuser", JSON.stringify(res)))
  .catch((error) => {
    localStorage.setItem("@message", error);
    console.log(error);
  });

  window.location.reload(); 
}


  render() {
    const { lojaarray } = this.state;
    return (
      <DashboardLayout>
        <Section>
        {this.state.shdata.map((item, index)=>{
          return(
          <Title key={item.shopping._id}>
            Cadastro de Lojas - {item.shopping.shopping}
          </Title>
          )
        })}
        <span>Usuario Logado: {localStorage.getItem("@nome")} - {localStorage.getItem("@email")}</span>
          <Input
            style={{ width: "99%" }}
            type="text"
            placeholder="Nome Fantasia"
            required={true}
            name="nomefantasia"
            value={this.state.nomefantasia}
            onChange={this.handleChange}
          />
          <Input
            style={{ width: "99%" }}
            type="text"
            placeholder="Razão Social"
            required={true}
            name="razaosocial"
            value={this.state.razaosocial}
            onChange={this.handleChange}
          />

          <Input
            value={this.state.shopping}
            style={{ width: "74%" }}
            type="text"
            placeholder="Shopping"
            name="shopping"
            required={true}
            onChange={this.handleChange}
          />

          <Input
            value={this.state.cnpj}
            style={{ width: "24.5%" }}
            type="number"
            placeholder="CNPJ"
            name="cnpj"
            required={true}
            onChange={this.handleChange}
          />
          

          <Input
            value={this.state.email}
            style={{ width: "48.51%" }}
            type="email"
            placeholder="Email"
            name="email"
            required={true}
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
            value={this.state.telefone}
            style={{ width: "24%" }}
            type="tel"
            placeholder="Telefone"
            name="telefone"
            required={true}
            onChange={this.handleChange}
          />

          <Input
            value={this.state.responsavel}
            style={{ width: "24%" }}
            type="text"
            placeholder="Responsavel"
            name="responsavel"
            required={true}
            onChange={this.handleChange}
          />
          <Input
            value={this.state.lojaslug}
            style={{ width: "24%" }}
            type="text"
            placeholder="Loja Slug"
            name="lojaslug"
            required={true}
            onChange={this.handleChange}
          />
          <div style={{padding:0,display:'flex', flexDirection:'row', justifyContent:"right"}}>
           <div style={{flexDirection:'column', justifyContent:'center',alignItems:'center', padding:10}}>
            <Label style={{padding:10,display:'block'}} htmlFor="logo">Selecione um logo</Label>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}> 
                <InputFile
                  style={{ width: "100%"}}
                  Label="LOGO"
                  type="file"
                  name="logo"
                  id="logo"
                  accept=".jpeg, .png, .jpg .gif"
                  required={true}
                  onChange={this.onLogoChange}
                />
                <img alt="logo" src={this.state.logobase64 == null ? noimage : this.state.logobase64} style={{borderWidht:1,paddingTop:10, width:250,height: 250,overflow: "hidden",borderRadius: "50%", justifyContent:'center'}}/>
               </div>
                </div>
              <div style={{flexDirection:'column',  padding:10}}>
            <Label style={{padding:10, display:'block'}} htmlFor="capa">Selecione uma capa</Label>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
              <InputFile
                style={{ width: "100%" }}
                label="CAPA"
                type="file"
                name="capa"
                id="capa"
                accept=".jpeg, .png, .jpg"
                required={true}
                onChange={this.onCapaChange}
              />
              <img alt="capa" src={this.state.capabase64 == null ? noimage : this.state.capabase64} style={{borderWidht:1,height:250, overflow: "hidden", paddingTop:10}}/>
              </div>
              </div>
          </div>
          <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', padding:10}}>
            <Label>Segmentos</Label>
            <div style={{display:'flex',flexDirection:'column'}}>
                {this.state.segmentolist.slice(0,7).map((seg, index) => {
                      return (
                        <div>
                              <Checkbox value={seg.nome} name="segmento" onChange={this.handleChecked}
                              style={{padding:10}}/>
                              <span key={seg._id} style={{display:'inline-block', paddingLeft:10}}>{seg.nome}</span>
                        </div>
                      );
                    })}
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                {this.state.segmentolist.slice(7,14).map((seg, index) => {
                      return (
                        <div>
                              <Checkbox value={seg.nome} name="segmento" onChange={this.handleChecked}
                              style={{padding:10}}/>
                              <span key={seg._id} style={{display:'inline-block', paddingLeft:10}}>{seg.nome}</span>
                        </div>
                      );
                    })}
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                {this.state.segmentolist.slice(14,21).map((seg, index) => {
                      return (
                        <div>
                              <Checkbox value={seg.nome} name="segmento" onChange={this.handleChecked}
                              style={{padding:10}}/>
                              <span key={seg._id} style={{display:'inline-block', paddingLeft:10}}>{seg.nome}</span>
                        </div>
                      );
                    })}
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                {this.state.segmentolist.slice(21,28).map((seg, index) => {
                      return (
                        <div>
                              <Checkbox value={seg.nome} name="segmento" onChange={this.handleChecked}
                              style={{padding:10}}/>
                              <span key={seg._id} style={{display:'inline-block', paddingLeft:10}}>{seg.nome}</span>
                        </div>
                      );
                    })}
                    </div>
                    <br />
          </div>
          <hr />
          <Title>Cadastro do usuario da loja: {this.state.nomefantasia}</Title>
          <Input
            value={this.state.nomeuser}
            style={{ width: "99%" }}
            type="text"
            placeholder="Nome do usuario"
            name="nomeuser"
            required="true"
            onChange={this.handleChange} 
          />
          <Input
            value={this.state.emailuser}
            style={{ width: "99%" }}
            type="email"
            placeholder="Email do usuario"
            name="emailuser"
            required="true"
            onChange={this.handleChange}
          />

          <Input
            value={this.state.passuser}
            style={{ width: "24%" }}
            type="text"
            placeholder="Senha do usuario"
            name="passuser"
            required="true"
            onChange={this.handleChange}
          />
          <Input
            value={this.state.userrole}
            style={{ width: "24%" }}
            type="text"
            placeholder="role"
            name="userrole"
            required="true"
            disabled
          />
          
          <Input
            value={this.state.lojaslug}
            style={{ width: "24%" }}
            type="text"
            placeholder="lojaslug"
            name="lojaslug"
            required="true"
            disabled
          />
          <div>
          <Button value="Submit" onClick={this.cadastrarloja}>
            Cadastrar
          </Button>
          </div>
        </Section>
        <Section>
          <Label>Lojas</Label>
          <table style={{borderWidth:'1px', width:'100%'}}>
            <thead style={{ backgroundColor:'rgba(94, 170, 168, 0.5)'}}>
              <tr>
                <th>NOME</th>
                <th>RAZÃO SOCIAL</th>
                <th>SHOPPING</th>
                <th>CNPJ</th>
                <th>EMAIL</th>
                <th>SITE</th>
                <th>TELEFONE</th>
                <th>RESPONSAVEL</th>
                <th>SLUG</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            {lojaarray.map((item, index) => {
              return (
                <tbody style={{fontFamily:'Helvetica', fontSize:'12px', textAlign: 'center'}}
                  key={item._id}>
                  <tr key={item._id} style={{borderWidth:'1px',height:'50px'}} >
                    <td  centerstyle={{borderWidth:'1px'}}>{item.nomefantasia}</td>
                    <td style={{borderWidth:'1px'}}>{item.razaosocial}</td>
                    <td style={{borderWidth:'1px'}}>{item.shopping}</td>
                    <td style={{borderWidth:'1px'}}>{item.cnpj}</td>
                    <td style={{borderWidth:'1px'}}>{item.email}</td>
                    <td style={{borderWidth:'1px'}}>{item.site}</td>
                    <td style={{borderWidth:'1px'}}>{item.telefone}</td>
                    <td style={{borderWidth:'1px'}}>{item.responsavel}</td>
                    <td style={{borderWidth:'1px'}}>{item.slug}</td>
                    <td style={{borderWidth:'1px', alignItems:'center'}}>
                      <EditBt onClick={() => this.openModal(
                        item.nomefantasia,
                        item.razaosocial,
                        item.shopping,
                        item.cnpj,
                        item.email,
                        item.site,
                        item.telefone,
                        item.responsavel,
                        item.slug,
                        item.Logo,
                        item.Capa
                        )}><Icon name='edit-pencil-simple' />EDITAR</EditBt>
                      <DeleteBt onClick={() => this.deleteloja(item._id)}><Icon name="x"/>EXCLUIR</DeleteBt>
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
            {this.state.lojaslugedit}
          <Input
            style={{ width: "100%" }}
            type="text"
            placeholder="Nome Fantasia"
            required={true}
            name="nomefantasiaedit"
            value={this.state.nomefantasiaedit}
            onChange={this.handleChange}
          />

          <Input
            value={this.state.razaosocialedit}
            style={{ width: "100%" }}
            type="text"
            placeholder="Razão Social"
            name="razaosocialedit"
            required={true}
            onChange={this.handleChange}
          />
          <Input
            value={this.state.shoppingedit}
            style={{ width: "100%" }}
            type="text"
            placeholder="Shopping"
            name="shoppingedit"
            required={true}
            onChange={this.handleChange}
          />

          <Input
            value={this.state.cnpjedit}
            style={{ width: "25%" }}
            type="number"
            placeholder="CNPJ"
            name="cnpjedit"
            required={true}
            onChange={this.handleChange}
          />
          <Input
            value={this.state.emailedit}
            style={{ width: "48.51%" }}
            type="email"
            placeholder="Email"
            name="emailedit"
            required={true}
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
            value={this.state.telefoneedit}
            style={{ width: "25%" }}
            type="tel"
            placeholder="Telefone"
            name="telefoneedit"
            required={true}
            onChange={this.handleChange}
          />
          <Input
            value={this.state.responsaveledit}
            style={{ width: "24%" }}
            type="text"
            placeholder="Responsavel"
            name="responsaveledit"
            required={true}
            onChange={this.handleChange}
          />
          <Input
            value={this.state.lojaslugedit}
            style={{ width: "24%" }}
            type="text"
            placeholder="LojaSlug"
            name="lojaslugedit"
            required={true}
            onChange={this.handleChange}
          />
          <div style={{padding:0,display:'flex', flexDirection:'row', justifyContent:"right"}}>
           <div style={{flexDirection:'column', justifyContent:'center',alignItems:'center', padding:10}}>
            <Label style={{padding:10,display:'block'}} htmlFor="logo">Selecione um logo</Label>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}> 
                <InputFile
                  style={{ width: "100%"}}
                  Label="LOGO"
                  type="file"
                  name="logoedit"
                  id="logoedit"
                  accept=".jpeg, .png, .jpg .gif"
                  required={true}
                  onChange={this.onLogoEdit}
                />
                <img alt="logo" src={this.state.logoedit == null ? noimage : this.state.logoedit} style={{borderWidht:1,paddingTop:10, width:250,height: 250,overflow: "hidden",borderRadius: "50%", justifyContent:'center'}}/>
               </div>
                </div>
              <div style={{flexDirection:'column',  padding:10}}>
            <Label style={{padding:10, display:'block'}} htmlFor="capa">Selecione uma capa</Label>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
              <InputFile
                style={{ width: "100%" }}
                label="CAPA"
                type="file"
                name="capaedit"
                id="capaedit"
                accept=".jpeg, .png, .jpg"
                required={true}
                onChange={this.onCapaEdit}
              />
              <img alt="capa" src={this.state.capaedit == null ? noimage : this.state.capaedit} style={{borderWidht:1,height:250, overflow: "hidden", paddingTop:10}}/>
              </div>
              </div>
          </div>

          <hr />
          <Button value="Submit" onClick={this.updateloja}>
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

         <DeleteBt onclick={() =>this.deleteloja()}>DELETE</DeleteBt>

         </div>
         <button onClick={this.closeDelModal}>close</button>
          </Modal>
        </div>
        
      </DashboardLayout>
    );
  }
}

export default SbDashboard;
