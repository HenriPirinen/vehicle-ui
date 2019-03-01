import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class GraphConfiguration extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            group0: props.currentState[0][0],
            group1: props.currentState[0][1],
            group2: props.currentState[0][2],
            group3: props.currentState[0][3],
            group4: props.currentState[0][4],
            group5: props.currentState[0][5],
            group6: props.currentState[0][6],
            group7: props.currentState[0][7],
            group8: props.currentState[0][8],
            dataPoints: props.dataLimit,
            selects: [0,1,2,3,4,5,6,7,8],
            interval: props.graphIntreval[0],
            heatmapMin: props.heatmapRange[0],
            heatmapMax: props.heatmapRange[1],
        };
    }

    handleChange = (name, group) => event => {
        this.setState({ [name]: event.target.checked });
        this.props.enabled( group, 'state', 0, !this.props.currentState[0][group]);
    };

    updateState = event => {
        this.setState({
          [event.target.id]: event.target.value,
        });
    };

    changeInterval = event => {
        let _interval = this.state.interval;
        _interval[parseInt(event.target.name, 10)] = event.target.value
        this.setState({ [event.target.name]: _interval });
        this.props.graphSettings('graphIntreval', event.target.value, 0, parseInt(event.target.name, 10));
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Enable cell group monitor</FormLabel>
                    <FormGroup row>
                        {this.state.selects.map(i => {
                            return (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.props.currentState[0][i]}
                                            onChange={this.handleChange(String('group' + i), i)}
                                            value={String('group' + i)}
                                        />
                                    }
                                    label={String(i)}
                                    key={i}
                                />
                            );
                        })}
                    </FormGroup>
                </FormControl>
                <Divider />
                <TextField
                    id="dataPoints"
                    label="Number of data points"
                    className={classes.textField}
                    value={this.state.dataPoints}
                    onChange={this.updateState}
                    onBlur={() => {
                        let fieldValue = document.getElementById('dataPoints').value;
                        if(!isNaN(fieldValue) && fieldValue > 0) this.props.updateParentState('dataLimit', fieldValue);
                    }}
                    margin="normal"
                />
                <Divider />
                <form className={classes.root} autoComplete="off">
                    {this.state.selects.map(i => {
                        return (
                            <FormControl className={classes.formControl} key={i}>
                                <InputLabel htmlFor={String('group_' + i + '_interval')}>{"Group " + i}</InputLabel>
                                <Select
                                    value={this.state.interval[i]}
                                    onChange={this.changeInterval}
                                    inputProps={{
                                        name: String(i),
                                        id: 'group_' + i + '_interval',
                                    }}
                                >
                                    <MenuItem value={0}>Realtime</MenuItem>
                                    <MenuItem value={30000}>Minute</MenuItem>
                                    <MenuItem value={150000}>5 minutes</MenuItem>
                                </Select>
                            </FormControl>
                        );
                    })
                    }
                </form>
                <Divider />
                <TextField
                    id="heatmapMin"
                    label="Heatmap range (min)"
                    className={classes.textField}
                    value={this.state.heatmapMin}
                    onChange={this.updateState}
                    onBlur={() => {
                        let condition_1 = document.getElementById('heatmapMin').value < document.getElementById('heatmapMax').value;
                        let condition_2 = !isNaN(document.getElementById('heatmapMin').value) && !isNaN(document.getElementById('heatmapMax').value);
                        if(condition_1 && condition_2) this.props.updateParentState('heatmapRange', document.getElementById('heatmapMin').value, 0)
                    }}
                    margin="normal"
                />
                <TextField
                    id="heatmapMax"
                    label="Heatmap range (max)"
                    className={classes.textField}
                    value={this.state.heatmapMax}
                    onChange={this.updateState}
                    onBlur={() => {
                        let condition_1 = document.getElementById('heatmapMin').value < document.getElementById('heatmapMax').value;
                        let condition_2 = !isNaN(document.getElementById('heatmapMin').value) && !isNaN(document.getElementById('heatmapMax').value);
                        if(condition_1 && condition_2) this.props.updateParentState('heatmapRange', document.getElementById('heatmapMax').value, 1)
                    }}
                    margin="normal"
                />
            </React.Fragment>
        );
    }
}

GraphConfiguration.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default  withStyles(styles)(GraphConfiguration);