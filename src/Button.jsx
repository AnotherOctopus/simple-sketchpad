import React from 'react';
import Canvas from './Canvas.jsx';

class Button extends React.Component{
        constructor(props){
                super(props);
        }

        pressed(){
                console.log("blah");
        }
        render(){
                return(
                        <button onClick={this.props.onClick}>
                                {this.props.name}
                        </button>
                );
        }
};
export default Button;
