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
      cartid:'',
      userid:'',
      lojaid: localStorage.getItem("@lojaid"),
      nome: "",
      orderstoprocess: [],
      cartitens: [],

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

  componentDidMount = async()=> {
     await fetch("https://api-shopycash1.herokuapp.com/indexstoreby/"
      +localStorage.getItem("@lojaid"),{                                                                          
      })
        .then((res) => res.json())
        .then(function(result){
          localStorage.setItem("@loja", result.nomefantasia)
          localStorage.setItem("@shopping", result.shopping)
        })
        .catch((error) => console.log(error))
        .finally(() => this.setState({ isLoaded: false }), []);

        await fetch("https://api-shopycash1.herokuapp.com/store/viewdelivery/"+localStorage.getItem("@lojaid"))
          .then((res) => res.json())
          .then((result) => this.setState({ orderstoprocess: result }))
          .catch((error) => console.log(error))

          console.warn(this.state.orderstoprocess)
  }
  openModal = async (cartid,userid) => {
    await this.setState({
      isModalOpen: true,
      cartid: cartid,
      userid: userid
    });
    console.log(cartid, userid)

    this.cartDetail()
  };
  closeModal() {
    this.setState({ isModalOpen: false });
  }

  cartDetail = async () => {
    const id = this.state.cartid;
    const userId = this.state.userid
    console.log(id, "new id");
    console.log(userId, "new id");
    await fetch("https://api-shopycash1.herokuapp.com/cart/" +userId+"/"+ id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
    }).then((res) =>res.json())
      .then((res) => this.setState({cartitens: res[0].cartitens}))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }));

    //window.location.reload();
    console.log(this.state.cartitens)

    this.openModal()
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
const order1 = this.state.orderstoprocess;
    return (
      <DashboardLoja>
        <Section>
        <Title>Total de pedidos: </Title><Label>35</Label>
        </Section>
        <table style={{alignItems:'center', justifyContent:'center', width:'100%'}} > 
                <thead style={{alignItems:'center', justifyContent:'center'}}>
                  <tr>
                    <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:120, padding:5}}>Nome</th>
                    <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:120, padding:5}}>CPF</th>
                    <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:120, padding:5}}>Endereço</th>
                    <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:120, padding:5}}>Forma de pagamento</th>
                    <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:120, padding:5}}>Forma de entrega</th>
                    <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:120, padding:5}}>Taxa de entrega</th>
                    <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:120, padding:5}}>Valor total com entrega</th>
                    <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:120, padding:5}}>Troco</th>
                    <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:120, padding:5}}>Ações</th>
                  </tr>
                </thead>
                {this.state.orderstoprocess.map((item) => {
                  return (
                <tbody style={{backgroundColor:'white', height:100, overflowY: 'auto', padding: 5}}>
                  <tr>
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>{item.nome}</td>
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>{item.cpf}</td>
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>{item.address}</td>
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>{item.paymentmethod}</td>
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>{item.shippingmethod}</td>
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>{item.shippingprice}</td>
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>{item.total}</td>
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>{item.troco}</td>
                    <td>
                  <Button onClick={() => this.openModal(item.cartid, item.userid)}>
                    <Icon name="x" />
                    Despachar pedido
                  </Button>
                  </td>
                  </tr>
                </tbody> 
                  );
              })}                    
                </table> 
                <div>
                <Modal
            isOpen={this.state.isModalOpen}
            onRequestClose={this.closeModal}
            style={this.state.customStyles}
          >
            <div>
              {this.state.cartitens.map((item)=>{
                return (
                    <div>
                      <label>
                        {item._id}
                      </label>
                      <label>
                        {item.produto}
                      </label>

                    <label>
                      x{item.qty}
                    </label>
                    <label>
                      R$'{item.unitPrice}
                    </label>
                  </div>                 
                );
              })}
            </div>
            <button onClick={this.closeModal}>close</button>
          </Modal>
                </div>
      </DashboardLoja>
    );
  }
}

export default CadastroCat;