
/**
 * Created by wangjuan5 on 2017/5/18.
 */
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("myCanvas0");
if (!canvas.getContext) {
//        return;
}
canvas.width = 1200;
canvas.height = 600;

var ctx = canvas.getContext("2d");

var fwx = -1,
    fwy = -1,
    currFW = null,
    currBallIndex = -1,
    drawCount = 0,
    allDrawCount = 40,
    width = canvas.width,
    height = canvas.height;

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getRandom(minNum, maxNum) {
    var iChoices = maxNum - minNum + 1;
    return Math.floor(Math.random() * iChoices + minNum);
}

function drawLine(span) {
    if (currFW && currBallIndex !== -1) {
        if (drawCount <= allDrawCount) {
            ctx.save();
            drawCount++;
            for (var i = 0, j = currFW.balls.length; i < j; i++) {
                var currBall = currFW.balls[i],
                    beginPoint = currBall.currPosition(),
                    endPoint = currBall.nextPosition();
                if (beginPoint && endPoint) {
//                        console.log(currBallIndex, drawCount, currBall, beginPoint, endPoint);
                    ctx.beginPath();
                    ctx.moveTo(currBall.bx, currBall.by);
                    ctx.lineTo(beginPoint.x, beginPoint.y);
                    ctx.strokeStyle = "#1b242b";
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(beginPoint.x, beginPoint.y);
                    ctx.lineTo(endPoint.x, endPoint.y);
                    var r = getRandom(0, 255);
                    var g = getRandom(0, 255);
                    var b = getRandom(0, 255);
                    ctx.strokeStyle = rgbToHex(r, g, b);
                    ctx.stroke();
                } else {
                    canvas.width = 1200;
                    canvas.height = 600;
                }
            }
            currBallIndex++;
            currBallIndex %= currFW.balls.length;
            ctx.restore();
        } else {
            ctx.clearRect(0, 0, width, height);
            currFW = new FireWork();
            currFW.run();
        }
    }
    requestAnimationFrame(drawLine);
}

function FireWork() {
    this.x = -1;
    this.y = -1;
    this.balls = [];
}

FireWork.prototype = {
    init: function () {
        this.x = getRandom(200, width - 200);
        this.y = getRandom(200, height - 200);
        fwx = this.x;
        fwy = this.y;
        this.createBalls();
        drawCount = 0;
        currBallIndex = 0;
    },
    run: function () {
        this.init();
    },
    createBalls: function () {
        for (var i = 0; i < 300; i++) {
            var angle = Math.random() * Math.PI * 2,
                radius = getRandom(50, 200);
            this.balls.push(new Ball(fwx, fwy, fwx + Math.cos(angle) * radius, fwy + Math.sin(angle) * radius));
        }
    }
}

function Ball(bx, by, ex, ey) {
    this.bx = bx;
    this.by = by;
    this.ex = ex;
    this.ey = ey;
}

Ball.prototype = {
    getSpan: function () {
        var xSpan = (this.ex - this.bx) / allDrawCount,
            ySpan = (this.ey - this.by) / allDrawCount;
        return {
            x: xSpan,
            y: ySpan
        };
    },
    currPosition: function () {
        var span = this.getSpan(),
            currX = -1,
            currY = -1;
        if (drawCount < allDrawCount) {
            currX = this.bx + span.x * (drawCount - 1);
            currY = this.by + span.y * (drawCount - 1);
            return {
                x: currX,
                y: currY
            };
        }
        return null;
    },
    nextPosition: function () {
        var span = this.getSpan(),
            currX = -1,
            currY = -1;
        if (drawCount < allDrawCount) {
            currX = this.bx + span.x * drawCount;
            currY = this.by + span.y * drawCount;
            return {
                x: currX,
                y: currY
            };
        }
        return null;
    }
}

currFW = new FireWork();
currFW.run();
requestAnimationFrame(drawLine);