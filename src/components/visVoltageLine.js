import React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries } from 'react-vis';

class VisGraph extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      graphDatapointLimit: props.dataLimit,
      graphName: props.graphName,
      parentWidth: document.getElementById('appContent').offsetWidth - 10
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      parentWidth: document.getElementById('appContent').offsetWidth - 10
    });
  }

  shouldComponentUpdate(newProps, newState) {

    /*console.log(this.props.newVoltageData[0][this.props.newVoltageData[0].length - 1].y)
    console.log(this.props.newVoltageData[0][this.props.newVoltageData[0].length - 1].y + " <-> " + newProps.newVoltageData[0][newProps.newVoltageData[0].length - 1].y);
    if(this.props.newVoltageData[0][this.props.newVoltageData[0].length - 1].y !== newProps.newVoltageData[0][this.props.newVoltageData[0].length - 1].y){ //Compare last datapoint of new props and current props
      console.log(this.state.graphName + "Update")
      return true;
    } else {
      return false;
    }*/
    return true;
  }

  render() {
      return (
        <div>
          <XYPlot height={300} width={this.state.parentWidth} xType="time" >
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis title="Time" position="start" />
            <YAxis title="Voltage" />
            <LineSeries data={this.props.newVoltageData[0]} />
            <LineSeries data={this.props.newVoltageData[1]} />
            <LineSeries data={this.props.newVoltageData[2]} />
            <LineSeries data={this.props.newVoltageData[3]} />
            <LineSeries data={this.props.newVoltageData[4]} />
            <LineSeries data={this.props.newVoltageData[5]} />
            <LineSeries data={this.props.newVoltageData[6]} />
            <LineSeries data={this.props.newVoltageData[7]} />
          </XYPlot>
        </div>
      );
  }
}


export default VisGraph;