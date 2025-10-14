// global variables
var navHeight = screen.availHeight;
var navWidth = screen.availWidth;
var gameWidth = 1100;
var gameHeight = 720;
var interval;
var startInt;

// sprite total dimension
var width = 1072;
var height = 102;

// sprite rows and columns
var rows = 1;
var cols = 4;

// single sprite dimensions
var spriteWidth = width / cols;
var spriteHeight = height / rows;

// x and y of sprite on canvas
var canvasX = 0;
var canvasY = 0;

// x and y of sprite on sprite sheet
var spriteX = 0;
var spriteY = 0;

var livesImg = document.getElementById("livesImage");

// lives canvas image width and height
livesImg.width = 300;
livesImg.height = 152;

// context of canvas
var context = livesImg.getContext("2d");

// create image object for the lives sprite
var lives = new Image();

// source of the sprite image file
lives.src = "images/sprite_lifebar.png";

// score label + set starting score of 0
var score = document.getElementById("scoreLabel");
var newGame = false;
var isGameOver = false;
var newLoad = false;

var buttonWidth = 300;
var buttonHeight = 75;

// Game canvas variables
var gameCanvas = document.getElementById("gameCanvas");
var gameCtx = gameCanvas.getContext("2d");

gameCanvas.width = 1066;
gameCanvas.height = 682;
buttonLeft = ((gameCanvas.width - buttonWidth) / 2);
buttonTop = ((gameCanvas.height - buttonHeight) - 50);

// starting animation whe game launches
function startAnim() {
var screenDiv = document.getElementById("splashScreen");
var screen1 = document.getElementById("splash01");

screenDiv.style.width = "100%";
screenDiv.style.height = navHeight - 121 + "px";

screen1.style.width = "1100px";
screen1.style.height = "720px";
screen1.width = gameWidth;
screen1.height = gameHeight;

var winLeft = ((navWidth - gameWidth) / 2);
var winTop = ((navHeight - gameHeight) / 3);

var btn = document.getElementById("startButton");


let anim = anime.timeline({});

anim.add({
    targets: btn,
    keyframes: [
        {translateX: buttonLeft, translateY: buttonTop, duration: 1}
    ]
})
.add({
    targets: '#splash01',
    keyframes: [
        {translateX: 0, duration: 1, opacity: 0},
        {translateY: winTop, duration: 1, opacity: 0},
        {translateX: winLeft, duration: 2500, opacity: 1.0}
    ],
    duration: 2502,
    easing: 'easeOutBounce'
})
.add({
    targets: btn,
    keyframes: [
        {opacity: 1.0, duration: 1000}
    ],
    duration: 1000,
    easing: 'easeOutQuart',
    complete: function(){
        startInt = setInterval(function(){
            anime({
                targets: "#startButton",
                keyframes: [
                    {translateX: buttonLeft + 5, duration: 50},
                    {translateX: buttonLeft - 5, duration: 50},
                    {translateX: buttonLeft, duration: 50}
                ],
                loop: 5,
                duration: 2000,
                easing: 'linear'
            });
    }, 1000);
    }
});
}

function startGame() {
    var bg = document.getElementById("splash01");
    var startBtn = document.getElementById("startButton");
    var texts = document.getElementById("texts");
    
    if (isGameOver) {
        livesFlash.pause();
        livesImg.style.opacity = "1";
        reset();
        score.textContent = 0;
        livesCount = 3;
        spriteX = 0;
    } else if (!isGameOver) {
        reset();
    }

    if (newGame) {
        let gameAnim = anime.timeline({});

        gameAnim.add({
            targets: texts,
            keyframes: [
                {opacity: 0, duration: 500}
            ],
            easing: 'easeOutQuart',
            duration: 500
        })
        .add({
            targets: startBtn,
            keyframes: [
                {opacity: 0, duration: 500}
            ],
            duration: 500,
            easing: 'easeOutQuart'
        })
        .add({
            targets: gameCanvas,
            keyframes: [
                {opacity: 0, duration: 500}
            ],
            easing: 'easeOutQuart',
            duration: 500,
            complete: function() {
                texts.style.display = "none";
                startBtn.style.display = "none";
                gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
            }
        });
        loadingScreen();
    } else {
        anime({
            targets: startBtn,
            keyframes: [
                {opacity: 0, duration: 500}
            ],
            duration: 500,
            easing: 'easeOutQuart',
            update: function() {
                setTimeout(function() {
                    bg.style.transition = "ease-in 1.25s";
                    bg.style.backgroundImage = "url(\"images/bg_level1.png\")";
                }, 500)
            },
            complete: function() {
                clearInterval(startInt);
                startBtn.style.display = "none";
                loadingScreen();
            }
        });
    }
}

