/*MIT License

Copyright (c) 2018 Henri Pirinen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

import React from 'react';
import DataLine from './dataLine';
import Heatmap from './heatmap';


class GraphContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            parentWidth: document.getElementById('appContent').offsetWidth - 10,
            graphs: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        }
    }

    shouldComponentUpdate(newProps, newState) {
        return true;
    }

    render() {
        return (
            <div id={'graphContainer'} style={{ width: this.state.parentWidth }}>
                {this.props.type === 'Voltage' ? (
                    this.state.graphs.map(i => {
                        return (
                            this.props.enabledGraphs[0][i] ? (
                                <DataLine
                                    key={i}
                                    graphTitle={true}
                                    graphWidth={this.props.contentWidth}
                                    data={this.props.data[0][i]}
                                    dataLimit={this.props.dataLimit}
                                    graphName={i}
                                    chargeStatus={this.props.chargeStatus[i]}
                                    isCharging={this.props.charging}
                                    toggleCharging={this.props.toggleCharging}
                                    interval={this.props.interval}
                                    commands={true}
                                    type={"Voltage"}
                                />
                            ) : (null)
                        );
                    })) : (
                        <React.Fragment>
                            <Heatmap
                                data={this.props.data[1]}
                                heatmapRange={this.props.heatmapRange}
                            />
                            {this.state.graphs.map(t => {
                                return (
                                    <DataLine
                                        key={t}
                                        graphTitle={false}
                                        graphWidth={this.props.contentWidth}
                                        data={this.props.data[1][t]}
                                        dataLimit={this.props.dataLimit}
                                        graphName={t}
                                        chargeStatus={this.props.chargeStatus[t]}
                                        isCharging={this.props.charging}
                                        toggleCharging={this.props.toggleCharging}
                                        interval={this.props.interval}
                                        commands={false}
                                        type={"Temperature"}
                                    />
                                )
                            })}

                        </React.Fragment>
                    )
                }
            </div>
        );
    }
}


export default GraphContainer;