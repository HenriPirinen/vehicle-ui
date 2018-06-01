import React from 'react';

class LogTab extends React.Component {

  render() {
    return (
        <div>
            <h1>Server</h1>
            <textarea rows="10" cols="50"></textarea>
            <h1>Inverter</h1>
            <textarea rows="10" cols="50"></textarea>
        </div>
    );
  }
}

export default LogTab;