function loadingScreen() {
    var loadingDiv = document.getElementById("loading");
    var loadingBar = document.getElementById("loadingBar");
    var loadingLabel = document.getElementById("loadingLabel");
    var splashScreen = document.getElementById("splash01");
    var loadSegments = document.querySelectorAll("#loadingBar .segment");

    loadingBar.width = 300;
    loadingBar.height = 35;
    loadingLabel.width = 122;

    var winLeft = ((splashScreen.width - loadingBar.width) / 2);
    var winTop = ((splashScreen.height - loadingBar.height) / 2);

    var labelLeft = ((loadingBar.width - loadingLabel.width) / 2);

    if (newLoad) {
        for (var s=0; s<loadSegments.length; s++) {
            loadSegments[s].style.width = "0px";
        }
        newGame = false;
        isGameOver = false;
        scoreCnt = 0;
    }

    let loadAnim = anime.timeline({});

    let labelAnim = anime({
        targets: loadingLabel,
        autoplay: false,
        keyframes: [
            {opacity: 0.5, duration: 250},
            {opacity: 1, duration: 250}
        ],
        loop: 8,
        easing: 'linear'
    });

    loadAnim.add({
        targets: gameCanvas,
        keyframes: [
            {opacity: 1, duration: 1000}
        ],
        easing: 'easeOutQuart',
        duration: 1000
    })
    .add({
        targets: loadingDiv,
        keyframes: [
            {delay: 1500, translateX: winLeft, translateY: winTop, duration: 1}
        ],
        duration: 1501
    })
    .add({
        targets: loadingLabel,
        keyframes: [
            {translateX: labelLeft, duration: 1}
        ],
        duration: 1
    })
    .add({
        targets: loadingDiv,
        keyframes: [
            {opacity: 1, duration: 500}
        ],
        easing: 'linear',
        duration: 500,
        update: function(){
            loadingDiv.style.display = "block";
        },
        complete: function() {
            labelAnim.play();
        }
    })
    .add({
        targets: '.segment',
        delay: 500,
        width: 37.5,
        duration: 1000,
        easing: 'linear',
        endDelay: 500,
    })
    .add({
        targets: loadingDiv,
        keyframes: [
            {opacity: 0, duration: 500}
        ],
        easing: 'linear',
        duration: 500,
        complete: function(){
            loadingDiv.style.display = "none";
            gameCanvas.style.opacity = "1.0";
            gameAccessories();
            drawGameCanvas();
            createBricks();
            
            interval = setInterval(draw, 5);
        }
    });
    
}

function gameAccessories() {
    var accessoriesTab = document.getElementById("gameAccessories");
    var winWidth = (navWidth * 0.18);
    var winBottom = (gameHeight - ((navHeight - gameHeight) / 4));
    var winRight = (((navWidth - gameWidth) / 2) - winWidth) * 0.7;

    let accessoriesAnim = anime.timeline({});

    if (!newLoad) {
        accessoriesAnim.add({
            targets: accessoriesTab,
            keyframes: [
                {translateX: -winRight, duration: 1},
                {translateY: -winBottom, duration: 1},
                {opacity: 1, duration: 1000}
            ],
            duration: 2,
            update: function(){
                accessoriesTab.style.display = "block";
                score.textContent = 0;
            }
        });
    }

    drawLives();
}

function drawGameCanvas() {
// center game on background
const GAME_LEFT = ((gameWidth - gameCanvas.width) / 2);
const GAME_TOP = ((gameHeight - gameCanvas.height) / 2);
let gameAnim = anime({
    targets: gameCanvas,
    keyframes: [
        {translateX: GAME_LEFT, duration: 1},
        {translateY: GAME_TOP, duration: 1}
    ],
    easing: 'linear',
    duration: 502,
    complete: function() {
        gameCanvas.style.display = "block";
    }
});
}

let livesFlash = anime({
    targets: livesImg,
    autoplay: false,
    keyframes: [
        {opacity: 1, duration: 100},
        {opacity: 0.25, duration: 100}
    ],
    loop: true,
    duration: 200
});

