function Map(rows, collumns) {
  this.SIZE = 32;
  this.minas = [];
  this.minasQtd = 0;;
  this.tesouros = [];
  this.tesourosQtd = 0;
  this.pontuacao = 0;
  this.gameOver = false;
  this.tempo = 120;
  this.victory = false;
  this.cells = [];
  for (var r = 0; r < rows; r++) {
    this.cells[r] = [];
    for (var c = 0; c < collumns; c++) {
      this.cells[r][c] = 0;
    }
  }
}

Map.prototype.desenhar = function (ctx, img) {
  
  for (var i = 0; i < this.tesouros.length; i++) {
      this.tesouros[i].desenharQuadrado(ctx);
  }

  for (var i = 0; i < this.minas.length; i++) {
      this.minas[i].desenharQuadrado(ctx);
  }

  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      if(this.cells[r][c]==1){ //parede
        ctx.fillStyle = "brown";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      if(this.cells[r][c]==3){ //não pisado
        ctx.fillStyle = "gray";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillStroke = "black";
      }
      if(this.cells[r][c] == 4){ //tesouro
        ctx.fillStyle = "gray";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillStroke = "black";
      }
      if(this.cells[r][c] == 5){ //mina
        ctx.fillStyle = "gray";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillStroke = "black";
      }
    }
  }

};

Map.prototype.showInformations = function(ctx){
  
  ctx.font="20px Verdana";
  ctx.fillStyle = "black";
  ctx.fillText("Minas: " + this.minasQtd, 0, 280);
  ctx.fillText("Tesouros: " + this.tesourosQtd, 135, 280);
  ctx.fillText("Pontos: " + this.pontuacao, 285, 280);
  
  if(!this.gameOver)
    ctx.fillText("Tempo: "+Math.floor(this.tempo), 285, 20);
  
  if(this.gameOver){
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", 285, 125);
  }

  if(this.victory){
    ctx.fillStyle = "blue";
    ctx.fillText("Vitória", 285, 225);
  }

}

Map.prototype.setCells = function (newCells) {
  for (var i = 0; i < newCells.length; i++) {
    for (var j = 0; j < newCells[i].length; j++) {
      switch (newCells[i][j]) {
        case 1:
          this.cells[i][j] = 1;
          break;
        case 2:
          this.cells[i][j] = 2;
          break;
        case 3:
          this.cells[i][j] = 3;
          break;
        case 4:
          this.cells[i][j] = 4;
          newTesouro = new Sprite();
          newTesouro.y = (i+0.5)*this.SIZE;
          newTesouro.x = (j+0.5)*this.SIZE;
          newTesouro.imgKey = "tesouro";
          newTesouro.color = "green";
          this.tesouros.push(newTesouro);
          break;
        case 5:
          this.cells[i][j] = 5;
          newMina = new Sprite();
          newMina.y = (i+0.5)*this.SIZE;
          newMina.x = (j+0.5)*this.SIZE;
          newMina.imgKey = "mina";
          newMina.color = "red";
          this.minas.push(newMina);
          break;
        default:
          this.cells[i][j] = 0;
      }
    }
  }
};

Map.prototype.tempoAcabou = function() {
  if(this.tempo < 0){
    this.gameOver = true;
  }
};

Map.prototype.vitoriaObtida = function() {
  if(this.tesouros.length == this.pontuacao){
    this.victory = true;
  }
};
