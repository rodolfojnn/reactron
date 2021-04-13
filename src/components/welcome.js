import React from 'react';
import AppButton from './app-button';
const { remote } = require('electron')
const backend = remote.require('./main.js')

export default class Home extends React.Component{

  onTeste = (e) => {
    console.log(e);
    console.log(backend.testeProcess());
  }

  render(){
    return (
        <div>
          <p align="right"><b>source:</b> welcome.js </p>
          <h2>Seja bem-vindo!</h2>
          <p>Este programa é um projeto base para uma aplicacao React/Electron/Material-UI.</p>
          <AppButton onClick={() => {this.onTeste(event)}}>
            LIMPA
          </AppButton>
        </div>
    )
  }
 }