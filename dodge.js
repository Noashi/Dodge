var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
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

//ボールを描画する関数
function drawArc() {
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
draw();
