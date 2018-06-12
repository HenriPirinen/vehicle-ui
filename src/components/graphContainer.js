import React from 'react';
import VisGraph from './visVoltageLine';

class GraphContainer extends React.Component {

    shouldComponentUpdate(newProps, newState) {
        return true;
    }

    render() {
        return (
            <div>
                {this.props.enabledGraphs[0][0] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][0]}
                    dataLimit={100}
                    graphName={'Group 0'}
                />}
                {this.props.enabledGraphs[0][1] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][1]}
                    dataLimit={100}
                    graphName={'Group 1'}
                />}
                {this.props.enabledGraphs[0][2] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][2]}
                    dataLimit={100}
                    graphName={'Group 2'}
                />}
                {this.props.enabledGraphs[0][3] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][3]}
                    dataLimit={100}
                    graphName={'Group 3'}
                />}
                {this.props.enabledGraphs[0][4] &&
                <VisGraph
                    graphWidth={this.props.contentWidth}
                    newVoltageData={this.props.data[0][4]}
                    dataLimit={100}
                    graphName={'Group 4'}
                />}
            </div>
        );
    }
}


export default GraphContainer;