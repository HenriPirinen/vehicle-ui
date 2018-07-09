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

class VisGraph extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      graphDatapointLimit: props.dataLimit,
      graphName: props.graphName,
      parentWidth: document.getElementById('appContent').offsetWidth,
      data: props.newVoltageData,
      latest: 0,
      shouldUpdate: false,
      infoExapanded: false,
      items: ['0','1','2','3','4','5','6','7'],
    }
  }

  componentWillReceiveProps(newProps) {
    newProps.newVoltageData[0][newProps.newVoltageData[0].length - 1].y !== this.state.latest ? this.setState({ shouldUpdate: true }) : this.setState({ shouldUpdate: false })
    this.setState({
      parentWidth: document.getElementById('graphRoot').offsetWidth - 10,
      latest: newProps.newVoltageData[0][newProps.newVoltageData[0].length - 1].y
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
          <XYPlot height={300} width={this.state.parentWidth - 35} xType="time" >
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
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>More about group {this.props.graphName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Button disabled={!this.props.isCharging} variant="raised" color="primary" className={classes.button} onClick={() => this.props.toggleCharging(this.props.graphName)}>
                {this.props.chargeStatus ? "Start charging" : "Stop charging"}
                <TrendingUpIcon className={classes.rightIcon}>start</TrendingUpIcon>
              </Button>
            </ExpansionPanelDetails>
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

VisGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(VisGraph);