import React from 'react';
var fs = require('fs');
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
                this.props.savePressed(this.savecanvas(this.refs.canvas));
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
        savecanvas(canvas) {
                function save(){
                        var can = canvas; 
                        var data = can.toDataURL().replace(/^data:image\/\w+;base64,/,"");
                        var buf = Buffer.from(data,'base64');
                        var today = new Date();

                        var strDate = 'Y-M-d-h-m'
                          .replace('Y', today.getFullYear())
                          .replace('M', today.getMonth()+1)
                          .replace('d', today.getDate())
                          .replace('h', today.getHours())
                          .replace('m', today.getMinutes());


                        fs.writeFile(this.props.notedir + strDate,buf,(err) => {
                                if (err) {
                                        return console.log(err);
                                }
                                console.log("saved");
                        });
                }
                return save
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
                        const ctx = this.refs.canvas.getContext("2d");
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(0,0,can.width,can.height);
        }
        render() {
                var canvasStyle = {
                        border: "4px solid #000000"
                }
                return (
                        <canvas className={canvasStyle} ref="canvas" width={400} height={400}/>
                );
        }
};
export default Canvas;
