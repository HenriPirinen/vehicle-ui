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
import {XYPlot, XAxis, YAxis, HeatmapSeries} from 'react-vis';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    headline: theme.mixins.gutters({
      marginLeft: 15,
      paddingTop: 15
    }),
    root: theme.mixins.gutters({
      marginTop: theme.spacing.unit * 1.5,
    }),
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    graphHeader: {
      display: 'flex',
      alignItems: 'center'
    }
});

function generateData(measurements, rangeMin, rangeMax){
    let formatedData = [];
    let data = [];
    let gradient = [];

    for(let i = 0, r = 0, b = 255; i <= 510; i++){ //Generate color gradient
        gradient.push(`rgb(${r}, 0, ${b})`);
        if(r < 255){
            r++
        } else if(b > 0) {
            b--;
        }
    }

    //Group / Cell / List of measuruments
    for(let group = 0; group < measurements.length; group++){ //Format data to simple list
        for(let cell = 0; cell < measurements[group].length; cell++){
            formatedData.push(measurements[group][cell][measurements[0][0].length - 1].y);
        }
    }

    for(let i = 0, y = 1, x = 1; i < 72; i++){ //Generate heatmap data
        data.push({x: x, y: y, color: gradient[Math.round((formatedData[i] - rangeMin) / ((rangeMax - rangeMin) / 510))]});
        if(y === 15){
            y = 1;
            x++;
        } else {
            y++;
        }
    }
    return data;
}

class Heatmap extends React.Component {
  render() {
    const { classes } = this.props;
    return (
        <div id={"graphRoot"} className={classes.root}>
            <Paper elevation={4}>
                <XYPlot
                    width={500}
                    height={500}>
                    <XAxis tickValues={[1, 2, 3, 4, 5]}/>
                    <YAxis />
                    <HeatmapSeries
                    colorType="literal"
                    data={generateData(this.props.data, 20, 80)}
                    />
                </XYPlot>
            </Paper>
        </div>
    );
  }
}

Heatmap.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Heatmap);