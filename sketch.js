let canvas;
let selectedNumber = null;
let fallBalls = [];
let maxNumberInput;
let minRangeInput, maxRangeInput, numBallsInput;
let drawButton;
let resetButton;
let backButton;

function resetDrawing() {
  fallBalls = [];
  draw();
}

function setup() {
  createCanvas(600, 600);

  // Check if the buttons and inputs exist before creating them
  if (!drawButton) {
    // "기존 뽑기" 버튼 생성
    drawButton = createButton('기존 뽑기')
      .position(10, 720)
      .mousePressed(setupDefaultDrawing)
      .style('background-color', '#4CAF50') // Green
      .style('color', 'white'); // White text
  }

  if (!resetButton) {
    // "범위 뽑기" 버튼 생성
    resetButton = createButton('범위 뽑기')
      .position(120, 720)
      .mousePressed(setupRangeDrawing)
      .style('background-color', '#f44336') // Red
      .style('color', 'white'); // White text
  }

  // 초기 그림 그리기 함수 호출
  draw();
}

function goToInitialScreen() {
  console.log("Going to the initial screen...");

  // Clear drawing data
  fallBalls = [];

  // Remove all buttons and inputs
  removeAllElements();

  // Remove the existing canvas
  if (canvas) {
    canvas.remove();
  }

  // Recreate the canvas and initial screen
  canvas = createCanvas(600, 600);

  console.log("Canvas and elements recreated.");

  // Recreate "기존 뽑기" button
  drawButton = createButton('기존 뽑기')
    .position(10, 720)
    .mousePressed(setupDefaultDrawing)
    .style('background-color', '#4CAF50') // Green
    .style('color', 'white'); // White text

  // Recreate "범위 뽑기" button
  resetButton = createButton('범위 뽑기')
    .position(120, 720)
    .mousePressed(setupRangeDrawing)
    .style('background-color', '#f44336') // Red
    .style('color', 'white'); // White text

  console.log("Buttons recreated.");

  // Redraw the initial screen without drawings
  draw();
  console.log("Initial screen redrawn.");
}



function setupDefaultDrawing() {
  // 모든 버튼 및 입력 필드 제거
  removeAllElements();
  resetDrawing();

  // 최대 수 입력 필드 및 라벨 생성 및 초기값 설정
  createElement('label', '최대 수 선택:')
    .position(10, 650)
    .style('color', 'green');

  maxNumberInput = createInput('')
    .position(150, 650)
    .attribute('placeholder', '최대 수')
    .style('color', 'green');

  // "뽑기" 버튼 생성
  drawButton = createButton('뽑기')
    .position(150, 680)
    .mousePressed(drawDefaultBall)
    .style('background-color', '#4CAF50') // Green
    .style('color', 'white'); // White text

  // "그림판 초기화" 버튼 생성
  resetButton = createButton('그림판 초기화')
    .position(270, 720)
    .mousePressed(resetCanvas)
    .style('background-color', '#008CBA') // Blue
    .style('color', 'white'); // White text

  // "처음 화면으로 돌아가기" 버튼 생성
  backButton = createButton('처음 화면으로 돌아가기')
    .position(400, 720)
    .mousePressed(goToInitialScreen)
    .style('background-color', '#008CBA') // Blue
    .style('color', 'white'); // White text

  // 초기 그림 그리기 함수 호출
  draw();

  // 뽑기 버튼 참조하여 버튼 활성화
  drawButton.removeAttribute('disabled');
}

