var canvas;
var ctx;
var map;
var pc;
var dt;
var images;
var anterior = 0;
var frame = 0;
var i = 1;
var j = 1;

function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 520;
  canvas.height = 520;
  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  images.load("pc","pc.png");
  map = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map.images = images;
  map.setCells([
    [1,1,1,1,1,1,1,1],
    [1,2,3,3,3,3,3,1],
    [1,3,3,5,3,5,4,1],
    [1,3,4,4,3,3,3,1],
    [1,3,3,5,3,3,3,1],
    [1,3,3,3,3,5,3,1],
    [1,5,4,3,3,4,5,1],
    [1,1,1,1,1,1,1,1],
  ]);
  pc = new Sprite();
  pc.y = (i+0.5)*map.SIZE;
  pc.x = (j+0.5)*map.SIZE;
  pc.images = images;
  initControls();
  requestAnimationFrame(passo);
}

function passo(t){
  dt = (t-anterior)/1000;
  requestAnimationFrame(passo);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  pc.colisaoTesouro(ctx, map);
  pc.colisaoMina(ctx, map);
  
  if(!map.victory){ 
    map.tempo = map.tempo - dt;
  }
  
  map.vitoriaObtida();
  map.tempoAcabou();
  map.showInformations(ctx);
  pc.mover(map, dt);
  pc.sentirArea(ctx, map);
  map.desenhar(ctx, images);
  pc.desenhar(ctx);
  anterior = t;
  frame = (frame<9)?frame:1;
  frame+=2*dt;
}

function initControls(){
  addEventListener('keydown', function(e){
    switch (e.keyCode) {
      case 37:
        if(!map.gameOver && !map.victory){
          pc.vx = -100;
          pc.vy = 0;
          pc.pose = 2;
          
        } else {
          pc.vx = 0;
        }
        e.preventDefault();
        break;
      case 38:
        if(!map.gameOver && !map.victory){
          pc.vx = 0;
          pc.vy = -100;
          pc.pose = 3;
        } else{
          pc.vy = 0;
        }
        e.preventDefault();
        break;
      case 39:
        if(!map.gameOver && !map.victory){
          pc.vx = 100;
          pc.vy = 0;
          pc.pose = 0;
        } else {
          pc.vx = 0;
        }
        e.preventDefault();
        break;
      case 40:
        if(!map.gameOver && !map.victory){
          pc.vx = 0;
          pc.vy = 100;
          pc.pose = 1;
        } else {
          pc.vy = 0;
        }
          e.preventDefault();
        break;
      default:

    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {
      case 37:
        pc.vx = 0;
        pc.pose = 2;
        break;
      case 38:
        pc.vy = 0;
        pc.pose = 3;
      case 39:
        pc.vx = 0;
        pc.pose = 4;
        break;
      case 40:
        pc.vy = 0;
        pc.pose = 4;
        break;
      default:

    }
  });
}
