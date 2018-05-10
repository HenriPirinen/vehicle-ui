import React from 'react';
import Button from '@material-ui/core/Button';

class ToggleButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {isToggleOn: false};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));

    this.props.socket.emit('command', { //Send toggle command to server
      command: this.state.isToggleOn ? 'i' : 'o',
      handle: 'client',
      target: 'controller_2'
    });
  }

  render() {
    return (
        <Button onClick={this.handleClick} variant="raised" color="primary">
          {this.state.isToggleOn ? 'OFF' : 'ON'}
        </Button> 
    );
  }
}

export default ToggleButton;