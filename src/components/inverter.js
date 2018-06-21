import React from 'react';
import InverterManagmentTable from './dataTable';
import InverterCommands from './inverterCommand';

class InverterTab extends React.Component {

  render() {
    return (
        <div>
            <InverterCommands />
            <InverterManagmentTable />
        </div>
    );
  }
}

export default InverterTab;