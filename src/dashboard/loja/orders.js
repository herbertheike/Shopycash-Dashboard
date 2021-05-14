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
    console.log(id, "new id");
    await fetch("https://api-shopycash1.herokuapp.com/store/viewdelivery/" +localStorage.getItem("@lojaid")+"/"+ this.state.cartid, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
    }).then((res) =>res.json())
      .then((res) => this.setState({cartitens: res[0].produtos}))
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
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>
                   <p> {item.deliveryadress.logradouro+", "+item.deliveryadress.numero+","+
                    item.deliveryadress.bairro+", "+item.deliveryadress.cidade+"/"+
                    item.deliveryadress.estado+" \n"+item.deliveryadress.referencia
                    }</p></td>
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>{item.paymentmethod}</td>
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>{item.shippingmethod}</td>
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>{item.shippingprice}</td>
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>{item.total}</td>
                  <td style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>{item.change}</td>
                    <td>
                  <Button onClick={() => this.openModal(item._id, item.userid)}>
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
            {this.state.orderstoprocess.map((item) => {
                  return (
                  <div>
                    <Title>
                    PEDIDO Nº: {item._id}
                    </Title>
                    <Label>Dados do Cliente</Label>
                    <div style={{display:'flex',flexDirection:'column' ,alignItems:'flex-start',
                     justifyContent:'space-between'}}>
                       
                       <div style={{display:'flex',flexDirection:'row', padding:10}}>
                        <span style={{ padding:10}}>Nome:</span> <h6 style={{ padding:10}}>{item.nome}</h6> 
                        <span style={{ padding:10}}>CPF:</span> <h6 style={{ padding:10}}>{item.cpf}</h6>
                        <span style={{ padding:10}}>Telefone:</span> <h6 style={{ padding:10}}>{item.cpf}</h6>
                        <span style={{ padding:10}}>Email:</span> <h6 style={{ padding:10}}>{item.cpf}</h6>
                     </div>

                    <div style={{display:'flex',flexDirection:'row' ,
                     justifyContent:'space-between'}}>
                       <span>Endereço</span>
                       <h6>{item.deliveryadress.logradouro}, {item.deliveryadress.numero}, 
                    {item.deliveryadress.bairro}, {item.deliveryadress.cidade}/
                    {item.deliveryadress.estado} - {item.deliveryadress.referencia}</h6>
                    </div>
                    </div>
                  <table style={{alignItems:'center', justifyContent:'center', width:'100%'}} > 
                  <thead style={{alignItems:'center', justifyContent:'center'}}>
                    <tr>
                      <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:"auto", padding:3}}>SKU</th>
                      <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:"auto", padding:3}}>Produto</th>
                      <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:"auto", padding:3}}>Categoria</th>
                      <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:"auto", padding:3}}>Preço unitario</th>
                      <th style={{alignItems:'center', textAlign:'center', justifyContent:'center', width:"auto", padding:3}}>Quantidade</th>
                    </tr>
                  </thead>
                  {this.state.cartitens.map((prod)=>{
                      return (
                  <tbody style={{backgroundColor:'#53aaa8', height:100, overflowY: 'auto', padding: 5}}>
                    <tr>
                    <td style={{alignItems:'center', textAlign:'center', justifyContent:'center', fontSize:10, borderWidth:1}}>{prod.produtoid}</td>
                    <td style={{alignItems:'center', textAlign:'center', justifyContent:'center', fontSize:10, borderWidth:1}}>{prod.produto}</td>
                    <td style={{alignItems:'center', textAlign:'center', justifyContent:'center', fontSize:10, borderWidth:1}}>{prod.categoria}</td>
                    <td style={{alignItems:'center', textAlign:'center', justifyContent:'center', fontSize:10, borderWidth:1}}>{prod.unitPrice}</td>
                    <td style={{alignItems:'center', textAlign:'center', justifyContent:'center', fontSize:10, borderWidth:1}}>{prod.qty}</td>
                    </tr>
                  </tbody> 
                    );
                })}                    
                  </table>
                  <Label>Dados do pagamento</Label>
                    <div style={{display:'flex',flexDirection:'row' ,alignItems:'flex-start',
                     justifyContent:'flex-start'}}>
                      
                      <div style={{display:'flex',flexDirection:'column',padding: 10,alignItems:'flex-start',
                     justifyContent:'space-between'}}>
                      <span style={{fontSize: 18, fontStyle: 'italic'}}>Forma de pagamento: </span><h6 style={{fontSize: 20, fontStyle: 'normal'}}>{item.paymentmethod}</h6>
                      <br />
                      </div>
                      
                    <div style={{display:'flex',flexDirection:'column',padding: 10,alignItems:'flex-start',
                     justifyContent:'space-between'}}>
                    <span style={{fontSize: 18, fontStyle: 'italic'}}>Subtotal: </span> <h6 style={{fontSize: 20, fontStyle: 'normal'}}>R${item.subTotal}</h6><br />
                    <span style={{fontSize: 18, fontStyle: 'italic'}}>Taxa de entrega: </span> <h6 style={{fontSize: 20, fontStyle: 'normal'}}>R${item.shippingprice}</h6><br />
                    <span style={{fontSize: 18, fontStyle: 'italic'}}>Valor total: </span> <h6 style={{fontSize: 20, fontStyle: 'normal'}}>R${item.total}</h6><br />
                    </div>
                    <div style={{display:'flex',flexDirection:'column',padding: 10,alignItems:'flex-start',
                     justifyContent:'space-between'}}>
                      <span style={{fontSize: 18, fontStyle: 'italic'}}>Troco: </span> <h6 style={{fontSize: 20, fontStyle: 'normal'}}>R${item.change}</h6>
                      <br />
                      </div>
                    </div>
                  <button style={{alignItems:'center', textAlign:'center', justifyContent:'center', fontSize:10}}
                    onClick={() => console.log("Pedido despachado")}>
                      <Icon name="x" />
                      Despachar pedido
                    </button>
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