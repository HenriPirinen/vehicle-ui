import React from 'react';
import DataLine from './dataLine';

class GraphContainer extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            parentWidth: document.getElementById('appContent').offsetWidth - 10,
            graphs: [0,1,2,3,4],
        }
    }

    shouldComponentUpdate(newProps, newState) {
        return true;
    }

    render() {
        return (
            <div id={'graphContainer'} style={{width: this.state.parentWidth}}>
                {this.props.type === 'Voltage' ? (
                    this.state.graphs.map(i => {
                        return (
                            this.props.enabledGraphs[0][i] ? (
                            <DataLine
                                key={i}
                                graphWidth={this.props.contentWidth}
                                newVoltageData={this.props.data[0][i]}
                                dataLimit={100}
                                graphName={i}
                                chargeStatus={this.props.chargeStatus[i]}
                                isCharging={this.props.charging}
                                toggleCharging={this.props.toggleCharging}
                                commands={true}
                                type={"Voltage"}
                            />
                            ):(null)
                        );
                    })) : (
                            <DataLine
                                key={0}
                                graphWidth={this.props.contentWidth}
                                newVoltageData={this.props.data[0][0]}
                                dataLimit={100}
                                graphName={0}
                                chargeStatus={this.props.chargeStatus[0]}
                                isCharging={this.props.charging}
                                toggleCharging={this.props.toggleCharging}
                                commands={false}
                                type={"Temperature"}
                            />
                        )
                }
            </div>
        );
    }
}


export default GraphContainer;