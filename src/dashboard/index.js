import React, {useState} from 'react';
import {Container, Input, Button, Title, Label} from './style'
import firebase from '../data/Firebase';

export default function Dashboard() {
  
  return (
   <Container> 
     <Title>Seja bem vindo, faça login para continuar </Title>
     <Label>Shopping</Label>
     <Input type="email" placeholder={shopping} disabled
      value={shopping}
      />
     <Input type="email" placeholder="Informe seu email"
      value={email} onChange={e=> setEmail(e.target.value)}
      />
      <Input type="password" placeholder="Informe sua senha"
      value={pass} onChange={e=> setPass(e.target.value)}
      />
      <Button onClick={login}> Entrar </Button>
      <Button onClick={cadastro}> cadastro </Button>
   </Container>   
  );
}