var livesCount = 3;
// draw lives
function drawLives() {
    context.drawImage(lives, spriteX, spriteY, spriteWidth, spriteHeight, 0,
        25, spriteWidth, spriteHeight);
}

// variables for paddle
const PADDLE_WIDTH = 115;
const PADDLE_HEIGHT = 20;
const BOTTOM_OFFSET = 20;
var paddleX = ((gameCanvas.width - PADDLE_WIDTH) / 2);
var paddleY = gameCanvas.height - PADDLE_HEIGHT;
var PADDLE = new Image();
PADDLE.src = "images/paddle.png";
var keyPresses = {};
var isMoving = false;
var atStart = true;
var mouseMovement = {};

function drawPaddle() {
    gameCtx.drawImage(PADDLE, paddleX, paddleY);
}

const BALL_SIZE = 28;
var ballX = ((gameCanvas.width - BALL_SIZE) / 2);
var ballY = (gameCanvas.height - PADDLE_HEIGHT - BALL_SIZE);
var BALL = new Image();
BALL.src = "images/ball3.png";
var spacePressed = {};
const SPACE = " ";

var dx = 2;
var dy = -2;

function drawBall() {
    gameCtx.drawImage(BALL, ballX, ballY);
}

// bricks variables
const BRICK_SPRITE_WIDTH = 820;
const BRICK_SPRITE_HEIGHT = 32;
const SPRITE_ROWS = 1;
const SPRITE_COLUMN = 10;
const BRICK_WIDTH = BRICK_SPRITE_WIDTH / SPRITE_COLUMN;
const BRICK_HEIGHT = BRICK_SPRITE_HEIGHT;
const BRICKS_COLUMN_COUNT = gameCanvas.width / BRICK_WIDTH;
const BRICKS_ROW_COUNT = 5;
var brickSpriteX = 0;

var bricks = [];

let brickLevel12 = new Image();
brickLevel12.src = "images/sprite_bricks.png";

let successImg = new Image();
successImg.src = "images/success.png";

let redEyes = new Image();
redEyes.src = "images/redeyes.png";
redEyes.width = 774;
redEyes.height = 294;

let laugh = new Image();
laugh.src = "images/laugh.png";
laugh.width = 518;
laugh.height = 332.50;

function createBricks() {
    // add bricks x/y & active status
    for (var col=0; col<BRICKS_COLUMN_COUNT; col++) {
        bricks[col] = [];
        for (var row=0; row<BRICKS_ROW_COUNT; row++) {
            bricks[col][row] = {x: 0, y: 0, active: 1, hits: 0};
        }
    }
}


var brickCount = 0;
var gameImage = document.getElementById("splash01");
var success = false;

