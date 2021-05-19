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
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { DataGrid,GridColDef,
  GridApi,
  GridCellValue,getThemePaletteMode  } from '@material-ui/data-grid';
  import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';



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
      cartstatus:'',
      rows:[],

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

  }
  openModal = async (_id,userid) => {
    await this.setState({
      isModalOpen: true,
      _id: _id,
      userid: userid
    });
    console.log(_id, userid)

    this.cartDetail()
  };
  closeModal() {
    this.setState({ isModalOpen: false });
  }

  cartDetail = async () => {
    const id = this.state.cartid;
    console.log(id, "new id");
    await fetch("https://api-shopycash1.herokuapp.com/store/viewdelivery/" +localStorage.getItem("@lojaid")+"/"+ id, {
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
  };
  handleStatus = (event) => {
    this.setState({cartstatus:event.target.value});
  };


  updatestatus = async () => {
    const cartid = this.state._id;
    console.log("cartid", cartid)
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
      .then((res) => (res))
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
let count = 0
const columns = [
        { field: 'id', headerName: 'Id', width: 100 },
        { field: 'nome', headerName: 'Nome', width: 130 },
        { field: 'cpf', headerName: 'CPF', width: 130 },
        { field: 'endereco', headerName: 'Endereço', width:250},
        { field: 'paymentmethod', headerName: 'Pagamento', width:150},
        { field: 'shippingmethod', headerName: 'Entrega', width:120},
        { field: 'shippingtax', headerName: 'Taxa'},
        { field: 'total', headerName: 'Total'},
        { field: 'change', headerName: 'Troco'},
        {
          field: "",
          headerName: "Ação",
          sortable: false,
          width: 100,
          disableClickEventBubbling: true,
          renderCell: (params) => {                     

            return <Button variant="contained" color="primary" onClick={this.openModal}>Enviar</Button>;
          }
        },];

        const orderdata = this.state.orderstoprocess.map((item)=>{
          let rows = []
          let newarray = [];
          let i = 0
          for(i = 0; i<=this.state.orderstoprocess.length; i++){
            console.log(i)
            rows = [{
              id: item._id,
              nome: item.nome, 
              cpf: item.cpf,
              endereco: item.deliveryadress.logradouro+","+
                        item.deliveryadress.numero+","+
                        item.deliveryadress.bairro+", "+
                        item.deliveryadress.cidade+"/"+
                        item.deliveryadress.estado+" \n"+
                        item.deliveryadress.referencia,
              paymentmethod: item.paymentmethod,
              shippingmethod: item.shippingmethod,
              shippingtax:"R$" + item.shippingprice,
              total:"R$" + item.total,
              change:"R$" + item.change,
              }];
              //newarray.push(rows)
              console.log(this.state.orderstoprocess[i]._id)
          }
          this.state.rows = [...newarray]
        }
        )           

    return (
      <DashboardLoja>
        <Section>
        <Title>Total de pedidos: </Title><Label>{count}</Label>
        </Section>
        
         <div style={{display:'flex', padding: 5, width:'85%', position:'absolute'}}>
                
                    <div style={{width: '100%', height:600}}>
                    <DataGrid
                    rows={this.state.rows}
                    columns={columns}
                    disableColumnMenu
                    rowHeight={38}
                    pageSize={5}
                    checkboxSelection/>
                    </div>
                  </div>
                <div>
                <Dialog
                  open={this.state.isModalOpen}
                  onClose={this.closeModal}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                     {/**inicio */}
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