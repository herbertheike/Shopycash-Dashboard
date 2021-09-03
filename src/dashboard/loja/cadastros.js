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
  Tr,
  Td,
  Tdr,
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
      .then((result) => this.setState({ categoriaslist: result.data }))
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
            <a href={"/store/"+localStorage.getItem("@slug")+"/produtos"}>Cadastro de Produtos</a>
          </Title>
          <Title>
          <a href={"/store/"+localStorage.getItem("@slug")+"/categoria"}>Cadastro de Categorias</a>
           </Title>
          
          </Section>
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
