import React from 'react';
import AppButton from './app-button';
const { remote } = require('electron')
const backend = remote.require('./main.js')

export default class Home extends React.Component{

  onTeste(e) {
    backend.mouseMove();
    console.log('final');
  }

  render(){
    return (
        <div>
          <p align="right"><b>source:</b> welcome.js </p>
          <h2>Seja bem-vindo!</h2>
          <p>Este programa é um projeto base para uma aplicacao React/Electron/Material-UI</p>
          <AppButton onClick={(e) => {this.onTeste(e)}}>
            LIMPA
          </AppButton>
        </div>
    )
  }
 }