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
} from "../../dashboard/loja/style";
import history from "../../history";
import { DashboardLoja } from "../../components/Layout";
import Icon from "awesome-react-icons";

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
        }}
    };
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    // this.fileInput = React.createRef();
    //this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  componentDidMount () {
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

        fetch("https://api-shopycash1.herokuapp.com/indexcategory/"+localStorage.getItem("@lojaid"))
          .then((res) => res.json())
          .then((result) => this.setState({ categorialist: result }))
          .catch((error) => console.log(error))
          .finally(() => this.setState({ isLoaded: false }), []);
  }
  openModal = async (
    id,
    nome,
  ) => {
    this.setState({
      isModalOpen: true,
      _id: id,
      nomeedit: nome,

    });
  };
  closeModal() {
    this.setState({ isModalOpen: false });
  }

  deletecategoria = async (item) => {
    const _id = item;
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

  render() {

    return (
      <DashboardLoja>
        <Section>
          <Label>Categorias</Label>
          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>Produtos</th>
                <th>Ações</th>
              </tr>
            </thead>
          </table>
          {this.state.categorialist.map((item) => {
            return (
              <tbody>
                <tr>
                  <tb>
                    {item.nome}
                  </tb>
                  <tb>
                  <EditBt
                    onClick={() =>
                      this.openModal(
                        item._id,
                        item.nome
                      )
                    }
                  >
                    <Icon name="edit-pencil-simple" />
                    EDITAR
                  </EditBt>

                  <DeleteBt onClick={() => this.deletecategoria(item._id)}>
                    <Icon name="x" />
                    EXCLUIR
                  </DeleteBt>

                  </tb>
                </tr>
              </tbody>
            );
          })}
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