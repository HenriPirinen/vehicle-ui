import React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries } from 'react-vis';
import DiscreteColorLegend from 'react-vis/dist/legends/discrete-color-legend';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';

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
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  graphHeader: {
    display: 'flex',
    alignItems: 'center'
  }
});

class DataLine extends React.Component {
  constructor(props) {
    super(props)

    let itemsList = [];
    for(let i = ((props.data.length * (props.graphName + 1))) - props.data.length; i <= ((props.data.length * (props.graphName + 1)) - 1); i++){
      itemsList.push(String(i));
    }

    this.state = {
      graphDatapointLimit: props.dataLimit,
      graphName: props.graphName,
      graphData: props.data,
      parentWidth: document.getElementById('appContent').offsetWidth,
      data: props.data,
      latest: 0,
      shouldUpdate: false,
      infoExapanded: false,
      items: itemsList,
      interval: props.interval,
    }
  }

  componentWillReceiveProps(newProps) {
    let _data = new Array(newProps.data.length) //Initialize Dynamic two dimensional array
    for(let group = 0; group < _data.length; group++){
      _data[group] = [];
    }

    newProps.data[0][newProps.data[0].length - 1].y !== this.state.latest ? this.setState({ shouldUpdate: true }) : this.setState({ shouldUpdate: false })
    
    if(this.state.shouldUpdate){
      for(let i = 0; i < this.props.data.length; i++){
        if(this.state.interval[0][newProps.graphName] === 0){ //If graph is realtime, build array
          if(newProps.data[i].length < newProps.dataLimit){ //If graph has not exceeded it's limit => copy
            _data[i] = newProps.data[i]
          } else {
            _data[i] = newProps.data[i].slice(newProps.data[i].length - newProps.dataLimit, newProps.data[i].length) //Slice array if it's length exceeds limit, limit set @ settings tab
          }
        } else { //If graph IS NOT realtime, build array
          for(let z = 0, mult = 0; z < newProps.data[i].length; z++){ //Search data object with selected interval. Interval count starts at first data object
            if(newProps.data[i][z].x > (parseInt(newProps.data[i][0].x, 10) + parseInt(newProps.interval[0][newProps.graphName] * mult, 10))){
              mult += 2;
              _data[i].push(newProps.data[i][z]);
              if(_data[i].length > newProps.dataLimit) _data[i].shift();
            }
          }
        }
      }
    }

    this.setState({
      parentWidth: document.getElementById('graphRoot').offsetWidth - 10,
      latest: newProps.data[0][newProps.data[0].length - 1].y,
      graphData: _data
    });
  }

  shouldComponentUpdate(newProps, newState) {
    if (this.state.shouldUpdate) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div id={"graphRoot"} className={classes.root}>
        <Paper elevation={4}>
          {this.props.graphTitle &&
            <div className={classes.graphHeader}>
              <Typography className={classes.headline} variant="title" gutterBottom>
                Group {this.props.graphName}
              </Typography>
              {this.props.isCharging === true ? (
                this.props.chargeStatus ? <CheckIcon/> : <CircularProgress className={classes.progress}/>
                  ) : (
                    null
                  )
              }
            </div>
          }
          <XYPlot height={300} width={this.state.parentWidth - 35} xType="time" >
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis title="Time" position="start" />
            <YAxis title={this.props.type} />
            {this.state.items.map(i => {
                return <LineSeries key={i} data={this.state.graphData[this.state.items.indexOf(i)]} />
              })
            }
          </XYPlot>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>More about group {this.props.graphName}</Typography>
            </ExpansionPanelSummary>
            {this.props.commands &&
              <ExpansionPanelDetails>
                <Button disabled={!this.props.isCharging} variant="raised" color="primary" className={classes.button} onClick={() => this.props.toggleCharging(this.props.graphName)}>
                  {this.props.chargeStatus ? "Start charging" : "Stop charging"}
                  <TrendingUpIcon className={classes.rightIcon}>start</TrendingUpIcon>
                </Button>
              </ExpansionPanelDetails>
            }
            <Divider />
            <ExpansionPanelDetails>
              <DiscreteColorLegend
                orientation="horizontal"
                width={300}
                items={this.state.items}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      </div>
    );
  }
}

DataLine.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(DataLine);