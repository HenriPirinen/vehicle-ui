import React from 'react';

class SystemUpdateTab extends React.Component {

  render() {
    return (
        <div>
            <h1>Microcontroller</h1>
            <form action="fileupload" method="post" enctype="multipart/form-data">
            <input type="file" name="filetoupload" />
            <input type="submit" />
            </form>
            <h1>Graphical user interface</h1>
            <form action="fileupload" method="post" enctype="multipart/form-data">
            <input type="file" name="filetoupload" />
            <input type="submit" />
            </form>
            <h1>Server</h1>
            <form action="fileupload" method="post" enctype="multipart/form-data">
            <input type="file" name="filetoupload" />
            <input type="submit" />
            </form>
        </div>
    );
  }
}

export default SystemUpdateTab;