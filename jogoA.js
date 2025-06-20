class Game {
    constructor () {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.brickRowCount = 2;
    this.brickColumnCount = 6;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.brick = [];

    this.level = 1;

    this.baseSpeed = 1.5;
    this.ballRadius = 10;
    this.ballDX = this.baseSpeed;
    this.ballDY = -this.baseSpeed;
    this.ballX = this.width / 2;
    this.ballY = this.height - 30;

    this.paddleHeight = 10;
    this.paddleWidth = 100;
    this.paddlex = (this.Width - this.paddleWidth) / 2;
    this.rightPressed = false;
    this.leftPressed = false;
    
    this.score = 0;
    this.totalBricks = 0;
    this.highScore = parseInt(localStorage.getItem("arkanoidHighScore")) || 0;

    this.gameOver = false;

    document.addEventListener("keydown", (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") this.rightPressed = true;
        if (e.key === "Left" || e.key === "ArrowLeft") this.leftPressed = true;
    });
    document.addEventListener("keyup", (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") this.rightPressed = false;
        if (e.key === "Left" || e.key === "ArrowLeft") this.leftPressed = false;
    });

    this.createBricks();
    }


}