// draw actual bricks
function drawBricks() {

    for (var row=0; row<BRICKS_ROW_COUNT; row++) {
        for (var col=0; col<BRICKS_COLUMN_COUNT; col++) {
            var b = bricks[col][row];
            var brickX = col * BRICK_WIDTH;
            var brickY = row * BRICK_HEIGHT;
            b.x = brickX;
            b.y = brickY;
            if (brickSpriteX === 2) {
                b.color = "red";
            } else if (brickSpriteX === 9) {
                b.color = "black";
            }
            if (brickSpriteX === 10) {
                brickSpriteX = 0;
            }
            gameCtx.drawImage(brickLevel12, brickSpriteX * BRICK_WIDTH, 0, BRICK_WIDTH, BRICK_HEIGHT,
            BRICK_WIDTH * col, BRICK_HEIGHT * row, BRICK_WIDTH, BRICK_HEIGHT);
            brickSpriteX++;
            if (row === 4 && col === 12) {
                brickSpriteX = 0;
            }
            if (b.active === 0) {
                gameCtx.clearRect(b.x, b.y, BRICK_WIDTH, BRICK_HEIGHT);
            }

            if (livesCount === 0) {
                spriteX = spriteWidth * 3;
                clearInterval(interval);
                gameOver();
            }

            if (brickCount === BRICKS_COLUMN_COUNT * BRICKS_ROW_COUNT && livesCount > 0) {
                clearInterval(interval);
                interval = null;
                startInt = null;
                reset();
                createBricks();
                brickCount = 0;
                gameSuccess();
            }
        }
    }
}
function gameOver() {

    var gameText1 = document.getElementById("gameText1");
    var btn = document.getElementById("startButton");
    var texts = document.getElementById("texts");
    texts.width = 500;
    texts.height = 100;

    var buttonH = -200;

    let gameOverAnim = anime.timeline({});
    gameText1.textContent = "GAME OVER";

    texts.style.transform = "translateX(" + ((gameCanvas.width - texts.width) /2) +
            "px) translateY(" + -(((gameCanvas.height - texts.height) /2)+ 50) + "px)";

    gameOverAnim.add({
        targets: gameCanvas,
        keyframes: [
            {opacity: 0, duration: 1000}
        ],
        easing: 'easeOutQuart',
        duration: 1000,
        complete: function() {
            texts.style.display = "block";
            gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
            gameCtx.drawImage(redEyes, 0, 0, 774, 294, 200, 100, redEyes.width -258, redEyes.height - 98);
            gameCtx.drawImage(laugh, 600, 75, laugh.width-129.5, laugh.height - 83.125);
        }
    })
    .add({
        targets: gameCanvas,
        keyframes: [
            {opacity: 0.6, duration: 500}
        ],
        easing: 'easeOutQuart',
        duration: 500
    })
    .add({
        targets: texts,
        keyframes: [
            {opacity: 1, duration: 750}
        ],
        easing: 'easeOutQuart',
        duration: 750,
        complete: function(){
            btn.style.display = "block";
        }
    })
    .add({
        targets: btn,
        keyframes: [
            {translateX: buttonLeft, translateY: buttonH, duration: 1},
            {opacity: 1, duration: 1000}
        ],
        duration: 1001,
        easing: 'easeOutQuart',
        complete: function(){
            newGame = true;
            isGameOver = true;
            newLoad = true;
        }
    });
    startInt = setInterval(() => {
        anime({
            targets: "#startButton",
            keyframes: [
                {translateX: buttonLeft + 5, duration: 50},
                {translateX: buttonLeft - 5, duration: 50},
                {translateX: buttonLeft, duration: 50}
            ],
            duration: 2000,
            easing: 'linear'
        });
}, 1000);
}

function gameSuccess() {
    var gameText1 = document.getElementById("gameText1");
    var btn = document.getElementById("startButton");
    var texts = document.getElementById("texts");
    texts.width = 500;
    texts.height = 100;

    let gameOverAnim = anime.timeline({});
    gameText1.textContent = "GAME WON";

    texts.style.transform = "translateX(" + ((gameCanvas.width - texts.width) /2) +
            "px) translateY(" + -(((gameCanvas.height - texts.height) /2) + 50) + "px)";

    gameOverAnim.add({
        targets: gameCanvas,
        keyframes: [
            {opacity: 0, duration: 1000}
        ],
        easing: 'easeOutQuart',
        duration: 1000,
        complete: function() {
            texts.style.display = "block";
            gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
            gameCtx.drawImage(successImg, 0, 0, 8000, 5363, 0, 0, gameCanvas.width, gameCanvas.height);
            gameCtx.drawImage(laugh, 500, 75, laugh.width, laugh.height);
        }
    })
    .add({
        targets: gameCanvas,
        keyframes: [
            {opacity: 0.6, duration: 500}
        ],
        easing: 'easeOutQuart',
        duration: 500
    })
    .add({
        targets: texts,
        keyframes: [
            {opacity: 1, duration: 750}
        ],
        easing: 'easeOutQuart',
        duration: 750
    });

    setTimeout(function(){
        newGame = true;
        isGameOver = false;
        newLoad = true;
        window.requestAnimationFrame(startGame);
    }, 5000);
    
}

