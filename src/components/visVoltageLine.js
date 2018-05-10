import React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries } from 'react-vis';

/*
this.state.cellData
Each datapoint is a object that contains X-axis value and Y-axis value.

[
  [ //Cell 1
    {x: oldest x-axisvalue, y: oldest datavalue},
    ...
    {x: latest x-axisvalue, y: latest datavalue}
  ],
  [ //Cell 2
    {x: oldest x-axisvalue, y: oldest datavalue},
    ...
    {x: latest x-axisvalue, y: latest datavalue}
  ],
  ...
  [ //Cell 8
    {x: oldest x-axisvalue, y: oldest datavalue},
    ...
    {x: latest x-axisvalue, y: latest datavalue}
  ]
]

*/

class VisGraph extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      graphDatapointLimit: props.dataLimit,
      graphName: props.graphName,
      cellData: [
                  [
                    {x: new Date().getTime(), y: 0}
                  ], 
                  [
                    {x: new Date().getTime(), y: 0}
                  ], 
                  [
                    {x: new Date().getTime(), y: 0}
                  ], 
                  [
                    {x: new Date().getTime(), y: 0}
                  ], 
                  [
                    {x: new Date().getTime(), y: 0}
                  ], 
                  [
                    {x: new Date().getTime(), y: 0}
                  ], 
                  [
                    {x: new Date().getTime(), y: 0}
                  ], 
                  [
                    {x: new Date().getTime(), y: 0}
                  ]
                ],
      graphIndex: 1,
      updateComponent: false
    }
  }

  componentWillReceiveProps(newProps) {
    let tempData = this.state.cellData;
    
    if(this.state.cellData[0][this.state.cellData[0].length - 1].y !== newProps.voltageData[0]){
      for (var i = 0; i < tempData.length; i++) {
        tempData[i].push({ x: new Date().getTime(), y: newProps.voltageData[i] });
        if (tempData[i].length > this.state.graphDatapointLimit) tempData[i].shift();
      }

      this.setState({
        graphDatapointLimit: newProps.dataLimit,
        cellData: tempData,
        graphIndex: this.state.graphIndex + 1,
        updateComponent: true
      });
    }
  }

  shouldComponentUpdate(newProps, newState) {
    
    if(this.state.updateComponent){
      this.setState({ updateComponent: false });
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <XYPlot height={300} width={document.body.clientWidth} xType="time" >
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis title="Time" position="start" />
          <YAxis title="Voltage" />
          <LineSeries data={this.state.cellData[0]} />
          <LineSeries data={this.state.cellData[1]} />
          <LineSeries data={this.state.cellData[2]} />
          <LineSeries data={this.state.cellData[3]} />
          <LineSeries data={this.state.cellData[4]} />
          <LineSeries data={this.state.cellData[5]} />
          <LineSeries data={this.state.cellData[6]} />
          <LineSeries data={this.state.cellData[7]} />
        </XYPlot>
      </div>
    );
  }
}

export default VisGraph;