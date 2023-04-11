const score = document.querySelector(".score-btn");
const p = document.querySelector("p");
score.addEventListener("click", function() {
  if (p.style.display === "none") {
    p.style.display = "block";
  } else {
    p.style.display = "none";
  }
});


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const unit = 30;
const width = canvas.width;
const height = canvas.height;

let food = {
  x: Math.floor(Math.random() * 19 + 1) * unit,
  y: Math.floor(Math.random() * 19 + 1) * unit
};

function drawFood() {
  ctx.fillStyle = "#FF6B6C";
  ctx.fillRect(food.x, food.y, unit, unit);
}


let snakeBody = [];
snakeBody[0] = {
  x: 10 * unit,
  y: 10 * unit
};

function drawSnakeBody() {
  for (let i = 0; i < snakeBody.length; i++) {
    if (i === 0) {
      ctx.fillStyle = "#00a5cf";
    } else {
      ctx.fillStyle = "#aacc00";
    }
    ctx.fillRect(snakeBody[i].x, snakeBody[i].y, unit, unit);
    ctx.strokeRect(snakeBody[i].x, snakeBody[i].y, unit, unit);
    ctx.strokeStyle = "#00a5cf";
  }
}

let direction = null;
let point = 0;
const image = document.querySelector("img");
const start = document.querySelector(".start-btn")
start.addEventListener("click", () => {
  image.classList.add("active");
  canvas.style.display = "block";
})

  document.addEventListener("keydown", sumbitDirection);

  function sumbitDirection(e) {
    if (e && e.keyCode == 37 && direction != "right") {
      direction = "left";
    } else if (e && e.keyCode == 38 && direction != "down") {
      direction = "up";
    } else if (e && e.keyCode == 39 && direction != "left") {
      direction = "right";
    } else if (e && e.keyCode == 40 && direction != "up") {
      direction = "down";
    }
  }

  function drawSnake() {
    ctx.clearRect(0, 0, width, height);
    moveSnake();
    drawFood();
    drawSnakeBody();
  }
  
  const pause = document.querySelector(".pause-btn");
  let isPaused = false;
  
  pause.addEventListener("click", function() {
    isPaused = !isPaused;
  });

  const gameLoop = setInterval(() => {
    if (!isPaused) {
      drawSnake();
    }
  }, 200);
  

function collisionChecker(head, snakeBody, width, height ) {
  if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
    return true;
  }

  for (let i = 1; i < snakeBody.length; i++) {
    if (head.x === snakeBody[i].x && head.y === snakeBody[i].y ) {
      return true;
    }
  }

  return false;
}

const updatePoint = document.querySelector(".point span")
const finalPoint = document.querySelector(".final-socre span")
const endGame = document.querySelector(".end-game")
function moveSnake() {
  let head = {
    x: snakeBody[0].x,
    y: snakeBody[0].y
  };

  if (direction === "left") {
    head.x -= unit;
  } else if (direction === "right") {
    head.x += unit;
  } else if (direction === "up") {
    head.y -= unit;
  } else if (direction === "down") {
    head.y += unit;
  }

  if(head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * 19 + 1) * unit,
      y: Math.floor(Math.random() * 19 + 1) * unit
    };
    point += 100;
    updatePoint.textContent = point;
    finalPoint.textContent = point;

  } else {
    snakeBody.pop();
  }
  snakeBody.unshift(head);

  if (collisionChecker(head, snakeBody, width, height)) {
    clearInterval(gameLoop);
    endGame.style.display = "block";
    return;
  }
}
