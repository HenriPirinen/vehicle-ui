import React from 'react';
import InverterManagmentTable from './dataTable';
import InverterCommands from './inverterCommand';

class InverterTab extends React.Component {

  render() {
    return (
        <div>
            <InverterCommands webSocket={this.props.webSocket}/>
            <InverterManagmentTable webSocket={this.socket}/>
        </div>
    );
  }
}

export default InverterTab;