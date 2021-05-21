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
  GridColDef,
  GridApi,
  GridCellValue,
  getThemePaletteMode,
} from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createMuiTheme, darken, lighten } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

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
      cartid: "",
      userid: "",
      lojaid: localStorage.getItem("@lojaid"),
      nome: "",
      orderstoprocess: [],
      cartdetail: [],
      cartstatus: "",
      rows:[],
      count:0,
      countdeliv:0,
      countawait:0,
      countroute:0,

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
      "https://api-shopycash1.herokuapp.com/store/viewdelivery/" +
        localStorage.getItem("@lojaid")
    )
      .then((res) => res.json())
      .then((result) => this.setState({orderstoprocess: result.data}))
      .catch((error) => console.log(error))

      for(var i=0; i<this.state.orderstoprocess.length; i++){
        console.log(this.state.orderstoprocess[i]._id)
          const newrow = {
            id: this.state.orderstoprocess[i]._id,
            nome: this.state.orderstoprocess[i].nome,
            cpf: this.state.orderstoprocess[i].cpf,
            endereco:
              this.state.orderstoprocess[i].deliveryadress.logradouro +"," +
              this.state.orderstoprocess[i].deliveryadress.numero +"," +
              this.state.orderstoprocess[i].deliveryadress.bairro +", " +
              this.state.orderstoprocess[i].deliveryadress.cidade +"/" +
              this.state.orderstoprocess[i].deliveryadress.estado +" \n" +
              this.state.orderstoprocess[i].deliveryadress.referencia,
            paymentmethod: this.state.orderstoprocess[i].paymentmethod,
            shippingmethod: this.state.orderstoprocess[i].shippingmethod,
            shippingtax: "R$" + this.state.orderstoprocess[i].shippingprice,
            total: "R$" + this.state.orderstoprocess[i].total,
            change: "R$" + this.state.orderstoprocess[i].change
          }
          this.setState({count:this.state.orderstoprocess.length})
          if(this.state.orderstoprocess[i].cartstatus === 'await'){
            this.setState({countawait:this.state.countawait+1})
          }if(this.state.orderstoprocess[i].cartstatus === 'delivered'){
            this.setState({countdeliv:this.state.countdeliv+1})
          }if(this.state.orderstoprocess[i].cartstatus === 'onroute'){
            this.setState({countroute:this.state.countroute+1})
          }
          this.state.rows.push(newrow)
      }


