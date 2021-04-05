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
  Img
} from "./style";
import history from "../../history";
import { DashboardLayout } from "../../components/Layout";
import Icon from "awesome-react-icons";
import noimage from "../../imgsrc/logopad.jpg";

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
      preco: "",
      loja: "",
      shopping: "",
      shoppingid: localStorage.getItem("@shoppingid"),
      categoria: "",
      ativo: "",
      imagem: "",
      imagem2: "",
      estoque: "",

      imageURL: "",
      imagembase64: null,
      imagem2base64: null,
      categoriaslist: [],
      userrole: "loja",

      nomefantasiaedit: "",
      razaosocialedit: "",
      shoppingedit: "",
      cnpjedit: "",
      emailedit: "",
      siteedit: "",
      telefoneedit: "",
      responsaveledit: "",
      lojaslugedit: "",

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
    this.onLogoChange = this.onLogoChange.bind(this);
    this.onCapaChange = this.onCapaChange.bind(this);
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
    nome,
    endereco,
    cnpj,
    telefone,
    email,
    site,
    responsavel,
    shoppingslug
  ) => {
    this.setState({
      isModalOpen: true,
      nomeedit: nome,
      enderecoedit: endereco,
      cnpjedit: cnpj,
      telefoneedit: telefone,
      emailedit: email,
      siteedit: site,
      responsaveledit: responsavel,
      shoppingslugedit: shoppingslug,
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
  deleteloja = async (item) => {
    const _id = item;
    console.log(_id, "new id");
    await fetch("https://api-shopycash1.herokuapp.com/deletestore/" + _id, {
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
      segmento: this.state.segmento,
    });

    await fetch(
      "https://api-shopycash1.herokuapp.com/insernewstore/" +
      localStorage.getItem("@slug"),
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
      .then((res) => this.setState({ lojaid: res.data._id }))
      .catch((error) => {
        localStorage.setItem("@error", error);
        console.log(error);
      });
    this.cadastrausuario();
    //
  };

  updateloja = async () => {
    const lojaslugedit = this.state.lojaslugedit;
    console.log("SHOPPING--> " + lojaslugedit);
    await fetch(
      "https://api-shopycash1.herokuapp.com/updatestore/" + lojaslugedit,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json, multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },
        body: JSON.stringify({
          nomefantasia: this.state.nomefantasia,
          razaosocial: this.state.razaosocial,
          shopping: this.state.shopping,
          cnpj: this.state.cnpj,
          email: this.state.email,
          site: this.state.site,
          telefone: this.state.telefone,
          responsavel: this.state.responsavel,
          lojaslug: this.state.lojaslug,
        }),
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
    const name = target.name;

    if (type === "file") {
      this.setState({ [name]: event.target.files });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  onImageChange(event) {
    event.preventDefault();
    console.log("Imagem1:\n", event.target.files[0]);
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
    console.log("CAPA:\n", event.target.files[0]);
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

  listcategorias() {
    fetch("https://api-shopycash1.herokuapp.com/indexcategory/"+localStorage.getItem("@lojaid"))
      .then((res) => res.json())
      .then((result) => this.setState({ categoriaslist: result }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);
  }

  handleChecked(event) {
    console.log(event);
    let newcheck = "";
    if (this.state.categoriaslist.length <= 0 && event.target.checked) {
      newcheck = event.target.value;
      this.setState({ categoriaslist: [newcheck] });
    } else if (this.state.categoriaslist.length > 0 && event.target.checked) {
      newcheck = event.target.value;
      this.setState({ categoriaslist: [...this.state.categoriaslist, newcheck] });
    }
    let array = [...this.state.categoriaslist]
    let index = array.indexOf(event.target.value)
    if(event.target.checked === false){
      array.splice(index,1)
      this.setState({categoriaslist:array})
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
      <DashboardLayout>
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
            name="descricao"
            value={this.state.desc}
            onChange={this.handleChange}
          />

          <Input
            value={this.state.preco}
            style={{ width: "74%" }}
            type="number"
            placeholder="Preço"
            name="preco"
            required={true}
            onChange={this.handleChange}
          />

          <Input
            value={this.state.loja}
            style={{ width: "24.5%" }}
            type="text"
            placeholder="Loja"
            name="loja"
            required={true}
            onChange={this.handleChange}
          />

          <Input
            value={this.state.shopping}
            style={{ width: "48.51%" }}
            type="text"
            placeholder="Shopping"
            name="shopping"
            required={true}
            onChange={this.handleChange}
          />
          <Label>Estoque</Label>
          <Input
            value={this.state.estoque}
            style={{ width: "7%" }}
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
                  name="capa"
                  id="capa"
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              {this.state.categoriaslist.slice(0, 7).map((seg, index) => {
                return (
                  <div>
                    <input
                      type="checkbox"
                      value={seg.nome}
                      name="segmento"
                      onChange={this.handleChecked}
                      style={{ padding: 10 }}
                    />
                    <span
                      key={seg._id}
                      style={{ display: "inline-block", paddingLeft: 10 }}
                    >
                      {seg.nome}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {this.state.categoriaslist.slice(7, 14).map((seg, index) => {
                return (
                  <div>
                    <input
                      type="checkbox"
                      value={seg.nome}
                      name="segmento"
                      onChange={this.handleChecked}
                      style={{ padding: 10 }}
                    />
                    <span
                      key={seg._id}
                      style={{ display: "inline-block", paddingLeft: 10 }}
                    >
                      {seg.nome}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {this.state.categoriaslist.slice(14, 21).map((seg, index) => {
                return (
                  <div>
                    <input
                      type="checkbox"
                      value={seg.nome}
                      name="segmento"
                      onChange={this.handleChecked}
                      style={{ padding: 10 }}
                    />
                    <span
                      key={seg._id}
                      style={{ display: "inline-block", paddingLeft: 10 }}
                    >
                      {seg.nome}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {this.state.categoriaslist.slice(21, 28).map((seg, index) => {
                return (
                  <div>
                    <input
                      type="checkbox"
                      value={seg.nome}
                      name="segmento"
                      onChange={this.handleChecked}
                      style={{ padding: 10 }}
                    />
                    <span
                      key={seg._id}
                      style={{ display: "inline-block", paddingLeft: 10 }}
                    >
                      {seg.nome}
                    </span>
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
                      <label style={{ display: "block", fontFamily:'Helvetica', fontSize:28, padding:10}}>
                        {item.nome}
                      </label>
                      <div style={{display: "flex", flexDirection: "row" }}>
                      <Img alt="imagem1" src={item.imagem} style={{ borderWidth:1,borderRadius:5, width: 250 }} />
                      <Img alt="imagem2" src={item.imagem2} style={{ borderWidth:1,borderRadius:5, width: 250 }} />
                      </div>
                       </div>
                    <div style={{display:'flex',flexDirection: "column", paddingTop: 60,}}>
                      <label style={{display: "block", width: 300, fontSize:16, textAlign:'justify' }}> 
                        {"Descrição: \n"+item.desc}
                      </label>

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
                      Criado em: {item.createdAt}
                    </label>
                    <label style={{}}>
                      Ultima alteração em: {item.updatedAt}
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
                        item.nomefantasia,
                        item.razaosocial,
                        item.shopping,
                        item.cnpj,
                        item.email,
                        item.site,
                        item.telefone,
                        item.responsavel,
                        item.slug
                      )
                    }
                  >
                    <Icon name="edit-pencil-simple" />
                    EDITAR
                  </EditBt>
                  </div>
                  <div style={{flexDirection: "column", display:'block'}}>
                  <DeleteBt onClick={() => this.deleteloja(item._id)}>
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
              {this.state.shoppingslugedit}
              <Input
                style={{ width: "100%" }}
                type="text"
                placeholder="Shopping"
                required={true}
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
                value={this.state.telefoneedit}
                style={{ width: "25%" }}
                type="tel"
                placeholder="Telefone"
                name="telefoneedit"
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
                value={this.state.responsaveledit}
                style={{ width: "24%" }}
                type="text"
                placeholder="Responsavel"
                name="responsaveledit"
                required={true}
                onChange={this.handleChange}
              />
              <Input
                value={this.state.shoppingslugedit}
                style={{ width: "24%" }}
                type="text"
                placeholder="Shoppign slug"
                name="shoppingslugedit"
                required={true}
                onChange={this.handleChange}
              />

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
          >
            <div>
              {this.state._id}

              <DeleteBt onclick={() => this.deleteloja()}>DELETE</DeleteBt>
            </div>
            <button onClick={this.closeDelModal}>close</button>
          </Modal>
        </div>
      </DashboardLayout>
    );
  }
}

export default LjDashboard;