function setupRangeDrawing() {
  // 모든 버튼 및 입력 필드 제거
  removeAllElements();
 
  background('#ffcccc'); // Light pink background

  // 최소 범위 입력 필드 및 라벨 생성 및 초기값 설정
  createElement('label', '최소 범위 선택:')
    .position(10, 620)
    .style('color', 'red'); // Red text

  minRangeInput = createInput('')
    .position(160, 620)
    .attribute('placeholder', '최소')
    .style('color', 'red');

  // 최대 범위 입력 필드 및 라벨 생성 및 초기값 설정
  createElement('label', '최대 범위 선택:')
    .position(10, 650)
    .style('color', 'red');

  maxRangeInput = createInput('')
    .position(160, 650)
    .attribute('placeholder', '최대')
    .style('color', 'red');

  // 뽑을 공의 수 입력 필드 및 라벨 생성 및 초기값 설정
  createElement('label', '뽑을 공의 갯수 선택:')
    .position(10, 680)
    .style('color', 'red');

  numBallsInput = createInput('')
    .position(160, 680)
    .attribute('placeholder', '개')
    .style('color', 'red');

  drawButton = createButton('뽑기')
    .position(160, 720)
    .mousePressed(drawRangeBall)
    .style('background-color', '#e74c3c') // Darker red
    .style('color', 'white'); // White text

  // "그림판 초기화" 버튼 생성
  resetButton = createButton('그림판 초기화')
    .position(270, 720)
    .mousePressed(resetCanvas)
    .style('background-color', '#3498db') // Blue
    .style('color', 'white'); // White text

  // "처음 화면으로 돌아가기" 버튼 생성
  backButton = createButton('처음 화면으로 돌아가기')
    .position(400, 720)
    .mousePressed(goToInitialScreen)
    .style('background-color', '#3498db') // Blue
    .style('color', 'white'); // White text

  // 추가: 범위 뽑기 버튼 클릭 시 안내 문구
  fill('#e74c3c'); // Darker red text
  textSize(20);
  textAlign(CENTER, CENTER);
  text('범위를 선택하고 "뽑기" 버튼을 눌러주세요.', width / 2, height / 2 - 40);

  // 초기 그림 그리기 함수 호출
  draw();

  // 뽑기 버튼 참조하여 버튼 활성화
  drawButton.removeAttribute('disabled');
}

function resetCanvas() {
  // 그림판 초기화
  fallBalls = [];
  // "뽑기" 버튼 활성화
  if (drawButton) {
    drawButton.removeAttribute('disabled');
  }
  // 다시 그리기
  draw();
}

function draw() {
  // Set background color to red
  background('#ffcccc'); // Light pink

  // Draw a border around the drawing area
  stroke('#333'); // Dark gray
  strokeWeight(2);
  rect(20, 20, 560, 560);

  // Draw the drawn balls in red color
  drawDrawnBalls();

  // Check if the range drawing mode is active
  if (minRangeInput && maxRangeInput && numBallsInput) {
    // Draw the range drawing instructions
    fill('#e74c3c'); // Darker red text
    textSize(20);
    textAlign(CENTER, CENTER);
    text('범위를 선택하고 "뽑기" 버튼을 눌러주세요.', width / 2, height / 2 - 40);
  }
}

function drawDrawnBalls() {
  let x = 30;
  let y = 100;

  fallBalls.forEach((ball) => {
    fill(255, 0, 0);
    ellipse(x + 10, y, 30, 30);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    fill('green'); // Set text color to green
    text(ball, x + 10, y);

    x += 40;
    if (x > 570) {
      x = 30;
      y += 40;
    }
  });
}

function drawDefaultBall() {
  // 입력 필드에서 입력된 숫자를 가져오기
  let maxNumber = int(maxNumberInput.value());

  // 입력값이 유효한지 확인하고 0보다 큰지 검사
  if (!isNaN(maxNumber) && maxNumber > 0) {
    let newBall;
    do {
      // 무작위로 공을 선택
      newBall = floor(random(maxNumber)) + 1;
    } while (fallBalls.includes(newBall)); // 이미 뽑은 공인 경우 다시 선택
    fallBalls.push(newBall); // 선택된 공을 배열에 추가
  } else {
    selectedNumber = "유효하지 않은 입력";
  }

  // 뽑은 후에 모든 숫자가 뽑힌 경우 뽑기 버튼을 비활성화
  if (fallBalls.length === maxNumber) {
    drawButton.attribute('disabled', true);
  }
}

function drawRangeBall() {
  // 최소 범위에서 최대 범위까지의 숫자 범위를 가져오기
  let minRange = int(minRangeInput.value());
  let maxRange = int(maxRangeInput.value());

  // 입력된 숫자를 가져오기
  let numBalls = int(numBallsInput.value());

  // 입력값이 유효한지 확인하고 0보다 큰지 검사
  if (!isNaN(numBalls) && numBalls > 0 && minRange < maxRange) {
    if (fallBalls.length < numBalls) {
      let newBall;
      do {
        newBall = floor(random(minRange, maxRange + 1));
      } while (fallBalls.includes(newBall));
      fallBalls.push(newBall);
    } else {
      selectedNumber = "모든 숫자 뽑힘";
    }
  }

  // 뽑은 후에 모든 숫자가 뽑힌 경우 뽑기 버튼을 비활성화
  if (fallBalls.length === numBalls) {
    drawButton.attribute('disabled', true);
  }
}

function removeAllElements() {
  // 모든 버튼 및 입력 필드 제거
  selectAll('button').forEach(button => button.remove());
  selectAll('input').forEach(input => input.remove());
  selectAll('label').forEach(label => label.remove());
  if (backButton) {
    backButton.remove();
  }
}
