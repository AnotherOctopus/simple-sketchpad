import React from 'react';
import Canvas from './Canvas.jsx';
import Button from './Button.jsx';
import BrowserWindow from 'electron';

class Sketchpad extends React.Component {
  constructor(props){
        super(props);
        var win = require('electron').remote.getCurrentWindow();
        //win.webContents.on("devtools-opened", () => { win.webContents.closeDevTools(); });
  }
  render() {
    var columnsStyle = {
            margin: '0px auto',
            width: '70%'
    }
    var columnStyle = {
            float: 'left',
            margin: 0,
            width: '33%'
    }
    return (
    <div className={columnsStyle}>

            <div className={columnStyle}>
             CONTENT
            </div>
            <div className={columnStyle} >
                      <Canvas savePressed={press => this.canvasSave = press} clearPressed={press => this.canvasClear = press}/>
            </div>
            <div className={columnStyle} >
                      <Button name="Save" onClick={() => this.canvasSave()}/>
            </div>
            <div className={columnStyle} >
                      <Button name="Clear" onClick={() => this.canvasClear()}/>
            </div>
    </div>
    );
  }
}
export default Sketchpad;
