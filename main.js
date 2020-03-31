// 
// youtube スーパーマリオなんちゃら(Javascript)
// 5/19 10:20
// 


let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d"); //裏画面情報

let can = document.getElementById("can"); //HTML内の情報を呼び込める
let con = can.getContext("2d"); //画像情報を呼び込める

//ファミコンの画面サイズが以下らしい。
vcan.width  = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

can.width  = SCREEN_SIZE_W * 3;
can.height = SCREEN_SIZE_H * 3;

con.mozimageSmoothingEnabled    = false;
con.imageSmoothingEnabled       = false;
con.msimageSmoothingEnabled     = false;
con.webkitimageSmoothingEnabled = false;

//フレームレート維持
let frameCount = 0;
let startTime;

let chImg = new Image();
chImg.src = "sprite.png"; //.srcにファイル名指定するだけで読み込み始める
//chImg.onload = draw; //画像を読み込み終わった後に、onloadに入っているfunctionを呼ぶ

//キーボード
let keyb={};

//おじさんを作る
let ojisan = new Ojisan(100, 100);
// フィールドを作る
let field = new Field();



//更新処理
function update(){
	
	field.update();
	ojisan.update();
	// console.log("oji_y:" + oji_y);
	// console.log("oji_vy:" + oji_vy);
	// console.log("oji_jump:" + oji_jump);
	
}

function drawSprite(snum, x, y){
	// let sx = (sum%16)*16;

	let sx = (snum&15)<<4;
	let sy = (snum>>4)<<4;

	vcon.drawImage(chImg, sx,sy,16,32, x,y,16,32,); //左上から横16px, 縦32px を　左上からw16px, h32px に表示
}



//描画処理
function draw(){

	//画面を水色でクリア
	vcon.fillStyle="#66AAFF"; //contextに備わっているプロパティ
	vcon.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);//contextに備わっているメソッド
	
	//フィールドを追加
	field.draw();
	//おじさんを表示
	ojisan.draw();
	
	//vcon.drawImage(chImg, 0,0,16,32, oji_x>>4,oji_y>>4,16,32,); 
	//左上から横16px, 縦32px を　左上からw16px, h32px に表示
	//暇なときにでも数字をいじって動かせ。それで覚えろ

	//デバッグ情報を表示
	vcon.font="24px 'Inpact' "
	vcon.fillStyle="white"; //contextに備わっているプロパティ
	vcon.fillText("FRAME:" +frameCount, 10,20)

	//仮想画面から実画面へ拡大転送
	con.drawImage(vcan, 0,0,SCREEN_SIZE_W,SCREEN_SIZE_H, 
		0,0,SCREEN_SIZE_W * 3,SCREEN_SIZE_H * 3,);
	
}

//ブラウザがすでにループを持っているのでjsでループ書かなくてよい

// setInterval(mainLoop, 1000/60); //1秒÷60　1秒に６０回、メインループを読んでくれる
//ゲームでは ms ミリ秒をよく使う 1000ms = 1S

//ループ開始
window.onload = function(){ //htmlがロードされた後に呼ばれる内容
	startTime = performance.now();
	mainLoop();
}

function mainLoop(){ //60FPSごとに処理されます。

	let nowTime = performance.now();
	let nowFrame = (nowTime-startTime)/ GAME_FPS;

	if(nowFrame > frameCount){
		
		let c=0;
		while(nowFrame > frameCount){
			frameCount++

			update(); //更新処理
			if( ++c >= 4 ) break;
		}

		draw(); //描画処理
	}

	requestAnimationFrame(mainLoop);

}

//キーボードが押された時に呼ばれる
document.onkeydown = function(e){
	
	if(e.keyCode == 37) keyb.Left   = true;
	if(e.keyCode == 39) keyb.Right = true;
	if(e.keyCode == 90) keyb.BBUTTON = true;
	if(e.keyCode == 88) keyb.ABUTTON = true;
}

//キーボードが話された時に呼ばれる
document.onkeyup = function(e){
	
	if(e.keyCode == 37) keyb.Left  = false;
	if(e.keyCode == 39) keyb.Right = false;
	if(e.keyCode == 90) keyb.BBUTTON = false;
	if(e.keyCode == 88) keyb.ABUTTON = false;
}
