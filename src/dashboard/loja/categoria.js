import React from "react";
import Modal from "react-modal";
import {
  Section,
  Input,
  Title,
  Label,
  EditBt,
  DeleteBt,
} from "./style";
import history from "../../history";
import { DashboardLoja } from "../../components/Layout";
import Icon from "awesome-react-icons";
import {
  DataGrid
} from "@material-ui/data-grid";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

class CadastroCat extends React.Component {
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
      categorialist: [],
      rows: [],

      nomeedit: "",

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
        },
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    // this.fileInput = React.createRef();
    //this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  componentDidMount = async () => {
    await fetch(
      "https://api-shopycash1.herokuapp.com/indexstoreby/" +
        localStorage.getItem("@lojaid")
    )
      .then((res) => res.json())
      .then(function (result) {
        localStorage.setItem("@loja", result.nomefantasia);
        localStorage.setItem("@shopping", result.shopping);
      })
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);

    await fetch(
      "https://api-shopycash1.herokuapp.com/indexcategory/" +
        localStorage.getItem("@lojaid")
    )
      .then((res) => res.json())
      .then((result) => this.setState({ categorialist: result.data }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);
      for (let index = 0; index <this.state.categorialist.length; index++) {
        console.log("here")
        const newrow = {
          id: this.state.categorialist[index]._id,
          nome: this.state.categorialist[index].nome
        }
        console.log(newrow)

       this.state.rows.push(newrow)
       console.log(this.state.rows)
      }

  };
  openModal = async (id, nome) => {
    this.setState({
      isModalOpen: true,
      _id: id,
      nomeedit: nome,
    });
  };
  closeModal() {
    this.setState({ isModalOpen: false });
  }

  deletecategoria = async (id) => {
    const _id = id;
    console.log(_id, "new id");
    await fetch("https://api-shopycash1.herokuapp.com/store/deletecat/" + _id, {
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

  cadastrarcategoria = async () => {
    const payload = JSON.stringify({
      loja_id: this.state.lojaid,
      nome: this.state.nome,
    });

    await fetch(
      "https://api-shopycash1.herokuapp.com/insertnew/category/" +
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

  updatecategoria = async () => {
    const catid = this.state._id;
    await fetch(
      "https://api-shopycash1.herokuapp.com/store/updatecat/" + catid,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },
        body: JSON.stringify({
          nome: this.state.nomeedit,
        }),
      }
    )
      .then((res) => res.json(console.log(JSON.stringify(res))))
      .then((res) => localStorage.setItem("@update", JSON.stringify(res)))
      .catch((error) => {
        localStorage.setItem("@message", error);
        console.log(error);
      });

    window.location.reload();
  };

  logout() {
    try {
      localStorage.clear();
      history.push("/");
    } catch (error) {}
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

  

  render() {
    const rows = [...this.state.rows];
    console.log(rows)
    const columns = [
      { field: "id", headerName: "Id", width: 200 },
      { field: "nome", headerName: "Nome", width: 130 },
      {
        field: "",
        headerName: "",
        sortable: false,
        width: 160,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <Paper>
            <Button className={"text-sm"} variant="contained" color="primary" onClick={() => this.openModal(params.id, params.nome)}>
              Editar
            </Button>
            <Button className={"text-sm"} variant="contained" color="primary" onClick={() => this.deletecategoria(params.id)}>
            Excluir
          </Button>
          </Paper>
          );
        },
      }];
    return (
      <DashboardLoja>
        <Section>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Title>Cadastro de Categorias</Title>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Paper
                variant="outlined"
                elevation={3}
                className={"p-3"}
              >
                <TextField
                  style={{ width: "100%", paddingRight:10 }}
                  type="text"
                  placeholder="Nome"
                  required={true}
                  label={"Nome da Categoria"}
                  name="nome"
                  outlined
                  value={this.state.nome}
                  onChange={this.handleChange}
                />
                <Button className={"m-2"} style={{marginTop: 10}} variant="contained" value="Submit" onClick={this.cadastrarcategoria}>
                  Cadastrar
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Section>
        <Section>
          <Label>Categorias</Label>
          <div style={{ width: "100%", height: 460}}>
              <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={30}
                disableColumnMenu
                pageSize={10}
                
              />
            </div>
        </Section>
        <div>
          <Modal
            isOpen={this.state.isModalOpen}
            onRequestClose={this.closeModal}
            style={this.state.customStyles}
          >
            <div>
              {this.state.nome}
              <Input
                style={{ width: "100%" }}
                type="text"
                placeholder="Nome da categoria"
                required={true}
                name="nomeedit"
                value={this.state.nomeedit}
                onChange={this.handleChange}
              />
              <hr />
              <Button value="Submit" onClick={this.updatecategoria}>
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

export default CadastroCat;
