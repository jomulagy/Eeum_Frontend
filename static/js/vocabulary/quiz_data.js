let access_token = localStorage.getItem("access");

document.addEventListener("DOMContentLoaded", function() {
    const response = { 
        "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5MjE5Mjk5NSwiaWF0IjoxNjkyMTA2NTk1LCJqdGkiOiI2ZGQwMDYxZmNkNGU0MzVjYTMyMjBmNzk2MWZjMWUwOCIsInVzZXJfaWQiOjMxfQ.EbkGSDqtK1XcZQ1W6hiB_rSycswLCzx4xZuGT6NFmb8"
    }

    refreshAccessToken(response)
    getQuizData();

// Refresh Token 재발급 함수
    function refreshAccessToken(response) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: 'http://3.34.3.84/api/account/refresh/',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    "refresh": response.refresh // response 객체에서 refresh token 가져옴
                }),
                success: function(res) {
                    const access = res.access;
                    const refresh = res.refresh;
                        
                    localStorage.setItem('access', access);
                    localStorage.setItem('refresh', refresh);
                    console.log(access);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                }
            });
        });
    }

var reviewContainer = document.getElementById("review");
var quizContainer = document.getElementById('quiz');

var currentQuizIndex = 0;
var score = 0;
var buttonIds = ["A", "B", "C"];

function showQuiz(data) {
  var quizes = data.quizes;
  console.log(quizes);

  quizContainer.innerHTML = '';

  var quiz = quizes[currentQuizIndex];
  var choices = quiz.choices;

  var quizDiv = document.createElement('div');
  quizDiv.setAttribute("class", "quizWrap");

  var titleElement = document.createElement('p');
  titleElement.setAttribute("class", "quizQuestion");
  titleElement.textContent = quiz.title;
  quizDiv.appendChild(titleElement);

  var choiceContainer = document.createElement('ul');
  choiceContainer.setAttribute("class", "choiceContainer");

  for (var j = 0; j < choices.length; j++) {
      var choice = choices[j].choice;

      var choiceCard = document.createElement('li');

      var button = document.createElement('button');
      button.setAttribute("type", "button");
      button.setAttribute("class", "choiceCard");
      button.setAttribute("id", buttonIds[j]); // Set unique button id

      // 넘어가기
      button.addEventListener('click', onChoiceClick);

      var choiceTxt = document.createElement('p');
      choiceTxt.setAttribute("class", "choiceTxt");
      choiceTxt.textContent = choice;

      button.appendChild(choiceTxt);
      choiceCard.appendChild(button);
      choiceContainer.appendChild(choiceCard);
  }

  quizDiv.appendChild(choiceContainer);
  quizContainer.appendChild(quizDiv);
}

// 퀴즈 완료 시 호출되는 함수
function completeQuiz() {
    // 퀴즈 섹션을 숨김
    document.getElementById('quiz').style.display = 'none';
    // 결과 섹션을 표시
    document.getElementById('result').removeAttribute('hidden');

    var totalScore = document.querySelector(".quizScore");
    var scoreContent = document.querySelector(".scoreContent");
    var expContent = document.querySelector(".expContent");
    
    totalScore.textContent = (score*20)+"점";
    scoreContent.textContent = "5문제 중 "+score+"문제 맞췄어요!";
    expContent.textContent = "(경험치 "+(score*10)+"이 적립되었습니다.)";
}

function getQuizData(){
    $.ajax({
        type: 'GET',
        url: 'http://3.34.3.84/api/vocabulary/quiz/',
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        },
        success: function(response){
            alert('불러오기 성공');
            console.log("data : ", response);
            showQuiz(response);
        },
        error: function(request, status, error){
            alert('불러오기 실패');
            console.log(access_token)
        }
    });
}

    // 함수를 통해 단어 카드 생성
function showReview(data) {
      const reviewData = data.words;
    
      for (var i = 0; i < reviewData.length; i++){
        const wordItem = document.createElement("ul");
        wordItem.classList.add("word");
    
        // let imageHtml = `<img src="${data.image}">`;
    
        // if (data.image_snd) {
        //     imageHtml += `<img src="${data.image_snd}">`;
        // }
    
      const word = reviewData[i];
      wordItem.innerHTML = `
      <li class="word_name">
          <p>${reviewData.title}</p>
      </li>
      <li class="word_what"><p>${reviewData.content}</p></li>
      <li class="word_heart">
          <p>${reviewData.likes}</p>
      </li>
  `;

      // 클릭 이벤트 처리
      wordItem.addEventListener("click", function() {
          // 해당 단어 카드의 링크로 이동
          window.location.href = "detail.html";
      });
  
      reviewContainer.appendChild(wordItem);
    }
  }
  

// 선택지를 클릭했을 때 실행될 함수
function onChoiceClick(event) {
    var clickedChoice = event.target; // Get the clicked button
    var choiceIndex = buttonIds.indexOf(clickedChoice.id);
    var choices = data.quizes[currentQuizIndex].choices;
    var isCorrect = choices[choiceIndex].is_answer; // Check if the choice is correct

    // Add color to choice based on correctness
    if (isCorrect) {
        score++;
        clickedChoice.style.borderColor = '#87CEEB';
        clickedChoice.querySelector('.choiceTxt').style.color = '#1EBEFF';
    } else {
        clickedChoice.style.borderColor = '#FF83A8';
        clickedChoice.querySelector('.choiceTxt').style.color = '#F70A8D';
    }

    // Move to the next quiz or complete the quiz
    currentQuizIndex++;
    if (currentQuizIndex < data.quizes.length) {
        showQuiz(data);
    } else {
        document.body.style.backgroundColor = '#FFEEB0';
        completeQuiz();
    }
}


});