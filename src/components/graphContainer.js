import React from 'react';
import VisGraph from './visVoltageLine';

class GraphContainer extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            parentWidth: document.getElementById('appContent').offsetWidth - 10,
        }
    }

    shouldComponentUpdate(newProps, newState) {
        return true;
    }

    render() {
        return (
            <div id={'graphContainer'} style={{width: this.state.parentWidth}}>
                <div style={{ height: 10 }}></div>
                {this.props.enabledGraphs[0][0] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][0]}
                    dataLimit={100}
                    graphName={0}
                    chargeStatus={this.props.chargeStatus[0]}
                    isCharging={this.props.charging}
                    toggleCharging={this.props.toggleCharging}
                />}
                {this.props.enabledGraphs[0][1] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][1]}
                    dataLimit={100}
                    graphName={1}
                    chargeStatus={this.props.chargeStatus[1]}
                    isCharging={this.props.charging}
                    toggleCharging={this.props.toggleCharging}
                />}
                {this.props.enabledGraphs[0][2] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][2]}
                    dataLimit={100}
                    graphName={2}
                    chargeStatus={this.props.chargeStatus[2]}
                    isCharging={this.props.charging}
                    toggleCharging={this.props.toggleCharging}
                />}
                {this.props.enabledGraphs[0][3] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][3]}
                    dataLimit={100}
                    graphName={3}
                    chargeStatus={this.props.chargeStatus[3]}
                    isCharging={this.props.charging}
                    toggleCharging={this.props.toggleCharging}
                />}
                {this.props.enabledGraphs[0][4] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][4]}
                    dataLimit={100}
                    graphName={4}
                    chargeStatus={this.props.chargeStatus[4]}
                    isCharging={this.props.charging}
                    toggleCharging={this.props.toggleCharging}
                />}
            </div>
        );
    }
}


export default GraphContainer;