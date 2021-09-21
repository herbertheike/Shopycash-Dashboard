import React from "react";
import Modal from "react-modal";
import Rating from '@material-ui/lab/Rating';
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
  TextArea,
  Title2,
  Span
} from "./style";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { BiMenu } from "react-icons/bi";
import history from "../../history";
import { DashboardLoja } from "../../components/Layout";
import Icon from "awesome-react-icons";
import noimage from "../../imgsrc/logopad.jpg";
import Chart from 'chart.js/auto';
import moment from 'moment';
import 'moment/locale/pt-br';

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
      value:0,

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

      comentarioresult: [],

      orderstoprocess: [],
      rows:[],
      count:0,
      countdeliv:0,
      countawait:0,
      countroute:0,
      faturado:0,
      label:['Janeiro', 'Feveiro', 'Março', 'Abril', 'Maio', 'Junho','Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      chartdata: [{id: 'Janeiro', vendas: {value:0}},
      {id: 'Feveiro', vendas: {value:0}},
      {id: 'Março', vendas: {value:0}},
      {id: 'Abril', vendas: {value:0}},
      {id: 'Maio', vendas: {value:0}},
      {id: 'Junho', vendas: {value:0}},
      {id: 'Julho', vendas: {value:0}},
      {id: 'Agosto', vendas: {value:0}},
      {id: 'Setembro', vendas: {value:0}},
      {id: 'Outubro', vendas: {value:0}},
      {id: 'Novembro', vendas: {value:0}},
      {id: 'Dezembro', vendas: {value:0}},],
      bardata: [{id: 'Janeiro', fatur: {value:0}},
      {id: 'Feveiro', fatur: {value:0}},
      {id: 'Março', fatur: {value:0}},
      {id: 'Abril', fatur: {value:0}},
      {id: 'Maio', fatur: {value:0}},
      {id: 'Junho', fatur: {value:0}},
      {id: 'Julho', fatur: {value:0}},
      {id: 'agosto', fatur: {value:0}},
      {id: 'Setembro', fatur: {value:0}},
      {id: 'Outubro', fatur: {value:0}},
      {id: 'Novembro', fatur: {value:0}},
      {id: 'Dezembro', fatur: {value:0}},],
      dougdata:[0,0],
      radarlabel:[],
      radardata:[],
      nomeedit: "",
      hide: 'none',
      iconbt:'arrow-right',

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

  componentDidMount = async () => {

        moment.locale('pt-br');
    await fetch(
      "https://api-shopycash1.herokuapp.com/store/viewdelivery/" +
        localStorage.getItem("@lojaid")
    )
      .then((res) => res.json())
      .then((result) => this.setState({orderstoprocess: result.data}))
      .catch((error) => console.log(error))
      for(var i=0; i<this.state.orderstoprocess.length; i++){
        console.log(this.state.orderstoprocess[i])
          const newrow = {
            id: this.state.orderstoprocess[i]._id,
            nome: this.state.orderstoprocess[i].dadoscliente.nome,
            cpf: this.state.orderstoprocess[i].dadoscliente.cpf,
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
            this.setState({faturado:this.state.faturado+this.state.orderstoprocess[i].total})
            this.setState({countawait:this.state.countawait+1})
          }if(this.state.orderstoprocess[i].cartstatus === 'delivered'){
            this.setState({faturado:this.state.faturado+this.state.orderstoprocess[i].total})
            this.setState({countdeliv:this.state.countdeliv+1})
          }if(this.state.orderstoprocess[i].cartstatus === 'onroute'){
            this.setState({faturado:this.state.faturado+this.state.orderstoprocess[i].total})
            this.setState({countroute:this.state.countroute+1})
          }
          this.state.rows.push(newrow)
      }
      for(var i=0; i<this.state.orderstoprocess.length; i++){
        const month = moment(this.state.orderstoprocess[i].datacompra).format("MMMM").toLocaleLowerCase();
        for(var x=0; x<this.state.label.length; x++){
          
          const label = this.state.chartdata[x].id.toLocaleLowerCase();   
          console.log(month+label)      
          if(label === month){
            console.log("entrei aqui",month)
           // console.log('beef')
            for(var y=0; y<this.state.chartdata.length; y++){
              const chartmonth = this.state.chartdata[y].id.toLocaleLowerCase();
              if(month === chartmonth){
               // console.log('flif')
                this.state.chartdata[y].vendas.value = this.state.chartdata[y].vendas.value +1;
              }
              }
            }
          }
        }

        for(var i=0; i<this.state.orderstoprocess.length; i++){
          const month = moment(this.state.orderstoprocess[i].datacompra).format("MMMM").toLocaleLowerCase();
          for(var x=0; x<this.state.label.length; x++){
            const label = this.state.bardata[x].id.toLocaleLowerCase();   
            console.log(month+label)      
            if(label === month){
              console.log("entrei aqui",month)
              for(var y=0; y<this.state.bardata.length; y++){
                const chartmonth = this.state.chartdata[y].id.toLocaleLowerCase();
                if(month === chartmonth){
                  this.state.bardata[y].fatur.value = this.state.bardata[y].fatur.value + this.state.orderstoprocess[i].total;
                  console.log(this.state.bardata[y].fatur.value)
                }
                }
              }
            }
          }
 
    await fetch(
      "https://api-shopycash1.herokuapp.com/indexstoreby/" +
        localStorage.getItem("@lojaid"),
    )
      .then((res) => res.json())
      .then(function (result) {
        localStorage.setItem("@loja", result.nomefantasia);
        localStorage.setItem("@shopping", result.shopping);
        localStorage.setItem("@rating", result.rating);
        localStorage.setItem("@count",result.countco)
      })
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoaded: false }), []);  
      
      
      var ctx = 'myChart';
      
      this.state.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
              label:"Vendas/Mês no APP",
                data: this.state.chartdata,
                borderColor: 'rgb(94, 170, 168)',
                tension: 0.1,
                fill:true,
                backgroundColor:'rgba(94, 170, 168, 0.2)'
            }]
        },
        options: {
          scales: {
            y: {
                beginAtZero: true
            }
          },
            parsing: {
                xAxisKey: 'id',
                yAxisKey: 'vendas.value'
            }
        }
        });

        await fetch("https://api-shopycash1.herokuapp.com/indexcategory/"+localStorage.getItem("@lojaid"))
          .then((res) => res.json())
          .then((result) => this.setState({ categorialist: result.data }))
          .catch((error) => console.log(error))
          .finally(() => this.setState({ isLoaded: false }), []);

          //console.log("size of array: \n"+this.state.categorialist.length)

          for(var j=0; j<this.state.categorialist.length; j++){
            this.state.radardata.push(0)
          }
          console.log("pre-dataradar value: "+ this.state.radardata)

          for(var z=0; z<this.state.categorialist.length; z++){
            this.state.radarlabel.push(this.state.categorialist[z].nome)
            for(var v=0; v<this.state.orderstoprocess.length; v++){
              for(var f=0; f<this.state.orderstoprocess[v].produtos.length; f++){
                if(this.state.orderstoprocess[v].produtos[f].categoria === this.state.categorialist[z].nome){
                  this.state.radardata[z] = this.state.radardata[z]+1;
                }  
            }
          }
        }

        var rdx = 'myRadar';

        this.state.myRadar = new Chart(rdx, {
          type:'radar',

          data:{
            labels:this.state.radarlabel,
          datasets: [{
            label:"Vendas por categoria",
            data: this.state.radardata,
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)'
          }]
      },
      options: {
        scales: {
          r: {
              angleLines: {
                  display: true
              },
              ticks:{
                stepSize:1
              },
              suggestedMin: 0,
          }
      },
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
        });

        var bdx = "mynewchart"

        this.state.mynewchart = new Chart(bdx, {
          type: 'bar',
          data: {
              datasets: [{
                label:"Faturament0/Mês no APP",
                  data: this.state.bardata,
                  borderColor: 'rgb(94, 170, 168)',
                  barPercentage: 1,
                  fill:true,
                  backgroundColor:'rgba(153, 102, 255, 0.2)',
                  borderWidth: 1,
                  borderColor: 'rgb(153, 102, 255)'
              }]
          },
          options: {
            scales: {
              y: {
                  beginAtZero: true,
                  ticks:{
                    display: true,                                   
                  }
              },
              x: {
                grid: {
                  offset: true
                }
            }
            },
              parsing: {
                  xAxisKey: 'id',
                  yAxisKey: 'fatur.value'
              }
          }
          });

          for(var i=0; i<this.state.orderstoprocess.length; i++){
              if(this.state.orderstoprocess[i].paymentmethod ==='Cartão'){
                console.log("here")
                this.state.dougdata[0] = this.state.dougdata[0]+1
              }else{
                this.state.dougdata[1] = this.state.dougdata[1]+1
              }
              console.log(this.state.dougdata)
            }

          var dbx = "mydougchart"

        this.state.mydougchart = new Chart(dbx, {
          type: 'doughnut',
          data: {
              labels: [
                "Cartão",
                "Dinheiro"
              ], 
              datasets: [{
                  data: this.state.dougdata,
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                  ]
              }]
          },
          });


          this.comentconsult();
  }

  comentconsult= async ()=>{
    const lojaid = localStorage.getItem("@lojaid")
      await fetch("https://api-shopycash1.herokuapp.com/comentarios/"+lojaid)
          .then((res) => res.json())
          .then((result) => this.setState({ comentarioresult: result }))
          .catch((error) => console.log(error))
          .finally(() => this.setState({ isLoaded: false }), []);

            console.log(this.state.comentarioresult)
  }

  expande =()=>{
    if(this.state.hide === 'none'){
      this.setState({hide:'flex'})
      this.setState({iconbt:'arrow-down'})
    }else{
      this.setState({hide:'none'})
      this.setState({iconbt:'arrow-right'})
    }
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

  render() {
    const { prodarray } = this.state;
    return (
      <DashboardLoja>
        
        <Section>
        <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper variant="outlined" elevation={3} style={{textAlign:'center', padding:10, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <Label>{this.state.count}</Label>
          <Title>Pedidos</Title>
          </Paper>
        </Grid>

        <Grid item xs={2}>
          <Paper variant="outlined" elevation={3} style={{textAlign:'center', padding:10, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <Label>{this.state.countawait}</Label>
          <Title>Em espera</Title>
          </Paper>
          </Grid>
          <Grid item xs={2}>
          <Paper variant="outlined" elevation={3} style={{textAlign:'center', padding:10, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <Label>{this.state.countroute}</Label>
          <Title>Em rota</Title>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper variant="outlined" elevation={3} style={{textAlign:'center', padding:10, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <Label>{this.state.countdeliv}</Label>
          <Title>Concluidos</Title>
          </Paper>         
        </Grid>
        <Grid item xs={4}>
          <Paper variant="outlined" elevation={3} style={{padding:10}}>
          <div className={"text-center"}><Label>Media das notas</Label></div>
          <div className={"flex-row items-center justify-between"}>
          <Title2>{localStorage.getItem("@rating")}
          <Rating
            name="hover-feedback"
            readOnly
            defaultValue={localStorage.getItem("@rating")}
            precision={0.5}
          />
          </Title2>
          </div>
          <Span>Media baseada em <strong>{localStorage.getItem("@count")}</strong> comentarios.</Span>
          </Paper>
        </Grid>
        </Grid>
                  
        <Grid container spacing={3} style={{paddingTop:10}}>
            <Grid item xs={3}>
              <Paper className={"p-4"}variant="outlined" elevation={3}>
                <canvas id="myChart" width="150" height="150" ></canvas>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={"p-4"} variant="outlined" elevation={3} >
                <canvas id="myRadar" width="150" height="150"></canvas></Paper>
              </Grid>
            <Grid item xs={3}>
              <Paper className={"p-4"} variant="outlined" elevation={3} >
                <canvas id="mynewchart" width="150" height="150"></canvas></Paper>
              </Grid>
              <Grid item xs={3}>
              <Paper className={"p-4"} variant="outlined" elevation={3} >
                <canvas id="mydougchart" width="150" height="150"></canvas></Paper>
              </Grid>
          </Grid>
          
          <Grid container spacing={3} style={{paddingTop:10}}>
            <Grid item xs={6}>
              <Paper className={"p-4"} variant="outlined" elevation={3} >
                {this.state.comentarioresult.map((item)=>{
                  return(
                  <Alert style={{margin: 5}}  variant="filled" severity="info">
                <AlertTitle>{item.username} - Pedido nº{item.order}</AlertTitle>
                <i>Nota: <strong>{item.nota}</strong></i>
                <br/>
                {item.comentario}
              </Alert>
                  )})}
                </Paper>
              </Grid>
            <Grid item xs={3}>
              <Paper className={"p-4"} variant="outlined" elevation={3} >
              {this.state.countroute >= 1 ?
              <Alert style={{margin: 5}}  variant="filled" severity="warning">
                <AlertTitle>Pedidos em rota de Entrega</AlertTitle>
                Existem um total de {this.state.countroute} pedidos <strong>em rota de Entrega!</strong>
              </Alert> : 
            <Alert style={{margin: 5}}  variant="filled" severity="success">
                <AlertTitle>Tudo certo</AlertTitle>
                No Momento não existem pedidos para serem <strong>enviados!</strong>
            </Alert>}
                </Paper>
              </Grid>
              <Grid item xs={3}>
              <Paper className={"p-4"} variant="outlined" elevation={3} >
              {this.state.countawait >= 1 ?
              <Alert style={{margin: 5}} variant="filled" severity="error">
                <AlertTitle>Pedidos aguardando</AlertTitle>
                Existem um total de {this.state.countawait} pedidos <strong>aguardando envio!</strong>
              </Alert> : 
            <Alert style={{margin: 5}}  variant="filled" severity="success">
                <AlertTitle>Tudo certo</AlertTitle>
                No Momento não existem pedidos para serem <strong>enviados!</strong>
            </Alert>}
                </Paper>
              </Grid>
          </Grid>
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
