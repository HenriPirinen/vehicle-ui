import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class EnableGroupMonitor extends React.Component {
    state = {
        group0: true,
        group1: true,
        group2: true,
        group3: true,
        group4: true,
        group5: true,
        group6: true,
        group7: true,
        group8: true,
        group9: true,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">Enable cell group monitor</FormLabel>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.group0}
                                onChange={this.handleChange('group0')}
                                value="group0"
                            />
                        }
                        label="0"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.group1}
                                onChange={this.handleChange('group1')}
                                value="group1"
                            />
                        }
                        label="1"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.group2}
                                onChange={this.handleChange('group2')}
                                value="group2"
                            />
                        }
                        label="2"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.group3}
                                onChange={this.handleChange('group3')}
                                value="group3"
                            />
                        }
                        label="3"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.group4}
                                onChange={this.handleChange('group4')}
                                value="group4"
                            />
                        }
                        label="4"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.group5}
                                onChange={this.handleChange('group5')}
                                value="group5"
                            />
                        }
                        label="5"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.group6}
                                onChange={this.handleChange('group6')}
                                value="group6"
                            />
                        }
                        label="6"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.group7}
                                onChange={this.handleChange('group7')}
                                value="group7"
                            />
                        }
                        label="7"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.group8}
                                onChange={this.handleChange('group8')}
                                value="group8"
                            />
                        }
                        label="8"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.group9}
                                onChange={this.handleChange('group9')}
                                value="group9"
                            />
                        }
                        label="9"
                    />
                </FormGroup>
            </FormControl>
        );
    }
}

export default EnableGroupMonitor;