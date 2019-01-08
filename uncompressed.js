canvas = c;
ctx = canvas.getContext('2d');

class Star {
    constructor(context) {
        this.context = context;
        this.draw(155, 50, 5, 3, 7);
    }

    draw(cx, cy, spikes, outerRadius, innerRadius) {
        var rot = Math.PI / 2 * 3;
        var x = cx;
        var y = cy;
        var step = Math.PI / spikes;
    
        this.context.strokeSyle = "#000";
        this.context.beginPath();
        this.context.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.context.lineTo(x, y)
            rot += step
    
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.context.lineTo(x, y)
            rot += step
        }

        this.context.lineTo(cx, cy - outerRadius)
        this.context.closePath();
        this.context.lineWidth=5;
        this.context.strokeStyle='#CAFBFD';
        this.context.stroke();
    }

    move(x, y) {
        this.draw(x, y, 5, 3, 7);
    }
}


class Tree {
    constructor(width, color, star) {
        this.width = width;
        this.color = color;
        this.star = star;

        this.distancePerPoint = 4;
        this.drawFPS          = 60;

        this.orig = document.querySelector('path');
        this.points;
        this.canvas = canvas;
        this.ctx = ctx;

        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;

        this.startDrawingPath();
    }


    startDrawingPath(){
        this.points = [];
        this.ctx.lineWidth = this.width;
        this.ctx.strokeStyle = this.color;
        this.buildPath();
    }

    buildPath(){
        var nextPoint = this.points.length * this.distancePerPoint;
        var pathLength = this.orig.getTotalLength();
        if (nextPoint <= pathLength){
            this.points.push(this.orig.getPointAtLength(nextPoint));
            this.redrawCanvas();
        } else {
            this.star.move(155, 50);
        }
        
        requestAnimationFrame(this.buildPath.bind(this));
    }

    redrawCanvas(){
        this.clearCanvas();
        this.drawBG();
        this.ctx.beginPath();
        this.ctx.moveTo(this.points[0].x,this.points[0].y);
        for (let i=1; i < this.points.length; i++) this.ctx.lineTo(this.points[i].x, this.points[i].y);
        this.ctx.stroke();
    }

    clearCanvas(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    drawBG() {
        this.ctx.fillStyle = "#09074E";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


new Tree(4, '#CAFBFD', new Star(ctx));
