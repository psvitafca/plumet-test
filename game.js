// cria o jogador
const player = {
  x: 390,
  y: 100,
  w: 30,
  h: 50,
  speedX: 6,
  speedY: 4,
  color: "orange"
};

// define quantas plataformas vao existir
const platformCount = 8;

// cria uma lista vazia de plataformas
const platforms = [];

// cria uma lista de cores para as plataformas
const colors = ["red", "green", "blue", "yellow"];

// controla se o jogo acabou
let gameOver = false;

// cria as plataformas automaticamente
for (let i = 0; i < platformCount; i++) {
  platforms.push({
    x: random(canvas.width - 180),
    y: canvas.height + i * 75,
    w: 180,
    h: 20,
    speed: 2,
    color: colors[random(colors.length)]
  });
}

// atualiza a queda do jogador
function updatePlayerFall() {
  let onPlatform = false;

  for (let p of platforms) {
    if (isColliding(player, p)) {
      player.y = p.y - player.h;
      onPlatform = true;
      break;
    }
  }

  if (!onPlatform) {
    player.y += player.speedY;
  }
}

// verifica se o jogador saiu da tela
function checkGameOver() {
  if (player.y > canvas.height || player.y + player.h < 0) {
    gameOver = true;
  }
}

// desenha a tela de game over
function drawGameOver() {
  clearScreen("red");

  drawText("GAME OVER", 100, 300, 100, "black");
}

// atualiza a logica do jogo
function update() {

  if (gameOver) {
    return;
  }
  
  if (keys["ArrowLeft"]) {
    player.x -= player.speedX;
  }

  if (keys["ArrowRight"]) {
    player.x += player.speedX;
  }

  // impede o jogador de sair pelas laterais
  if (player.x < 0) {
    player.x = 0;
  }

  if (player.x + player.w > canvas.width) {
    player.x = canvas.width - player.w;
  }

  // atualiza todas as plataformas
  for (let p of platforms) {
    // faz a plataforma subir
    p.y -= p.speed;

    // se a plataforma sair pelo topo, volta para baixo
    if (p.y + p.h < 0)
    {
      p.y = canvas.height;
      p.x = random(canvas.width - p.w);
      p.color = colors[random(colors.length)];
    }
  }

  // atualiza a queda do jogador
  updatePlayerFall();	
  
  // verifica se o jogo acabou
  checkGameOver();  
}

// desenha o jogo na tela
function draw() {
	
  if (gameOver) {
    drawGameOver();
    return;
  }
  
  clearScreen("black");

  drawRect(player.x, player.y, player.w, player.h, player.color);

  // desenha todas as plataformas
  for (let p of platforms) 
  {
    drawRect(p.x, p.y, p.w, p.h, p.color);
  }
}

// cria o loop principal do jogo
function loop() {
  update();
  draw();

  requestAnimationFrame(loop);
}

// inicia o loop do jogo
loop();