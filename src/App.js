import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import ToggleButton from './components/toggleButton';
import VisGraph from './components/visVoltageLine';
import SimpleExpansionPanel from './components/expansionPanel';
import openSocket from 'socket.io-client';
import ResponsiveDrawer from './components/controlDrawer';

//---Variables---//

var cellData = [
/* 
  This 3D array stores latest measured value for each cell.
  Each value inside Group array represents measured cell value
  Z = 0; Voltage, Z = 1; Temperature
  Y = 0, Group 1; Y = 4, Group 4;
  X = 0, Cell index 0; X = 7, Cell index 7
          [Z][Y][X]
  cellData[0][1][5] = Latest measured voltage from Group 1, Cell 5.
  cellData[1][4][2] = Latest measured temperature from Group 4, Cell 2.
*/
  [ //Voltage
    [0,0,0,0,0,0,0,0], //Group 0
    [0,0,0,0,0,0,0,0], //Group 1 ...
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0] //... Group 9
  ],
  [ //Temperature
    [0,0,0,0,0,0,0,0], //Group 0
    [0,0,0,0,0,0,0,0], //Group 1 ...
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0] //... Group 9
  ]
];

//---Constants---//

const socket = openSocket('192.168.2.45:4000');

//--Functions--//

function validateJSON(string) { //Validate JSON string
  try {
    JSON.parse(string);
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
}

//---Events---//

window.addEventListener("load", function () {
  setTimeout(function () {
    // This hides the address bar:
    window.scrollTo(0, 1);
  }, 0);
});

socket.on('webSocket', function (data) {
  console.log(data.handle + ' ' + data.message);
});

socket.on('dataset', function (data) {
  /*
    Event: When client receives websocket package 'dataset' from the server.
    Dataset message should be in JSON format.
    Validate JSON -> If valid -> Parse JSON -> Write values to cellData array.
    Example dataset:
    {
      "Group":2,
      "voltage":[6.10,6.20,6.30,6.40,6.50,6.60,6.70,6.80],
      "temperature":[20,20,20,20,20,20,20,20]
    }
  */
  let input = data.message.toString();

  if (validateJSON(input)) {
    let validData = JSON.parse(input);

    for (let i = 0; i < validData.voltage.length; i++) {
      cellData[0][validData.Group][i] = validData.voltage[i];
    }

    for (let i = 0; i < validData.temperature.length; i++) {
      cellData[1][validData.Group][i] = validData.temperature[i];
    }    
  }
});

//---Build page---//

class App extends Component {
  render() {
    return (
      <div className="App">
        <ResponsiveDrawer />
        {/*<div style={{ height: 70 }}></div>
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Hello World!
         </p>*/}
        <ToggleButton socket={socket} />
        <VisGraph voltageData={ cellData[0][0] } dataLimit={ 100 } graphName={'Group 0'}/>
        <div style={{ height: 4 }}></div>
        <VisGraph voltageData={ cellData[0][1] } dataLimit={ 100 } graphName={'Group 1'}/>
        <div style={{ height: 4 }}></div>
        <VisGraph voltageData={ cellData[0][2] } dataLimit={ 100 } graphName={'Group 2'}/>
        <div style={{ height: 4 }}></div>
        <VisGraph voltageData={ cellData[0][3] } dataLimit={ 100 } graphName={'Group 3'}/>
        <div style={{ height: 4 }}></div>
        <VisGraph voltageData={ cellData[0][4] } dataLimit={ 100 } graphName={'Group 4'}/>
        <SimpleExpansionPanel />
      </div>
    );
  }
}

export default App;
