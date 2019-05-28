var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var startButton = document.getElementById("startButton");
//円のカラー
var arcColor = "green";
//ボールの座標（初期）
var x = canvas.width / 2;
var y = canvas.height - 30;
//ボールの半径
var ballRadius = 20;
//ボールの動く方向（初期）
var dx = 2;
var dy = -2;
//マウスの座標
var relativeX;
var relativeY;
//フラッグ
var startFlag = false;
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  relativeX = e.clientX - canvas.offsetLeft;
  relativeY = e.clientY - canvas.offsetTop;
}

//スタート処理
function start() {
  startButton.style.display = "none";
  title.style.display = "none";
  descreption.style.display = "none";
  draw();
}
function gameOver() {
  alert("GAME OVER");
  document.location.reload();
}
//衝突検出
function collisionDetection() {
  //ボール衝突
  if(x - ballRadius < relativeX && relativeX < x + ballRadius) {
    if (y - ballRadius < relativeY && relativeY < y + ballRadius) {
      gameOver();
    }
  }
  //マウスポインタが枠の外へ行く
  if(relativeX < 0 || canvas.width < relativeX) {
    gameOver();
  }
  if(relativeY < 0 || canvas.height < relativeY) {
    gameOver();
  }
}
//ボールを描画する関数
function drawArc() {
  //マウスポインタのボール
  ctx.beginPath();
  ctx.arc(relativeX, relativeY, 5, 0, Math.PI * 2, false);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  //敵のボール
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = arcColor;
  ctx.fill();
  ctx.closePath();
}

//円の色を決める関数
function coloringArc() {
  //カラーコードを生成・円の色を決める変数へ代入
  var randomColor = "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")";
  arcColor = randomColor;
  return arcColor;
}

//描画処理
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawArc();
  collisionDetection();

  //円が壁に到達したときの処理
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    //横軸に対してボールを跳ね返す
    num = Math.ceil(Math.random() * 10);
    if (dx < 0) {
      dx = num;
    } else {
      dx = -num;
    }
    //ボールの色を変える
    coloringArc();
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    //縦軸に対してボールを跳ね返す
    num = Math.ceil(Math.random() * 10);
    if (dy < 0) {
      dy = num;
    } else {
      dy = -num;
    }
    //ボールの色を変える
    coloringArc();
  }
  //ボールを動かす
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

window.onload = function() {
  //イベントハンドラ
  startButton.addEventListener("click", start, false);
};
