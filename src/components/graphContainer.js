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
                />}
                {this.props.enabledGraphs[0][1] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][1]}
                    dataLimit={100}
                    graphName={1}
                />}
                {this.props.enabledGraphs[0][2] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][2]}
                    dataLimit={100}
                    graphName={2}
                />}
                {this.props.enabledGraphs[0][3] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][3]}
                    dataLimit={100}
                    graphName={3}
                />}
                {this.props.enabledGraphs[0][4] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][4]}
                    dataLimit={100}
                    graphName={4}
                />}
            </div>
        );
    }
}


export default GraphContainer;