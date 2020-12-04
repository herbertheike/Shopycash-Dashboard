import React from 'react';
import { Container, Button, Title } from "./style";
import firebase from '../data/Firebase';
import history from '../history';


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      shopping: []
    };
  }

componentDidMount() {
    fetch("http://localhost:3001/shopping")
      .then(res => res.json())
      .then((result) => this.setState({shopping: result}))
      .catch((error) => (error))
      .finally(()=> this.setState({isLoaded: false}),[])
  }

  
  logout() {
    firebase.auth().signOut().then(function() {
    localStorage.removeItem('user')
    history.push('/')
  }).catch(function(error) {
  });
  }

  render(){
    const {shopping } = this.state
    console.log(shopping)
      return (
        <ul>
          {shopping.map(item => (
            <li key={item.shopping._id}>
              {item.shopping._id}<br />
              {item.shopping.nome}<br/>
              {item.shopping.endereco}
            </li>
          ))}


          <Button onClick={this.logout}> SAIR </Button>
        </ul>
        
      );
    }
  }

 export default Dashboard;