console.log(this.state.rows)
      
    await fetch(
      "https://api-shopycash1.herokuapp.com/indexstoreby/" +
        localStorage.getItem("@lojaid"),
    )
      .then((res) => res.json())
      .then(function (result) {
        localStorage.setItem("@loja", result.nomefantasia);
        localStorage.setItem("@shopping", result.shopping);
      })
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);     
  };

  openModal = async (_id, userid) => {
    await this.setState({
      isModalOpen: true,
      _id: _id,
      userid: userid,
    });

    this.cartDetail(_id);
  };

  closeModal() {
    
    this.setState({ isModalOpen: false });
  }

  cartDetail = async () => {
    const id = this.state._id
    await fetch(
      "https://api-shopycash1.herokuapp.com/store/viewdelivery/" +
        localStorage.getItem("@lojaid") +
        "/" +
        id,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => this.setState({ cartdetail: res }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }));

    //window.location.reload();
    console.log(this.state.cartdetail);
  };

  handleStatus = (event) => {
    this.setState({ cartstatus: event.target.value });
  };

  updatestatus = async () => {
    const cartid = this.state._id;
    console.log("cartid", cartid);
    const cartstatus = this.state.cartstatus;
    await fetch(
      "https://api-shopycash1.herokuapp.com/store/statuschange/" + cartid,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },
        body: JSON.stringify({
          cartstatus: cartstatus,
        }),
      }
    )
      .then((res) => res.json(console.log(JSON.stringify(res))))
      .then((res) => res)
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
    const columns = [
      { field: "id", headerName: "Id", width: 100 },
      { field: "nome", headerName: "Nome", width: 130 },
      { field: "cpf", headerName: "CPF", width: 130 },
      { field: "endereco", headerName: "Endereço", width: 250 },
      { field: "paymentmethod", headerName: "Pagamento", width: 150 },
      { field: "shippingmethod", headerName: "Entrega", width: 120 },
      { field: "shippingtax", headerName: "Taxa" },
      { field: "total", headerName: "Total" },
      { field: "change", headerName: "Troco" },
      {
        field: "",
        headerName: "Ação",
        sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <Button variant="contained" color="primary" onClick={() => this.openModal(params.id)}>
              Enviar
            </Button>
          );
        },
      }];
   
      

    return (
      <DashboardLoja>
        <Section>
          <Title>Pedidos</Title>
        </Section>
      <div style={{display: "flex",padding: 5,width: "100%",position: "relative", flexDirection:'row'}}>
          <div style={{display: "flex",padding: 5,width: "100%",position: "relative", flexDirection:'column'}}>
              <Title>Total de pedidos: </Title>
              <Label>{this.state.count}</Label>
          </div>
          <div style={{display: "flex",padding: 5,width: "100%",position: "relative", flexDirection:'column'}}>
              <Title>Total de pedidos em espera: </Title>
              <Label>{this.state.countawait}</Label>
          </div>
          <div style={{display: "flex",padding: 5,width: "100%",position: "relative", flexDirection:'column'}}>
              <Title>Total de pedidos concluidos: </Title>
              <Label>{this.state.countdeliv}</Label>
          </div>
          <div style={{display: "flex",padding: 5,width: "100%",position: "relative", flexDirection:'column'}}>
              <Title>Total de em rota: </Title>
              <Label>{this.state.countroute}</Label>
          </div>
      </div>
          <div style={{display: "flex",padding: 5,width: "86%",position: "absolute",}}>           
           <div style={{ width: "100%", height: 600 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={40}
                disableColumnMenu
                pageSize={10}
                checkboxSelection
              />
            </div>
          </div>
        <div>
          <Dialog
            open={this.state.isModalOpen}
            onClose={this.closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"PEDIDO Nº: "+this.state._id}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {/**inicio */}
                {this.state.cartdetail.map((item) => {
                  const prodarray = []
                  for(var i=0; i<item.produtos.length;i++){
                    prodarray.push(item.produtos[i])
                  }
                  return (
                    <div>
                      <Label>Dados do Cliente</Label>
                      <div
                        style={{
                          borderWidth: "1px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "stretch",
                        }}
                      >
                        <div style={{ padding: 5 }}>
                          <TextField
                            id="outlined-basic"
                            style={{ width: "70%", fontSize: 12, padding: 5 }}
                            size="small"
                            label="Nome"
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={item.nome}
                          />
                          <TextField
                            id="outlined-basic"
                            style={{ width: "30%", fontSize: 12, padding: 5 }}
                            size="small"
                            label="CPF"
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={item.cpf}
                          />
                        </div>
                        <div style={{ padding: 5 }}>
                          <TextField
                            id="outlined-basic"
                            style={{ width: "50%", fontSize: 12, padding: 5 }}
                            size="small"
                            label="Telefone"
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={item.cpf}
                          />
                          <TextField
                            id="outlined-basic"
                            style={{ width: "50%", fontSize: 12, padding: 5 }}
                            size="small"
                            label="Email"
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={item.cpf}
                          />
                        </div>
                        <Label>Endereço: </Label>
                        <div style={{ padding: 5 }}>
                          <TextField
                            id="outlined-basic"
                            style={{ width: "60%", fontSize: 12, padding: 5 }}
                            size="small"
                            label="Logradouro"
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={item.deliveryadress.logradouro}
                          />

                          <TextField
                            id="outlined-basic"
                            style={{ width: "20%", fontSize: 12, padding: 5 }}
                            size="small"
                            label="Numero"
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={item.deliveryadress.numero}
                          />

                          <TextField
                            id="outlined-basic"
                            style={{ width: "20%", fontSize: 12, padding: 5 }}
                            size="small"
                            label="Bairro"
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={item.deliveryadress.bairro}
                          />
                        </div>
                        <div style={{ padding: 5 }}>
                          <TextField
                            id="outlined-basic"
                            style={{ width: "40%", fontSize: 12, padding: 5 }}
                            size="small"
                            label="Cidade"
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={item.deliveryadress.cidade}
                          />

                          <TextField
                            id="outlined-basic"
                            style={{ width: "30%", fontSize: 12, padding: 5 }}
                            size="small"
                            label="Estado"
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={item.deliveryadress.estado}
                          />

                          <TextField
                            id="outlined-basic"
                            style={{ width: "30%", fontSize: 12, padding: 5 }}
                            size="small"
                            label="cep"
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={item.deliveryadress.cep}
                          />
                        </div>
                        <div style={{ padding: 5 }}>
                          <TextField
                            id="outlined-basic"
                            style={{ width: "100%", fontSize: 12, padding: 5 }}
                            size="small"
                            label="Referencia"
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={item.deliveryadress.referencia}
                          />
                        </div>
                      </div>
                      <table
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <thead
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <tr>
                            <th
                              style={{
                                alignItems: "center",
                                textAlign: "center",
                                justifyContent: "center",
                                width: "auto",
                                padding: 3,
                              }}
                            >
                              SKU
                            </th>
                            <th
                              style={{
                                alignItems: "center",
                                textAlign: "center",
                                justifyContent: "center",
                                width: "auto",
                                padding: 3,
                              }}
                            >
                              Produto
                            </th>
                            <th
                              style={{
                                alignItems: "center",
                                textAlign: "center",
                                justifyContent: "center",
                                width: "auto",
                                padding: 3,
                              }}
                            >
                              Categoria
                            </th>
                            <th
                              style={{
                                alignItems: "center",
                                textAlign: "center",
                                justifyContent: "center",
                                width: "auto",
                                padding: 3,
                              }}
                            >
                              Preço unitario
                            </th>
                            <th
                              style={{
                                alignItems: "center",
                                textAlign: "center",
                                justifyContent: "center",
                                width: "auto",
                                padding: 3,
                              }}
                            >
                              Quantidade
                            </th>
                          </tr>
                        </thead>
                        {prodarray.map((prod) => {
                          return (
                            <tbody
                              style={{
                                backgroundColor: "#53aaa8",
                                height: 100,
                                overflowY: "auto",
                                padding: 5,
                              }}
                            >
                              <tr>
                                <td
                                  style={{
                                    alignItems: "center",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    fontSize: 10,
                                    borderWidth: 1,
                                  }}
                                >
                                  {prod.produtoid}
                                </td>
                                <td
                                  style={{
                                    alignItems: "center",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    fontSize: 10,
                                    borderWidth: 1,
                                  }}
                                >
                                  {prod.produto}
                                </td>
                                <td
                                  style={{
                                    alignItems: "center",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    fontSize: 10,
                                    borderWidth: 1,
                                  }}
                                >
                                  {prod.categoria}
                                </td>
                                <td
                                  style={{
                                    alignItems: "center",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    fontSize: 10,
                                    borderWidth: 1,
                                  }}
                                >
                                  {prod.unitPrice}
                                </td>
                                <td
                                  style={{
                                    alignItems: "center",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    fontSize: 10,
                                    borderWidth: 1,
                                  }}
                                >
                                  {prod.qty}
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                      <Label>Dados do pagamento</Label>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: 5,
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ fontSize: 15, fontStyle: "italic" }}>
                            Forma de pagamento:{" "}
                          </span>
                          <h6 style={{ fontSize: 16, fontStyle: "normal" }}>
                            {item.paymentmethod}
                          </h6>
                          <br />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: 5,
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ fontSize: 15, fontStyle: "italic" }}>
                            Subtotal:{" "}
                          </span>{" "}
                          <h6 style={{ fontSize: 16, fontStyle: "normal" }}>
                            R${item.subTotal}
                          </h6>
                          <br />
                          <span style={{ fontSize: 15, fontStyle: "italic" }}>
                            Taxa de entrega:{" "}
                          </span>{" "}
                          <h6 style={{ fontSize: 16, fontStyle: "normal" }}>
                            R${item.shippingprice}
                          </h6>
                          <br />
                          <span style={{ fontSize: 15, fontStyle: "italic" }}>
                            Valor total:{" "}
                          </span>{" "}
                          <h6 style={{ fontSize: 16, fontStyle: "normal" }}>
                            R${item.total}
                          </h6>
                          <br />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: 5,
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ fontSize: 15, fontStyle: "italic" }}>
                            Troco:{" "}
                          </span>{" "}
                          <h6 style={{ fontSize: 16, fontStyle: "normal" }}>
                            R${item.change}
                          </h6>
                          <br />
                        </div>
                      </div>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.cartstatus}
                        onChange={this.handleStatus}
                      >
                        <MenuItem value={"await"}>Em separação</MenuItem>
                        <MenuItem value={"onroute"}>Enviado</MenuItem>
                        <MenuItem value={"delivered"}>Recebido</MenuItem>
                      </Select>
                      <button
                        style={{
                          alignItems: "center",
                          textAlign: "center",
                          justifyContent: "center",
                          fontSize: 10,
                        }}
                        onClick={this.updatestatus}
                      >
                        <Icon name="x" />
                        Despachar pedido
                      </button>
                    </div>
                  );
                })}
                {/**Fim */}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeModal} color="primary">
                Disagree
              </Button>
              <Button onClick={this.closeModal} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>

          {/*<Modal
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
                    <div style={{borderWidth:'1px' ,display:'flex',flexDirection:'column' ,alignItems:'stretch'}}>
                       
                       <div style={{padding:5}}>
                        <TextField id="outlined-basic"
                         style={{ width:'70%', fontSize:12, padding:5}}
                         size="small"
                        label="Nome"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={item.nome}/>
                        <TextField id="outlined-basic"
                         style={{ width:'30%', fontSize:12, padding:5}}
                         size="small"
                        label="CPF"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={item.cpf}/>
                            </div>
                      <div style={{padding:5}}>
                      <TextField id="outlined-basic"
                         style={{ width:'50%', fontSize:12, padding:5}}
                         size="small"
                        label="Telefone"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={item.cpf}/>
                        <TextField id="outlined-basic"
                         style={{ width:'50%', fontSize:12, padding:5}}
                         size="small"
                        label="Email"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={item.cpf}/>
                     </div>
                     <Label>Endereço: </Label>
                     <div style={{padding:5}}> 
                       <TextField id="outlined-basic"
                         style={{ width:'60%', fontSize:12, padding:5}}
                         size="small"
                        label="Logradouro"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={item.deliveryadress.logradouro}/>

                      <TextField id="outlined-basic"
                         style={{ width:'20%', fontSize:12, padding:5}}
                         size="small"
                        label="Numero"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={item.deliveryadress.numero}/>

                        <TextField id="outlined-basic"
                         style={{ width:'20%', fontSize:12, padding:5}}
                         size="small"
                        label="Bairro"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={item.deliveryadress.bairro}/> 
                    </div>
                    <div style={{padding:5}}>

                      <TextField id="outlined-basic"
                         style={{ width:'40%', fontSize:12, padding:5}}
                         size="small"
                        label="Cidade"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={item.deliveryadress.cidade}/>

                      <TextField id="outlined-basic"
                         style={{ width:'30%', fontSize:12, padding:5}}
                         size="small"
                        label="Estado"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={item.deliveryadress.estado}/>

                        <TextField id="outlined-basic"
                         style={{ width:'30%', fontSize:12, padding:5}}
                         size="small"
                        label="cep"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={item.deliveryadress.cep}/>
                        </div>
                      <div style={{padding:5}}>
                        <TextField id="outlined-basic"
                         style={{ width:'100%', fontSize:12, padding:5}}
                         size="small"
                        label="Referencia"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={item.deliveryadress.referencia}/>
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
                      
                      <div style={{display:'flex',flexDirection:'column',padding: 5,alignItems:'flex-start',
                     justifyContent:'space-between'}}>
                      <span style={{fontSize: 15, fontStyle: 'italic'}}>Forma de pagamento: </span><h6 style={{fontSize: 16, fontStyle: 'normal'}}>{item.paymentmethod}</h6>
                      <br />
                      </div>
                      
                    <div style={{display:'flex',flexDirection:'column',padding: 5,alignItems:'flex-start',
                     justifyContent:'space-between'}}>
                    <span style={{fontSize: 15, fontStyle: 'italic'}}>Subtotal: </span> <h6 style={{fontSize: 16, fontStyle: 'normal'}}>R${item.subTotal}</h6><br />
                    <span style={{fontSize: 15, fontStyle: 'italic'}}>Taxa de entrega: </span> <h6 style={{fontSize: 16, fontStyle: 'normal'}}>R${item.shippingprice}</h6><br />
                    <span style={{fontSize: 15, fontStyle: 'italic'}}>Valor total: </span> <h6 style={{fontSize: 16, fontStyle: 'normal'}}>R${item.total}</h6><br />
                    </div>
                    <div style={{display:'flex',flexDirection:'column',padding: 5,alignItems:'flex-start',
                     justifyContent:'space-between'}}>
                      <span style={{fontSize: 15, fontStyle: 'italic'}}>Troco: </span> <h6 style={{fontSize: 16, fontStyle: 'normal'}}>R${item.change}</h6>
                      <br />
                      </div>
                    </div>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.cartstatus}
                      onChange={this.handleStatus}
                    >
                      <MenuItem value={'await'}>Em separação</MenuItem>
                      <MenuItem value={'onroute'}>Enviado</MenuItem>
                      <MenuItem value={'delivered'}>Recebido</MenuItem>
        </Select>
                  <button style={{alignItems:'center', textAlign:'center', justifyContent:'center', fontSize:10}}
                    onClick={this.updatestatus}>
                      <Icon name="x" />
                      Despachar pedido
                    </button>
                  </div>   
                  );
                })}
                  
            </div>
            
            <button onClick={this.closeModal}>close</button>
              </Modal>*/}
        </div>
      </DashboardLoja>
    );
  }
}

export default CadastroCat;
