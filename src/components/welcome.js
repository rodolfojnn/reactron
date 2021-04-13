import { Button } from '@material-ui/core';
import React from 'react';
import AppButton from './app-button';
const { remote } = require('electron')
const backend = remote.require('./main.js')

export default class Home extends React.Component {

  // Datasource
  delayGlobal = 200;

  constructor(props) {
    super(props)
    this.state = {
      histoSelectedTipo: '',
      histoSelected: null,
      histogramas: {
        hist1: {x: 0, y: 0, buy: '000', sell: '000', status: '000', timer: null},
        hist2: {x: 0, y: 0, buy: '000', sell: '000', status: '000', timer: null},
        hist3: {x: 0, y: 0, buy: '000', sell: '000', status: '000', timer: null}
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keypress', this.processSpaceKey)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.processSpaceKey);
  }

  processSpaceKey = (e) => {
    if (e.code === 'Space' && this.state.histoSelected) {
      console.log(this.state.histoSelected);
      console.log(this.state.histoSelectedTipo);
    }
  }

  markColor(hist, tipo) {
    // alert('Atenção! Após posicionar o mouse sobre a cor desejada, pressione a BARRA DE ESPAÇO');
    this.setState({histoSelected: hist, histoSelectedTipo: tipo});
  }

  markCoord(hist) {
    // alert('Atenção! Após posicionar o mouse sobre a cor desejada, pressione a tecla BARRA DE ESPAÇO');
    this.setState({histoSelected: hist, histoSelectedTipo: 'coord'});
  }

  async onTeste(e) {
    /*
    setInterval(() => {
      const colors = backend.mouseColorArray([{x: 100, y: 200}, {x: 150, y: 250}, {x: 200, y: 250}, {x: 300, y: 350}]);
      this.setState({color1: colors[0], color2: colors[1], color3: colors[2], color4: colors[3]});
    }, this.delayGlobal);
    */

  }

  render() {
    return (
      <div id="welcome">
        <h3>Configuração dos Histogramas</h3>

        <article className="topo">

          <div className="histogramas">

            <div className="histo">
              <h4>HISTOGRAMA 1</h4>
              <div className="switch">
                <div className="box color-buy" onClick={() => this.markColor(this.state.histogramas.hist1, 'buy')}><span>COMPRA</span></div>
                <div className="box color-sell" onClick={() => this.markColor(this.state.histogramas.hist1, 'sell')}><span>VENDE</span></div>
                <div className="box status" onClick={() => this.markCoord(this.state.histogramas.hist1)}><span>STATUS</span></div>
              </div>
            </div>
            <p>{JSON.stringify(this.state)}</p>
          </div>

          <Button variant="contained" color="secondary">
            Secondary
          </Button>

        </article>

        {/* <p>Este programa é um projeto base para uma aplicacao React/Electron/Material-UI</p>
        <AppButton onClick={(e) => { this.onTeste(e) }}>LIMPA</AppButton>
        <div style={{backgroundColor: '#' + this.state.color1}}>1111</div>
        <div style={{backgroundColor: '#' + this.state.color2}}>1111</div>
        <div style={{backgroundColor: '#' + this.state.color3}}>1111</div>
        <div style={{backgroundColor: '#' + this.state.color4}}>1111</div> */}
      </div>
    )
  }
}