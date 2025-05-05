let video;
let handPose;
let hands = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handPose = ml5.handpose(video, modelReady); // 正確初始化
  handPose.on("predict", gotHands); // 設定偵測結果回傳函式
}

function modelReady() {
  console.log("Handpose model ready!");
}

function gotHands(results) {
  hands = results;
}

function draw() {
  image(video, 0, 0);

  if (hands.length > 0) {
    for (let hand of hands) {
      for (let i = 0; i < hand.landmarks.length; i++) {
        let [x, y, z] = hand.landmarks[i]; // landmark 是 [x,y,z] 陣列
        fill(0, 255, 0);
        noStroke();
        circle(x, y, 10);
      }
    }
  }
}

function mousePressed() {
  console.log(hands);
}
