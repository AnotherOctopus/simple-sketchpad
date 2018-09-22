import React from 'react';
import Canvas from './Canvas.jsx';
import Button from './Button.jsx';

class Sketchpad extends React.Component {
  constructor(props){
        super(props);
  }
  render() {
    return (<div>
      <Button name="Save" onClick={() => this.canvas()}/>
      <Canvas savePressed={press => this.canvas = press}/>
    </div>);
  }
}
export default Sketchpad;