function draw() {
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    context.clearRect(0, 0, spriteWidth, spriteHeight);
    window.requestAnimationFrame(drawBricks);
    window.requestAnimationFrame(drawPaddle);
    window.requestAnimationFrame(drawBall);
    window.requestAnimationFrame(drawLives);
    collisionDetection();

    if (livesCount === 3 || livesCount < 0) {
        spriteX = 0;
    } else if (livesCount === 2) {
        spriteX = spriteWidth;
    } else if (livesCount === 1) {
        spriteX = spriteWidth * 2;
        livesFlash.play();
    } else if (livesCount === 0) {
        spriteX = spriteWidth * 3;
        livesFlash.pause();
    }
    
    if (atStart & !isMoving) {
        ballX = paddleX + ((PADDLE_WIDTH - BALL_SIZE) / 2);
        ballY = (gameCanvas.height - PADDLE_HEIGHT - BALL_SIZE);
    }

    if (!isMoving && !atStart) {
        paddleX = paddleX;
    } else if (paddleX - 5 > 0 && keyPresses.ArrowLeft || keyPresses.a) {
        paddleX -= 5;
    } else if (paddleX < gameCanvas.width - PADDLE_WIDTH - 5 && keyPresses.ArrowRight || keyPresses.d) {
        paddleX += 5;
    }

    if (spacePressed[SPACE]) {
        atStart = false;
        ballX += dx;
        ballY += dy;
    } else if (!spacePressed[SPACE] && isMoving) {
        window.cancelAnimationFrame(drawBall);
    }

    if (ballX + BALL_SIZE + dx > gameCanvas.width) {
        dx = -dx;
    }
    if (ballX + dx < 0) {
        dx = -dx;
    }
    if (ballY + dy < 0) {
        dy = -dy;
    }
    if (ballY + dy > gameCanvas.height + BALL_SIZE) {
        reset();
        --livesCount;
        if (livesCount === 0) {

        }
    }
    if (isMoving && ballY + BALL_SIZE >= paddleY && ballX + BALL_SIZE/2 >= paddleX &&
    ballX <= paddleX + PADDLE_WIDTH) {
        dx = dx;
        dy = -dy;
    }
}

var scoreCnt = 0;

