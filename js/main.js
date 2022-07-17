const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;



const player = new Player({
  position : {
    x : 100,
    y : 100
  },
  size : {
    w : 100,
    h : 100,
  },
  color : "yellow"
});

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      player.keys.w = true;
      break;
    case "a":
      player.keys.a = true;
      break;
    case "s":
      player.keys.s = true;
      break;
    case "d":
      player.keys.d = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      player.keys.w = false;
      player.velocity.y = 0;
      break;
    case "a":
      player.keys.a = false;
      player.velocity.x = 0;
      break;
    case "s":
      player.keys.s = false;
      player.velocity.y = 0;
      break;
    case "d":
      player.keys.d = false;
      player.velocity.x = 0;
      break;
  }
});

let enemies = [];

function spawnEnemies() {
  setInterval(() => {
    enemies.push(new Enemy({
      position : {
        x : canvas.width / 2,
        y : -200
      },
      size : {
        w : 50,
        h : 50,
      },
      color : "grey"
    }));
  }, 5000);
}

function updateEnemies() {
  enemies.forEach((enemy, i) => {
    enemy.update();
  });
}

let timer = 0;

function gameTime() {
  setInterval(() => {
    document.querySelector("#timer").innerHTML = "You've been alive for: " + timer + " seconds";
    timer++;
  }, 1000);
}

function gameLoop() {
  setInterval(() => {
    enemies.forEach((enemy, i) => {
      enemy.attack();
    });
  }, 500);
}

function loop() {
  ctx.drawImage(backgroundImg, 0, 0);

  player.update();

  updateEnemies();

  window.requestAnimationFrame(loop);
}

gameTime();
spawnEnemies();
gameLoop();
loop();
