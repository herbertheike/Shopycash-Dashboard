import React from "react";
import Modal from "react-modal";
import {
  Section,
  Input,
  Button,
  Title,
  Label,
  EditBt,
  DeleteBt,
  InputFile,
  Img,
  TextArea
} from "./style";
import history from "../../history";
import { DashboardLoja } from "../../components/Layout";
import Icon from "awesome-react-icons";
import noimage from "../../imgsrc/logopad.jpg";
import moment from 'moment';

class LjDashboard extends React.Component {
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
      lojaid: localStorage.getItem("@lojaid"),
      nome: "",
      desc: "",
      preco: 0,
      loja: localStorage.getItem("@loja"),
      shopping: localStorage.getItem("@shopping"),
      shoppingid: localStorage.getItem("@shoppingid"),
      categoria: "",
      categoriaid:"",
      ativo: true,
      estoque: 0,
      imagembase64: null,
      imagem2base64: null,

      categoriaslist: [],
      nomeedit: "",
      descedit: "",
      precoedit: 0,
      categoriaedit: "",
      categoriaidedit:"",
      ativoedit:true,
      estoqueedit:0,
      imgbs64edt: null,
      imgbs642edt:null,

      lojadata: [],
      prodarray: [],
      isModalOpen: false,
      isModalDelOpen: false,
      customStyles: {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        }}
    };
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDelModal = this.closeDelModal.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onImage2Change = this.onImage2Change.bind(this);
    this.onImageEdit = this.onImageEdit.bind(this);
    this.onImage2Edit = this.onImage2Edit.bind(this);
    this.handleChecked = this.handleChecked.bind(this);

    // this.fileInput = React.createRef();
    //this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  componentDidMount () {
    this.listcategorias();
    fetch(
      "https://api-shopycash1.herokuapp.com/indexproductby/"
      +localStorage.getItem("@lojaid")
    )
      .then((res) => res.json())
      .then((result) => this.setState({ prodarray: result }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);
      
      fetch("https://api-shopycash1.herokuapp.com/indexstoreby/"
      +localStorage.getItem("@lojaid"),{                                                                          
      })
        .then((res) => res.json())
        .then(function(result){
          localStorage.setItem("@loja", result.nomefantasia)
          localStorage.setItem("@shopping", result.shopping)
        })
        .catch((error) => console.log(error))
        .finally(() => this.setState({ isLoaded: false }), []);
  }
  openModal = async (
    id,
    nome,
    desc,
    preco,
    estoque,
    imagem,
    imagem2,
    categoria,
    categoriaid
  ) => {
    this.setState({
      isModalOpen: true,
      _id:id,
      nomeedit: nome,
      descedit: desc,
      precoedit: preco,
      estoqueedit: estoque,
      imgbs64edt: imagem,
      imgbs642edt: imagem2,
      categoriaedit: categoria,
      categoriaidedit: categoriaid,

    });
  };
  openModalDelete = async (item) => {
    this.setState({
      isModalDelOpen: true,
    });
    const id = item;
    this.setState({ _id: id }, () => console.log(this.state._id));
  };
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }
  closeDelModal() {
    this.setState({ isModalDelOpen: false });
  }
  deleteprod = async (item) => {
    const _id = item;
    const lojaid = this.state.lojaid
    console.log(_id, "new id");
    await fetch("https://api-shopycash1.herokuapp.com/product/delete/" + lojaid+"/"+_id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
    })
      .then((res) =>
        res.json(localStorage.setItem("@delmessage", JSON.stringify(res)))
      )
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }));

    window.location.reload();
  };

  cadastrarproduto = async () => {
    const payload = JSON.stringify({
      loja_id: this.state.lojaid,
      nome: this.state.nome,
      desc: this.state.desc,
      preco: this.state.preco,
      loja: this.state.loja,
      shopping: this.state.shopping,
      shoppingid: this.state.shoppingid,
      categoria: this.state.categoria,
      categoriaid:this.state.categoriaid,
      ativo: this.state.ativo,
      imagem: this.state.imagembase64,
      imagem2: this.state.imagem2base64,
      estoque: this.state.estoque,
    });

    await fetch(
      "https://api-shopycash1.herokuapp.com/stores/insertprod/" +
      localStorage.getItem("@lojaid"),
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },
        body: payload,
      }
    )
      .then((res) => res.json())
      .then((res) => localStorage.setItem("@prodcad", res))
      .catch((error) => {
        localStorage.setItem("@error", error);
        console.log(error);
      });
    //this.cadastrausuario();

    window.location.reload();
  
  };

  updateproduto = async () => {
    const payload = JSON.stringify({
        loja_id: this.state.lojaid,
        nome: this.state.nomeedit,
        desc: this.state.descedit,
        preco: this.state.precoedit,
        categoria: this.state.categoriaedit,
        categoriaid:this.state.categoriaidedit,
        ativo: this.state.ativoedit,
        imagem: this.state.imgbs64edt,
        imagem2: this.state.imgbs642edt,
        estoque: this.state.estoqueedit
    })
    const lojaid = this.state.lojaid;
    const prodid = this.state._id;
    await fetch(
      "https://api-shopycash1.herokuapp.com/product/update/"+lojaid+"/"+prodid ,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },
        body: payload
      }
    )
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
      localStorage.clear();
      history.push("/");
    } catch (error) { }
  }

  handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target;
    const type = target.type;
    const value = target.value;
    const title= target.title;
    const id = target.id;
    const name = target.name;

    if (type === "file") {
      this.setState({ [name]: event.target.files });
    }else if(type === "radio" && id === "normalfield"){
      this.setState({categoriaid: title, categoria:value});
    }else if (type === "radio" && id === "editfield" ) {
      this.setState({categoriaidedit: title, categoriaedit:value});
    }
    else {
      this.setState({
        [name]: value,
      });
    }

      console.log(event)
      console.log(this.state.categoria);
      console.log(this.state.categoriaid);
  };

  onImageChange(event) {
    event.preventDefault();
    let file = event.target.files[0];
    let baseurl = "";

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        baseurl = reader.result;
        console.log(baseurl);
        this.setState({ imagembase64: baseurl });
        //this._handleReaderLogo.bind(this)};
      };
    }
  }

  onImage2Change(event) {
    event.preventDefault();
    let file = event.target.files[0];
    let baseurl = "";

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        baseurl = reader.result;
        console.log(baseurl);
        this.setState({ imagem2base64: baseurl });
      };
    }
  }

  onImageEdit (event) {
    event.preventDefault();
    let file = event.target.files[0];
    let baseurl = '';

    if(file){
      const reader = new FileReader();
     
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseurl = reader.result;
        console.log(baseurl)
        this.setState({imgbs64edt:baseurl})
      }
    }    
  };

  onImage2Edit (event) {
    event.preventDefault();
    let file = event.target.files[0];
    let baseurl = '';

    if(file){
      const reader = new FileReader();
     
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseurl = reader.result;
        console.log(baseurl)
        this.setState({imgbs642edt:baseurl})
      }
    }  
  };



  listcategorias= async ()=> {
    await fetch("https://api-shopycash1.herokuapp.com/indexcategory/"+localStorage.getItem("@lojaid"))
      .then((res) => res.json())
      .then((result) => this.setState({ categoriaslist: result }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);
      console.log(this.state.categoriaslist)
  }

  handleChecked(event) {
    console.log(event);
    let newcheck = "";
    if (this.state.categoria.length <= 0 && event.target.checked) {
      newcheck = event.target.value;
      this.setState({ categoria: [newcheck] });
    } else if (this.state.categoria.length > 0 && event.target.checked) {
      newcheck = event.target.value;
      this.setState({ categoria: [...this.state.categoria, newcheck] });
    }
    let array = [...this.state.categoria]
    let index = array.indexOf(event.target.value)
    if(event.target.checked === false){
      array.splice(index,1)
      this.setState({categoria:array})
    }
  }

  /*-----------------------usuario loja-------------------*/
  cadastrausuario = async () => {
    const payload = JSON.stringify({
      nome: this.state.nomeuser,
      email: this.state.emailuser,
      pass: this.state.passuser,
      userRole: this.state.userrole,
      shoppingslug: this.state.shoppingslug,
      lojaslug: this.state.lojaslug,
      shoppingid: this.state.shoppingid,
      lojaid: this.state.lojaid,
    });

    console.log(payload);

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
  };

  /**
 * {this.state.ljdata.map((item, index)=>{
          return(
          <Title key={item._id}>
            Cadastro de Produtos - {item.nomefantasia}
          </Title>
          )
        })}
 */

  render() {
    const { prodarray } = this.state;
    return (
      <DashboardLoja>
        <Section>
          <Title>
            Cadastro de Produtos - {localStorage.getItem("@loja")} - {localStorage.getItem("@shopping")}
          </Title>
          <span>
            Usuario Logado: {localStorage.getItem("@nome")} -{" "}
            {localStorage.getItem("@email")}
          </span>
          <Input
            style={{ width: "99%" }}
            type="text"
            placeholder="Nome"
            required={true}
            name="nome"
            value={this.state.nome}
            onChange={this.handleChange}
          />
          <Input
            style={{ width: "99%" }}
            type="text"
            placeholder="Descrição"
            required={true}
            name="desc"
            value={this.state.desc}
            onChange={this.handleChange}
          />
          <Label>Preço</Label>
          <Input
            value={this.state.preco}
            style={{ width: "10%" }}
            type="number"
            placeholder="Preço"
            name="preco"
            required={true}
            onChange={this.handleChange}
          />
          <Label>Estoque</Label>
          <Input
            value={this.state.estoque}
            style={{ width: "10%" }}
            type="number"
            name="estoque"
            required={true}
            onChange={this.handleChange}
          />
          <div
            style={{
              padding: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "right",
            }}
          >
            <div
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Label style={{ padding: 10, display: "block" }} htmlFor="logo">
                Imagem Principal
              </Label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <InputFile
                  style={{ width: "100%" }}
                  Label="Imagem Principal"
                  type="file"
                  name="imagem"
                  id="imagem"
                  accept=".jpeg, .png, .jpg .gif"
                  required={true}
                  onChange={this.onImageChange}
                />
                <img
                  alt="imagem1"
                  src={
                    this.state.imagembase64 == null
                      ? noimage
                      : this.state.imagembase64
                  }
                  style={{
                    borderWidht: 1,
                    paddingTop: 10,
                    width: 250,
                    height: 250,
                    overflow: "hidden",
                    borderRadius: "50%",
                    justifyContent: "center",
                  }}
                />
              </div>
            </div>
            <div style={{ flexDirection: "column", padding: 10 }}>
              <Label style={{ padding: 10, display: "block" }} htmlFor="capa">
                Imagem Secundaria
              </Label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <InputFile
                  style={{ width: "100%" }}
                  label="Imagem Secundaria"
                  type="file"
                  name="imagem2"
                  id="imagem2"
                  accept=".jpeg, .png, .jpg"
                  required={true}
                  onChange={this.onImage2Change}
                />
                <img
                  alt="imagem2"
                  src={
                    this.state.imagem2base64 == null
                      ? noimage
                      : this.state.imagem2base64
                  }
                  style={{
                    borderWidht: 1,
                    height: 250,
                    overflow: "hidden",
                    paddingTop: 10,
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 10,
            }}
          >
            <Label>Categorias</Label>
              {this.state.categoriaslist.map((cat) => {
                return (
                  <div style={{fontFamily:'Helvetica',
                  justifyContent:'right',
                  alignItems:'center',
                  padding: 10, display:'flex', flexDirection: "row"}}>
                  <Input
                  id="normalfield"
                  title={cat._id}
                  type="radio"
                  checked={this.state.categoria === cat.nome}
                  onChange={this.handleChange}
                  value={cat.nome}/>
                  <label>{cat.nome}</label>
                  </div>
                );
              })}
            <br />
          </div>
         
          <div>
            <Button value="Submit" onClick={this.cadastrarproduto}>
              Cadastrar
            </Button>
          </div>
        </Section>
        <Section>
          <Label>Produtos</Label>
          {prodarray.map((item, index) => {
            const isEmpty = 'rgba(255, 0, 0, 0.2)'
            const isFull = 'rgba(19, 138, 0, 0.2)'
            const storageColorCode = item.estoque > 0 ? isFull : isEmpty
            return (
              
              <div style={{backgroundColor:storageColorCode, padding: 10, width:'100%', margin:10}}> 
              <div
                style={{
                  padding: 25,
                  paddingRight:100,
                  paddingLeft:50,
                  width:'100%',
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:'space-between'
                }}
              >
                    <div
                      key={item._id}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: 10,
                        flexDirection: "column",
                      }}
                    >
                      <Title style={{ display: "block", fontFamily:'Helvetica', fontSize:28, padding:10}}>
                        {item.nome}
                      </Title>
                      <div style={{display: "flex", flexDirection: "row" }}>
                      <Img alt="imagem1" src={item.imagem} style={{ borderRadius:5, width: 250 }} />
                      <Img alt="imagem2" src={item.imagem2} style={{ borderRadius:5, width: 250 }} />
                      </div>
                       </div>
                    <div style={{display:'flex',flexDirection: "column", paddingTop: 60,}}>
                      <textarea disabled style={{display: "block", width: 300,height:250, fontSize:16, textAlign:'justify' }}> 
                        {"Descrição: \n"+item.desc}
                      </textarea>

                      <label style={{display: "block", width: 300, fontSize:16, textAlign:'justify', paddingTop:10 }}> 
                        {"Categoria: \n"+item.categoria}
                      </label>
                      <label
                        style={{paddingTop: 30, fontSize:26 }}
                      >Preço:
                        R${item.preco.toFixed(2)}
                      </label>

                      <div style={{ flexDirection: "row" }}>
                      <label
                        style={{paddingTop: 30, display: "block", fontSize:24}}
                      >
                        Qtd em estoque: {item.estoque}
                      </label>
                    </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: "row",paddingLeft:50, }}>
                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <label style={{}}>
                      Criado em: {moment(item.createdAt).utc().format('DD/MM/YYYY HH:MM:SS')}
                    </label>
                    <label style={{}}>
                      Ultima alteração em: {moment(item.updatedAt).utc().format('DD/MM/YYYY HH:MM:SS')}
                    </label>
                    </div>
                  </div>
                  <div
                  style={{
                    paddingBottom:40,
                    paddingLeft:50,
                    display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:'right',
                  }}
                >
                  <div style={{flexDirection: "column"}}>
                  <EditBt
                    onClick={() =>
                      this.openModal(
                        item._id,
                        item.nome,
                        item.desc,
                        item.preco,
                        item.estoque,
                        item.imagem,
                        item.imagem2,
                        item.categoria,
                        item.categoriaid
                      )
                    }
                  >
                    <Icon name="edit-pencil-simple" />
                    EDITAR
                  </EditBt>
                  </div>
                  <div style={{flexDirection: "column", display:'block'}}>
                  <DeleteBt onClick={() => this.deleteprod(item._id)}>
                    <Icon name="x" />
                    EXCLUIR
                  </DeleteBt>
                  </div>
                </div>
              </div>
            );
          })}
        </Section>
        <div>
          <Modal
            isOpen={this.state.isModalOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={this.state.customStyles}
          >
            <div>
              
            <Input
            style={{ width: "99%" }}
            type="text"
            placeholder="Nome"
            required={true}
            name="nomeedit"
            value={this.state.nomeedit}
            onChange={this.handleChange}
          />
          <Input
            style={{ width: "99%" }}
            type="text"
            placeholder="Descrição"
            required={true}
            name="descedit"
            value={this.state.descedit}
            onChange={this.handleChange}
          />
          <Label>Preço</Label>
          <Input
            value={this.state.precoedit}
            style={{ width: "10%" }}
            type="number"
            placeholder="Preço"
            name="precoedit"
            required={true}
            onChange={this.handleChange}
          />
          <Label>Estoque</Label>
          <Input
            value={this.state.estoqueedit}
            style={{ width: "10%" }}
            type="number"
            name="estoqueedit"
            required={true}
            onChange={this.handleChange}
          />
          <div
            style={{
              padding: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "right",
            }}
          >
            <div
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Label style={{ padding: 10, display: "block" }} htmlFor="logo">
                Imagem Principal
              </Label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <InputFile
                  style={{ width: "100%" }}
                  Label="Imagem Principal"
                  type="file"
                  name="imgbs64edt"
                  id="imgbs64edt"
                  accept=".jpeg, .png, .jpg .gif"
                  required={true}
                  onChange={this.onImageEdit}
                />
                <img
                  alt="imagem1"
                  src={
                    this.state.imgbs64edt == null
                      ? noimage
                      : this.state.imgbs64edt
                  }
                  style={{
                    borderWidht: 1,
                    paddingTop: 10,
                    width: 250,
                    height: 250,
                    overflow: "hidden",
                    borderRadius: "50%",
                    justifyContent: "center",
                  }}
                />
              </div>
            </div>
            <div style={{ flexDirection: "column", padding: 10 }}>
              <Label style={{ padding: 10, display: "block" }} htmlFor="capa">
                Imagem Secundaria
              </Label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <InputFile
                  style={{ width: "100%" }}
                  label="Imagem Secundaria"
                  type="file"
                  name="imgbs642edt"
                  id="imgbs642edt"
                  accept=".jpeg, .png, .jpg"
                  required={true}
                  onChange={this.onImage2Edit}
                />
                <img
                  alt="imagem2"
                  src={
                    this.state.imgbs642edt == null
                      ? noimage
                      : this.state.imgbs642edt
                  }
                  style={{
                    borderWidht: 1,
                    height: 250,
                    overflow: "hidden",
                    paddingTop: 10,
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 10,
            }}
          >
            <Label>Categorias</Label>
              {this.state.categoriaslist.map((cat) => {
                return (
                  <div style={{fontFamily:'Helvetica',
                  justifyContent:'right',
                  alignItems:'center',
                  padding: 10, display:'flex', flexDirection: "row"}}>
                  <Input
                  id="editfield"
                  title={cat._id}
                  type="radio"
                  checked={cat._id === this.state.categoriaidedit}
                  onChange={this.handleChange}
                  value={cat.nome}/>
                  <label>{cat.nome}
                  {console.log(this.state.categoriaedit)}</label>
                  </div>
                );
              })}
            <br />
          </div>

              
              <Button value="Submit" onClick={this.updateproduto}>
                Alterar
              </Button>
            </div>
            <button onClick={this.closeModal}>close</button>
          </Modal>
        </div>
      </DashboardLoja>
    );
  }
}

export default LjDashboard;

/**
 *  <hr />
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
 */
