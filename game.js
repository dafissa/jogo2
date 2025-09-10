class Game {
     // cria a instância do jogo
    constructor () {
            // obtem o elemento <canvas> e seu contexto 2d pra desenhar
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');

        // define a largura e altura do canvas
    this.width = this.canvas.width;
    this.height = this.canvas.height;

          // configuração dos blocos (grade)
    this.brickRowCount = 2;
    this.brickColumnCount = 6;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.brick = [];

    //o nivel que vc começa (atual)
    this.level = 1;

    // config. da bola
    this.baseSpeed = 1.5;
    this.ballRadius = 10;
    this.ballDX = this.baseSpeed;
    this.ballDY = -this.baseSpeed;
    this.ballX = this.width / 2;
    this.ballY = this.height - 30;

    // config. da barra
    this.paddleHeight = 10;
    this.paddleWidth = 100;
    this.paddlex = (this.Width - this.paddleWidth) / 2;
    this.rightPressed = false;
    this.leftPressed = false;
    
    // pontuação e recorde
    this.score = 0; // pontos do jogador
    this.totalBricks = 0; // total de blocos da fase atual
    this.highScore = parseInt(localStorage.getItem("arkanoidHighScore")) || 0;

    //estado do jogo
    this.gameOver = false;

    //eventos do teclado: seta direita/esquerda para mover a barra
    document.addEventListener("keydown", (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") this.rightPressed = true;
        if (e.key === "Left" || e.key === "ArrowLeft") this.leftPressed = true;
    });
    document.addEventListener("keyup", (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") this.rightPressed = false;
        if (e.key === "Left" || e.key === "ArrowLeft") this.leftPressed = false;
    });

    // inicializa a grade de blocos
    this.createBricks();
}

//cria a matriz de blocos atuais
//inlcui blocos normais, bonus (vermelhos) e azuos a cada dois niveis
createBricks() {
    this.bricks = [];
    this.totalBricks = 0;
    let isBlueCreated = false;

    for (let c = 0; c < this.brickColumnCount; c++) {
        this.bricks[c] = [];
        for (let r = 0; r < this.brickRowCount; r++) {
            let brickType = "normal";
            if (Math.random() < 0.2) {
                brickType = "bonus"}
             ...
            }
checkBrickCollisons() {
     for (let c = 0; c < this.brickColumnCount; c++) {
          for (let r = 0; r < this.brickRowCount; r++) {
               const b = this.bricks[c][r];
               if (b.status === 1 &&
                  this.ballX > b.x && this.ballX < b.x + this.brickWidth &&
                  this.ballY > b.y && this.ballY < b.y + this.brickHeight) {
                    //inverte direção vetical da bola
                    this.ballDY = -this.ballDY;
                    b.status = 0; //marca bloco como destruido

                   //pontua conforme o tipo de bloco
                    if (b.type === "bonus") this.score += 10;
                    else if (b.type === "blue") {
                         this.score += 15;
                         this.increaseSpeed(1.5); //aumenta velocidade em 50%
                    } else this.score += 1;

                    this.totalBricks--;
                    //se todos destruidos, passa de fase
                    if (this.totalBricks === 0) {
                         this.level++;
                         this.createBricks(); //recria blocos
                         }
                    }
               }
          }
     }

     /**
     * aumenta a velocidade da bola pelo fator indicado.
     * @param {number} factor //multiplicador da velocidade (padrão 1.5)
     */
     increaseSpeed(factor = 5) {
          this.ballDX *= factor;
          this.ballDY *= factor;
     }

     //loop principal do jogo: atualiza fisica, desemha tudo e repete

     update() {
          //se fim de jogo, exibe tela e interrompe
          if (this.gameOver) {
               this.drawGameOver();
               return;
          }

     //limpa canvas
     this.ctx.clearReact(0, 0, this.width, this.height);
     //desenha elementos
     this.drawBricks();
     this.drawBall();
     this.drawPaddle();
     this.drawScore();
     //processa colisões
     this.checkBrickCollisons();

     
}

