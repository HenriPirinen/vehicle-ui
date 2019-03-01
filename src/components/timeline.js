import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 3,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    content: theme.mixins.gutters({
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }),
    reqBtn: {
        margin: theme.spacing.unit * 3,
    },
});

function Timeline(props) {
    const { classes } = props;
    return (
        <div className={classes.content}>
            <Paper className={classes.root}>
                <TextField
                    id="sDate"
                    label="Start date"
                    type="date"
                    defaultValue="2019-01-01"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="eDate"
                    label="End date"
                    type="date"
                    defaultValue="2019-01-01"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => { 
                        props.queryDB(document.getElementById('sDate').value, document.getElementById('eDate').value);
                        props.updateParentState('dataSDate', document.getElementById('sDate').value);
                        props.updateParentState('dataEDate', document.getElementById('eDate').value);
                     }}>
                    Query
            </Button>
            </Paper>
        </div>
    );
}

Timeline.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Timeline);