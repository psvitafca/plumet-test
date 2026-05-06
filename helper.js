// conecta o canvas do HTML ao codigo JavaScript
const canvas = document.getElementById("gameCanvas");

// pega a ferramenta de desenho 2D do canvas
const ctx = canvas.getContext("2d");

// cria um objeto para guardar as teclas pressionadas
const keys = {};

// quando uma tecla for pressionada, marca ela como true
document.addEventListener("keydown", function(event) {
  keys[event.key] = true;
});

// quando uma tecla for solta, marca ela como false
document.addEventListener("keyup", function(event) {
  keys[event.key] = false;
});

// pinta a tela inteira com uma cor
function clearScreen(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// desenha um retangulo com posicao, tamanho e cor especificados
function drawRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// escreve um texto com posicao, tamanho e cor especificados
function drawText(text, x, y, size, color) {
  ctx.fillStyle = color;
  ctx.font = size + "px Arial";
  ctx.fillText(text, x, y);
}

// testa colisao entre dois retangulos
function isColliding(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

// sorteia um numero inteiro entre 0 e o limite informado
function random(limit) {
  return Math.floor(Math.random() * limit);
}