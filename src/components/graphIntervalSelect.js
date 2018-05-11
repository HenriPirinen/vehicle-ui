import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
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

class GraphIntervalSelect extends React.Component {
    state = {
        interval: 0,
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="group_1_interval">{"Group " + this.props.groups[0]}</InputLabel>
                    <Select
                        value={this.state.interval}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'interval',
                            id: 'group_1_interval',
                        }}
                    >
                        <MenuItem value={0}>Realtime</MenuItem>
                        <MenuItem value={1}>Minute</MenuItem>
                        <MenuItem value={5}>5 minutes</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="group_2_interval">{"Group " + this.props.groups[1]}</InputLabel>
                    <Select
                        value={this.state.interval}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'interval',
                            id: 'group_2_interval',
                        }}
                    >
                        <MenuItem value={0}>Realtime</MenuItem>
                        <MenuItem value={1}>Minute</MenuItem>
                        <MenuItem value={5}>5 minutes</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="group_3_interval">{"Group " + this.props.groups[2]}</InputLabel>
                    <Select
                        value={this.state.interval}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'interval',
                            id: 'group_3_interval',
                        }}
                    >
                        <MenuItem value={0}>Realtime</MenuItem>
                        <MenuItem value={1}>Minute</MenuItem>
                        <MenuItem value={5}>5 minutes</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="group_4_interval">{"Group " + this.props.groups[3]}</InputLabel>
                    <Select
                        value={this.state.interval}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'interval',
                            id: 'group_4_interval',
                        }}
                    >
                        <MenuItem value={0}>Realtime</MenuItem>
                        <MenuItem value={1}>Minute</MenuItem>
                        <MenuItem value={5}>5 minutes</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="group_5_interval">{"Group " + this.props.groups[4]}</InputLabel>
                    <Select
                        value={this.state.interval}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'interval',
                            id: 'group_5_interval',
                        }}
                    >
                        <MenuItem value={0}>Realtime</MenuItem>
                        <MenuItem value={1}>Minute</MenuItem>
                        <MenuItem value={5}>5 minutes</MenuItem>
                    </Select>
                </FormControl>
            </form>
        );
    }
}

GraphIntervalSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GraphIntervalSelect);