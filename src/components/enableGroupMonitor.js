import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class EnableGroupMonitor extends React.Component {
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
        };
    }

    handleChange = (name, group) => event => {
        this.setState({ [name]: event.target.checked });
        this.props.enabled( group, 'state', 0, !this.props.currentState[0][group]);
    };

    render() {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">Enable cell group monitor</FormLabel>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.currentState[0][0]}
                                onChange={this.handleChange('group0', 0)}
                                value="group0"
                            />
                        }
                        label="0"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.currentState[0][1]}
                                onChange={this.handleChange('group1', 1)}
                                value="group1"
                            />
                        }
                        label="1"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.currentState[0][2]}
                                onChange={this.handleChange('group2', 2)}
                                value="group2"
                            />
                        }
                        label="2"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.currentState[0][3]}
                                onChange={this.handleChange('group3', 3)}
                                value="group3"
                            />
                        }
                        label="3"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.currentState[0][4]}
                                onChange={this.handleChange('group4', 4)}
                                value="group4"
                            />
                        }
                        label="4"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.currentState[0][5]}
                                onChange={this.handleChange('group5', 5)}
                                value="group5"
                            />
                        }
                        label="5"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.currentState[0][6]}
                                onChange={this.handleChange('group6', 6)}
                                value="group6"
                            />
                        }
                        label="6"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.currentState[0][7]}
                                onChange={this.handleChange('group7', 7)}
                                value="group7"
                            />
                        }
                        label="7"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.currentState[0][8]}
                                onChange={this.handleChange('group8' ,8)}
                                value="group8"
                            />
                        }
                        label="8"
                    />
                </FormGroup>
            </FormControl>
        );
    }
}

export default EnableGroupMonitor;