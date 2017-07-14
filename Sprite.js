function Sprite(){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.SIZE = 16;
  this.color = "rgba(0,0,0,0.3)";
  this.pose = 0;
  this.frame = 0;
  this.poses = [
    {row: 11, col:1, frames:8, v: 4},
    {row: 10, col:1, frames:8, v: 4},
    {row: 9, col:1, frames:8, v: 4},
    {row: 8, col:1, frames:8, v: 4},
    {row: 11, col:0, frames:1, v: 4},
  ];
  this.images = null;
  this.imgKey = "pc";
}

Sprite.prototype.desenhar = function (ctx) {
  this.desenharQuadrado(ctx);
  this.desenharPose(ctx);
}

Sprite.prototype.desenharQuadrado = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.fillRect(-5,-5,10,10);
  ctx.fill();
  ctx.closePath;
  ctx.restore();
};

Sprite.prototype.desenharPose = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  this.images.drawFrame(ctx,
    this.imgKey,
    this.poses[this.pose].row,
    Math.floor(this.frame),
    -32,-56, 64
  );
  ctx.restore();
};

Sprite.prototype.localizacao = function(map){
  this.gx = Math.floor(this.x/map.SIZE);
  this.gy = Math.floor(this.y/map.SIZE);
}

Sprite.prototype.sentirArea = function(ctx, map){
  this.gx = Math.floor(this.x/map.SIZE);
  this.gy = Math.floor(this.y/map.SIZE);

  // -- Minas --

  if(map.cells[this.gy-1][this.gx] == 5){//top
    map.minasQtd++;
  }
  if(map.cells[this.gy+1][this.gx] == 5){//bottom
    map.minasQtd++;    
  }  
  if(map.cells[this.gy][this.gx+1] == 5){//right
    map.minasQtd++;  
  }
  if(map.cells[this.gy][this.gx-1] == 5){//left
    map.minasQtd++;  
  }
  if(map.cells[this.gy-1][this.gx+1] == 5){//top-right
    map.minasQtd++;  
  }
  if(map.cells[this.gy+1][this.gx+1] == 5){//bottom-right
    map.minasQtd++;  
  }
  if(map.cells[this.gy-1][this.gx-1] == 5){//top-left
    map.minasQtd++;  
  }
  if(map.cells[this.gy+1][this.gx-1] == 5){//bottom-left
    map.minasQtd++;  
  } 

  // -- Tesouros --

  if(map.cells[this.gy-1][this.gx] == 4){//cima
    map.tesourosQtd++;
  }
  if(map.cells[this.gy+1][this.gx] == 4){//baixo
    map.tesourosQtd++;
  }  
  if(map.cells[this.gy][this.gx+1] == 4){//direita
    map.tesourosQtd++;  
  }
  if(map.cells[this.gy][this.gx-1] == 4){//esquerda
    map.tesourosQtd++;  
  }
  if(map.cells[this.gy-1][this.gx+1] == 4){//cima-direita
    map.tesourosQtd++;  
  }
  if(map.cells[this.gy+1][this.gx+1] == 4){//baixo-direita
    map.tesourosQtd++;  
  }
  if(map.cells[this.gy-1][this.gx-1] == 4){//cima-esquerda
    map.tesourosQtd++;  
  }
  if(map.cells[this.gy+1][this.gx-1] == 4){//baixo-esquerda
    map.tesourosQtd++;
  }

}

Sprite.prototype.mover = function (map, dt) {
  this.gx = Math.floor(this.x/map.SIZE);
  this.gy = Math.floor(this.y/map.SIZE);
  if(this.vx>0 && map.cells[this.gy][this.gx+1]==1){
    this.x += Math.min((this.gx+1)*map.SIZE - (this.x+this.SIZE/2),this.vx*dt);
  } else if(this.vx <0 && map.cells[this.gy][this.gx-1]==1){
      this.x += Math.max((this.gx)*map.SIZE - (this.x-this.SIZE/2),this.vx*dt);
    }
  else {
    this.x = this.x + this.vx*dt;
  }
  if(this.vy >0 && map.cells[this.gy+1][this.gx]==1){
    this.y += Math.min((this.gy+1)*map.SIZE - (this.y+this.SIZE/2),this.vy*dt);
  } else if( this.vy<0 && map.cells[this.gy-1][this.gx]==1){
      this.y += Math.max((this.gy)*map.SIZE - (this.y-this.SIZE/2),this.vy*dt);
    }
  else {
    this.y = this.y + this.vy*dt;
  }

  // -- Clareando o caminho --

  if(map.cells[this.gy][this.gx] != 2){
    map.cells[this.gy][this.gx] = 2;
  }

  map.minasQtd = 0;
  map.tesourosQtd = 0;

  this.frame += this.poses[this.pose].v*dt;
  if(this.frame>this.poses[this.pose].frames-1){
    this.frame = 0;
  }
};

Sprite.prototype.colisaoTesouro = function (ctx, map){
  this.gx = Math.floor(this.x/map.SIZE);
  this.gy = Math.floor(this.y/map.SIZE);

  if(map.cells[this.gy][this.gx] == 4){
    map.pontuacao++;
  }

}

Sprite.prototype.colisaoMina = function (ctx, map){
  this.gx = Math.floor(this.x/map.SIZE);
  this.gy = Math.floor(this.y/map.SIZE);

  if(map.cells[this.gy][this.gx] == 5){
    map.gameOver = true;
    this.vx = 0;
    this.vy = 0;
  }
}

Sprite.prototype.colidiuCom = function (alvo) {
  if(this.x + this.width/2 < alvo.x - alvo.width/2)   return false;  
  if(this.x - this.width/2 > alvo.x + alvo.width/2)   return false;  
  if(this.y + this.height/2 < alvo.y - alvo.height/2)  return false;  
  if(this.y - this.height/2 > alvo.y + alvo.height/2)  return false;  
  return true;
};

Sprite.prototype.perseguir = function (alvo) {
    var dx = alvo.x - this.x;
    var dy = alvo.y - this.y;
    var h = Math.sqrt(dx*dx+dy*dy);
    this.vx = 50*dx/h;
    this.vy = 50*dy/h;
    if(this.vy<0) this.pose = 3;
    if(this.vy>0) this.pose = 4;
    if(this.vx>0) this.pose = 0;
    if(this.vx<0) this.pose = 2;
};
