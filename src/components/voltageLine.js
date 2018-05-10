
import React from 'react';
import Highcharts from 'highcharts/highstock'
import {
    HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, LineSeries
} from 'react-jsx-highcharts';

/*const plotOptions = {
  series: {
    pointStart: 2009
  }
};*/

//var arrayIndex = 0;
var testArray = [5, 10, 5, 10, 5, 10];

class Graph extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dataArray1: [3.2, 2.5, 3.7, 3.3, 3.4, 3.3, 3.1, 3.0],
            dataArray2: [2.8, 2.4, 3.6, 3.1, 2.9, 3, 3.2, 3.2],
            dataArray3: [2.7, 2.3, 3.55, 2.95, 2.85, 3.1, 3, 2.98],
            dataArray4: [3.3, 2.2, 3.48, 3.6, 2, 3.1, 2.75, 3.75],
            dataArray5: [3.5, 2.1, 3.42, 3.5, 2, 3.12, 2.9, 3.12],
            dataArray6: [3.42, 3.6, 3.3, 3.3, 3, 3.19, 3.45, 3.2],
            dataArray7: [3.12, 3.55, 3.2, 3.2, 3, 3.3, 3, 3.17],
            dataArray8: [3.25, 3.23, 3.1, 3.3, 3, 3.28, 3.05, 3.45],
        }
    }

    componentWillReceiveProps(newProps) {
        //var dataCopy = this.state.dataArray8;
        //let testArray = [5,10,5,10,5,10];
        //let testArray = this.state.dataArray8;
        //console.log("Old: " + testArray);
        testArray.push(newProps.voltageData[1] - 30);
        //dataCopy.push(newProps.voltageData[1]);
        testArray.shift();
        console.log("New: " + testArray);

        /*let index_1 = 1;
        let index_2 = 2;
        let index_3 = 3;
        let index_4 = 4;
        let index_5 = 5;*/

        this.setState({
            dataArray1: [Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5],
            dataArray2: [Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5],
            dataArray3: [Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5],
            dataArray4: [Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5],
            dataArray5: [Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5],
            dataArray6: [Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5],
            dataArray7: [Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5],
            dataArray8: testArray //<--Does not work....
            //dataArray8: [Math.random() * index_1, Math.random() * index_2, Math.random() * index_3, Math.random() * index_4, Math.random() * index_5, Math.random() * index_1, Math.random() * index_2, Math.random() * index_3] //<-- works
            //dataArray8: [Math.random() * 5, Math.random() * 5, Math.random() * 5, newProps.voltageData[1] - 40, Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5] //<-- works
        });
        console.log("New state: " + this.state.dataArray8);
    }

    shouldComponentUpdate(newProps, newState) {
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!');
        console.log(" ");
    }

    render() {
        return (
            <div className="app">
                <HighchartsChart >
                    <Chart />

                    <Title>Cell voltage</Title>

                    <Legend layout="vertical" align="right" verticalAlign="middle" />

                    <XAxis type="datetime">
                        <XAxis.Title>Time</XAxis.Title>
                    </XAxis>

                    <YAxis id="number">
                        <YAxis.Title>Voltage</YAxis.Title>
                        <LineSeries id="volt_1" name="Voltage 1" data={this.state.dataArray1} />
                        {/*<LineSeries id="volt_2" name="Voltage 2" data={this.state.dataArray2} />
                    <LineSeries id="volt_3" name="Voltage 3" data={this.state.dataArray3} />
                    <LineSeries id="volt_4" name="Voltage 4" data={this.state.dataArray4} />
                    <LineSeries id="volt_5" name="Voltage 5" data={this.state.dataArray5} />
                    <LineSeries id="volt_6" name="Voltage 6" data={this.state.dataArray6} />
                    <LineSeries id="volt_7" name="Voltage 7" data={this.state.dataArray7} />*/}
                        <LineSeries id="volt_8" name="Voltage 8" data={this.state.dataArray8} />
                    </YAxis>
                </HighchartsChart>
            </div>
        );
    }
}

export default withHighcharts(Graph, Highcharts);