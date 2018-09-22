import React from 'react';
class Canvas extends React.Component {
        constructor(props) {
                super(props)
                this.state = {
                        canvas: false,
                        ctx: false,
                        flag: false,
                        prevX: 0,
                        currX: 0,
                        prevY: 0,
                        currY: 0,
                        dotFlag: false,
                        w:0,
                        h:0,
                        color: "black",
                        lWidth:3
                }
        }
        findxy(res,e){
               var currX = this.state.currX;
               var currY = this.state.currY;
               var canvas = this.refs.canvas; 
        
               if (res == 'down') {
                    this.setState({
                            prevX:currX
                    });
                    this.setState({
                            prevY:currY
                    });
                    this.setState({
                            currX: e.clientX - canvas.offsetLeft
                    });
                    this.setState({
                            currY: e.clientY - canvas.offsetTop
                    });
                    this.setState({
                            flag: true
                    });
                    this.setState({
                            dotFlag: true
                    });

                    if (this.dotFlag) {
                        var ctx = this.state.ctx;
                        ctx.beginPath();
                        ctx.fillStyle = this.state.color;
                        ctx.fillRect(this.state.currX, this.state.currY, 2, 2);
                        ctx.closePath();
                        this.setState({
                              dotFlag: true
                         });
                    }
                }
                if (res == 'up' || res == "out") {
                    this.setState({
                            flag: false
                    });
                }
                if (res == 'move') {
                    if (this.state.flag) {
                            this.setState({
                                    prevX:currX
                            });
                            this.setState({
                                    prevY:currY
                            });
                            this.setState({
                                    currX: e.clientX - canvas.offsetLeft
                            });
                            this.setState({
                                    currY: e.clientY - canvas.offsetTop
                            });
                            this.draw();
                    }
                }
        }
        componentDidMount() {
                this.initCanvas();
        }
        draw() {
                var ctx = this.state.ctx;
                ctx.beginPath();
                ctx.moveTo(this.state.prevX, this.state.prevY);
                ctx.lineTo(this.state.currX, this.state.currY);
                ctx.strokeStyle = this.state.color;
                ctx.lineWidth = this.state.lwidth;
                ctx.stroke();
                ctx.closePath();
        }    
        clear() {
                var m = confirm("Clear?");
                if(m){
                        ctx.clearRect(0,0,this.state.w,this.state.h);
                }
        }
        initCanvas() {
                        var can = this.refs.canvas; 

                        can.addEventListener("mousemove", (e) => {
                          this.findxy('move', e)
                        }, false);
                        can.addEventListener("mousedown", (e) => {
                            this.findxy('down', e)
                        }, false);
                        can.addEventListener("mouseup", (e) => {
                            this.findxy('up', e)
                        }, false);
                        can.addEventListener("mouseout", (e) => {
                            this.findxy('out', e)
                        }, false);

                        this.setState({
                                canvas: can 
                        });
                        this.setState({
                                ctx: can.getContext("2d")
                        });
                        this.setState({
                                w: can.width
                        });
                        this.setState({
                                h: can.height
                        });
        }
        render() {
                return (
                        <canvas ref="canvas" width={800} height={600}/>
                );
        }
};
export default Canvas;
