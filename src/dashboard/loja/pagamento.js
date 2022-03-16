import React from "react";
import Modal from "react-modal";
import {
  Section,
  Container,
  Input,
  Title,
  Label,
  EditBt,
  DeleteBt,
} from "../../dashboard/loja/style";
import history from "../../history";
import { DashboardLoja } from "../../components/Layout";
import Icon from "awesome-react-icons";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  DataGrid,
} from "@material-ui/data-grid";
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from 'moment';
import 'moment/locale/pt-br';

class PaymentPage extends React.Component {
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
      cartid: "",
      userid: "",
      lojaid: localStorage.getItem("@lojaid"),
      nome: "",
      orderstoprocess: [],
      cartdetail: [],
      cartstatus: ""
    };
  }

  componentDidMount = async () => {

  }
  render() {
  

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
                    <input
                    type="radio"
                    id="normalfield"
                    title={cat._id}
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
              Pagar
            </Button>
          </div>
        </Section>
      </DashboardLoja>
    );
  }
}

export default PaymentPage;