function collisionDetection() {
    for (var row=0; row<BRICKS_ROW_COUNT; row++) {
        for (var col=0; col<BRICKS_COLUMN_COUNT; col++) {
            var br = bricks[col][row];
            if (br.active === 1) {
                if (ballX + BALL_SIZE/2 > br.x && ballX < br.x + BRICK_WIDTH &&
                ballY > br.y && ballY < br.y + BRICK_HEIGHT) {
                    if (br.color === "red") {
                        if (br.hits < 3) {
                            ++br.hits;
                        } else {
                            br.active = 0;
                            var score1 = parseInt(score.textContent);
                            score1 = score1 + 10;
                            score.textContent = score1;
                            ++brickCount;
                            scoreCnt += 10;
                        }
                    } else if (br.color === "black") {
                        if (br.hits < 2) {
                            ++br.hits
                        } else {
                            br.active = 0;
                            var score1 = parseInt(score.textContent);
                            score1 = score1 + 10;
                            score.textContent = score1;
                            ++brickCount;
                            scoreCnt += 10;
                        }
                    } else {
                        br.active = 0;
                        var score1 = parseInt(score.textContent);
                        score1 = score1 + 10;
                        score.textContent = score1;
                        ++brickCount;
                        scoreCnt += 10;
                    }
                    dy = -dy;
                } else if (ballX === br.x+BRICK_WIDTH && ballY + BALL_SIZE/2 > br.y && ballY + BALL_SIZE/2 < br.y+BRICK_HEIGHT) {
                    if (br.color === "red") {
                        if (br.hits < 3) {
                            ++br.hits;
                        } else {
                            br.active = 0;
                            var score1 = parseInt(score.textContent);
                            score1 = score1 + 10;
                            score.textContent = score1;
                            ++brickCount;
                            scoreCnt += 10;
                        }
                    } else if (br.color === "black") {
                        if (br.hits < 2) {
                            ++br.hits
                        } else {
                            br.active = 0;
                            var score1 = parseInt(score.textContent);
                            score1 = score1 + 10;
                            score.textContent = score1;
                            ++brickCount;
                            scoreCnt += 10;
                        }
                    } else {
                        br.active = 0;
                        var score1 = parseInt(score.textContent);
                        score1 = score1 + 10;
                        score.textContent = score1;
                        ++brickCount;
                        scoreCnt += 10;
                    }
                    dx = 2;
                    dy = -2;
                } else if (ballX + BALL_SIZE/2 > br.x && ballX + BALL_SIZE/2 < br.x+BRICK_WIDTH &&
                ballY > br.y && ballY < br.y+BRICK_HEIGHT) {
                    if (br.color === "red") {
                        if (br.hits < 3) {
                            ++br.hits;
                        } else {
                            br.active = 0;
                            var score1 = parseInt(score.textContent);
                            score1 = score1 + 10;
                            score.textContent = score1;
                            ++brickCount;
                            scoreCnt += 10;
                        }
                    } else if (br.color === "black") {
                        if (br.hits < 2) {
                            ++br.hits
                        } else {
                            br.active = 0;
                            var score1 = parseInt(score.textContent);
                            score1 = score1 + 10;
                            score.textContent = score1;
                            ++brickCount;
                            scoreCnt += 10;
                        }
                    } else {
                        br.active = 0;
                        var score1 = parseInt(score.textContent);
                        score1 = score1 + 10;
                        score.textContent = score1;
                        ++brickCount;
                        scoreCnt += 10;
                    }
                    dx = -2;
                    dy = 2;
                } else if (ballX + BALL_SIZE === br.x && ballY + BALL_SIZE/2 > br.y &&
                ballY + BALL_SIZE/2 < br.y+BRICK_HEIGHT) {
                    if (br.color === "red") {
                        if (br.hits < 3) {
                            ++br.hits;
                        } else {
                            br.active = 0;
                            var score1 = parseInt(score.textContent);
                            score1 = score1 + 10;
                            score.textContent = score1;
                            ++brickCount;
                            scoreCnt += 10;
                        }
                    } else if (br.color === "black") {
                        if (br.hits < 2) {
                            ++br.hits
                        } else {
                            br.active = 0;
                            var score1 = parseInt(score.textContent);
                            score1 = score1 + 10;
                            score.textContent = score1;
                            ++brickCount;
                            scoreCnt += 10;
                        }
                    } else {
                        br.active = 0;
                        var score1 = parseInt(score.textContent);
                        score1 = score1 + 10;
                        score.textContent = score1;
                        ++brickCount;
                        scoreCnt += 10;
                    }
                    dx = -2;
                    dy = -2;
                } else if (ballX + BALL_SIZE/2 > br.x && ballX + BALL_SIZE/2 < br.x+BRICK_WIDTH &&
                ballY < br.y) {
                    if (br.color === "red") {
                        if (br.hits < 3) {
                            ++br.hits;
                        } else {
                            br.active = 0;
                            var score1 = parseInt(score.textContent);
                            score1 = score1 + 10;
                            score.textContent = score1;
                            ++brickCount;
                            scoreCnt += 10;
                        }
                    } else if (br.color === "black") {
                        if (br.hits < 2) {
                            ++br.hits
                        } else {
                            br.active = 0;
                            var score1 = parseInt(score.textContent);
                            score1 = score1 + 10;
                            score.textContent = score1;
                            ++brickCount;
                            scoreCnt += 10;
                        }
                    } else {
                        br.active = 0;
                        var score1 = parseInt(score.textContent);
                        score1 = score1 + 10;
                        score.textContent = score1;
                        ++brickCount;
                        scoreCnt += 10;
                    }
                    dx = 2;
                    dy = -2;
                }
                if (scoreCnt === 100) {
                    scoreCnt = 0;
                    anime({
                        targets: '#scoreLabel',
                        keyframes: [
                            {translateX: 5, duration: 50},
                            {translateX: -5, duration: 50},
                            {translateX: 0, duration: 50}
                        ],
                        loop: 10,
                        duration: 150
                    });
                }
            }
        }
    }
}

function keyUpListener(event) {
    keyPresses[event.key] = false;
}

function keyDownListener(event) {
    keyPresses[event.key] = true;
}

function spacebarDown(event) {
    if (spacePressed[SPACE] && isMoving) {
        spacePressed[event.key] = false;
        isMoving = false;
    } else if (!spacePressed[SPACE] && !isMoving) {
        spacePressed[event.key] = true;
        isMoving = true;
    }
}

function reset() {
    atStart = true;
    isMoving = false;
    spacePressed[SPACE] = false;
    dx = 2;
    dy = -2;
    paddleX = ((gameCanvas.width - PADDLE_WIDTH) / 2);
    paddleY = gameCanvas.height - PADDLE_HEIGHT;
}


if (window.addEventListener) {
    window.addEventListener("load", startAnim, false);
    window.addEventListener("keydown", keyDownListener, false);
    window.addEventListener("keyup", keyUpListener, false);
    window.addEventListener("keypress", spacebarDown, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", startAnim);
    window.attachEvent("onkeydown", keyDownListener);
    window.attachEvent("onkeyup", keyUpListener);
    window.attachEvent("onkeypress", spacebarDown);
}