let wordData = [];
let userName;
let access_token = localStorage.getItem("access");

const myUserWordContainer = document.getElementsByClassName("userWordCardList");

document.addEventListener("DOMContentLoaded", function() {
    const response = { 
        "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5MjE5Mjk5NSwiaWF0IjoxNjkyMTA2NTk1LCJqdGkiOiI2ZGQwMDYxZmNkNGU0MzVjYTMyMjBmNzk2MWZjMWUwOCIsInVzZXJfaWQiOjMxfQ.EbkGSDqtK1XcZQ1W6hiB_rSycswLCzx4xZuGT6NFmb8"
    }
    refreshAccessToken(response)
    getUserInfo();
    getUserWordData();
    createWordCard()
    let newName = ""; // 수정된 닉네임을 저장하는 변수

    const editBtn = document.getElementById("editBtn");
    const inputBox = document.getElementById("inputName");
    
    // 수정 버튼 클릭 이벤트 핸들러 등록
    editBtn.addEventListener("click", editBtnClick);

    //수정 버튼 클릭 이벤트 핸들러
    function editBtnClick() {
        inputBox.readOnly = !inputBox.readOnly;
        
        if(inputBox.readOnly){
                $(editBtn).css("background-color", "#FFFFFF");
                $(editBtn).val("수정");
        } else{
                $(editBtn).css("background-color", "#FFE173");
                $(editBtn).val("저장");
                console.log(inputBox.value)
                newName = inputBox.value; // 수정된 닉네임 저장
        }
    }

            // 저장 버튼 클릭 이벤트 핸들러
            editBtn.addEventListener("click", function() {
                if (inputBox.readOnly) {
                    // inputBox가 편집 가능한 상태일 때에만 changeData 호출
                    changeData(inputBox.value);
                }
            });

// Refresh Token 재발급 함수
function refreshAccessToken(response) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: 'http://3.34.3.84/api/account/refresh/',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                "refresh": localStorage.getItem('refresh')
            }),
            success: function(res) {
                const access = res.access;
                const refresh = res.refresh;
                    
                localStorage.setItem('access', access);
                localStorage.setItem('refresh', refresh);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            }
        });
    });
}

function createWordCard(wordData){
    console.log(wordData)
    const cardTitleDiv = document.querySelectorAll('.userWord');
    let cardTitle = wordData.title;
    let cardAges = wordData.ages;
    let cardLikes =  wordData.likes;

    let imageHtml = ""; // Initialize imageHtml variable
    
    if (cardAges[0] === 10) {
        imageHtml += `<img src="../static/img/age/age_10.png">`;
    } else if (cardAges[0] === 20) {
        imageHtml += `<img src="../static/img/age/age_20.png">`;
    } else if (cardAges[0] === 30) {
        imageHtml += `<img src="../static/img/age/age_30.png">`;
    } else if (cardAges[0] === 40) {
        imageHtml += `<img src="../static/img/age/age_40.png">`;
    } else if (cardAges[0] === 50) {
        imageHtml += `<img src="../static/img/age/age_50.png">`;
    }

    if (cardAges[1]) {
        if (cardAges[1] === 10) {
            imageHtml += `<img src="../static/img/age/age_10.png">`;
        } else if (cardAges[1] === 20) {
            imageHtml += `<img src="../static/img/age/age_20.png">`;
        } else if (cardAges[1] === 30) {
            imageHtml += `<img src="../static/img/age/age_30.png">`;
        } else if (cardAges[1] === 40) {
            imageHtml += `<img src="../static/img/age/age_40.png">`;
        } else if (cardAges[1] === 50) {
            imageHtml += `<img src="../static/img/age/age_50.png">`;
        }
    }

    cardItem.innerHTML = `
    <li class="userWordCard">
    <p>${wordData.title}</p>
    <div class="wordCardTop">
        ${imageHtml}
    </div>
    </li>
    <li class="word_heart">
        <img src="../static/img/imoge/heartred.png">
        <p>${wordData.likes}</p>
    </li>
    `;

    cardItem.setAttribute("id", `${wordData.id}`); // id 값을 설정
}

function displayWord(wordData){
    myUserWordContainer.innerHtml = "";
    createWordCard(wordData);
}


function changeData(newName) {
    var requestData = {
        "age": 20,
        "nickname": newName,
        "image": "http://127.0.0.1:8000//media/user/1-all.jpg",
        "level": "돌멩이"
    };

    $.ajax({
        type: 'PUT',
        url: 'http://3.34.3.84/api/account/user/', // 슬래시 하나로 수정
        contentType: 'application/json',
        data: JSON.stringify(requestData), // 데이터를 JSON 문자열로 변환
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        },
        success: function(response) {
            alert('변경 성공');
            console.log("data : ", response);
            changeName(response.nickname);
        },
        error: function(request, status, error) {
            alert('변경 실패');
        }
    });
}


function changeName(newName) {
    var myPageName = document.querySelector(".myPageName");
    var userWordName = document.querySelectorAll(".userWordName");

    $(myPageName).text(newName);
    $(userWordName).text(newName);
}

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: 'http://3.34.3.84/api/account/user/',
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        },
        success: function(response) {
            alert('유저 정보 불러오기 성공');
            console.log("유저 data : ", response);

            var user_age = response.age;
            var user_nickname = response.nickname;
            var user_image = response.image;
            var user_level = response.level;
            var user_point = response.point;

            loadUserInfo(user_age, user_nickname, user_image, user_level, user_point);
            userInfo(user_nickname, user_age);
        },
        error: function(request, status, error) {
            alert('불러오기 실패');
        }
    });
}

function loadUserInfo(age, nickname, image, level, point){
    const ageDiv = document.getElementById("myAge");
    const nameDiv = document.getElementById("myNickname");
    const imageDiv = document.getElementById("myProfile");
    const levelDiv = document.getElementById("myLevel");
    const pointDiv = document.getElementById("myPoint");


    let myPageAge = age+"대";
    let myPageName = nickname;
    let myPageProfile = image;
    let myPageLevel = level;
    let pointNum = point;

    ageDiv.innerText = myPageAge;
    nameDiv.innerText = myPageName;
    imageDiv.src = myPageProfile;
    levelDiv.innerText = myPageLevel;
    pointDiv.innerText = pointNum;
        
}

function userInfo(nickname, age){
    var infoNameInput = document.getElementById("inputName");
    var infoAgeInput = document.getElementById("inputAge");
    infoNameInput.value = nickname; 
    infoAgeInput.innerText = age+"대";
}

// function userWordData(){
//     // 등록한 단어 목록 삽입
//     var wordList = jsonData.my_words;
//     var wordListContainer = document.querySelector(".detail_tab#word_register_tab .tab_content");
//     for (var i = 0; i < Math.min(wordList.length,4); i++) { //최대 4개의 list만 뜨게 제한
//         var wordElement = document.createElement("p");
//         wordElement.textContent = wordList[i];
//         wordListContainer.appendChild(wordElement);
//     }
// }

function getUserWordData(){
    $.ajax({
        type: 'GET',
        url: 'http://3.34.3.84/api/account/user/word/',
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        },
        success: function(response) {
            alert('단어 데이터 불러오기 성공');
            console.log("단어 data : ", response);
            const userWordData = response;
            for (var i = 0; i < Math.min(userWordData.length,3); i++){
                wordData = response[i]
                createWordCard(wordData)
            }
        },
        error: function(request, status, error) {
            alert('데이터 불러오기 실패');
        }
    });
}

// //단어 상세에서 훔쳐온거

// function createElement(jsonData){
//     // 단어와 단어 뜻 삽입
// document.getElementById("word_title").textContent = jsonData.title;
// document.getElementById("word_age_icon1").src = "/static/img/age/age_" + jsonData.age[0] + ".png";
// document.getElementById("word_age_icon2").src = "/static/img/age/age_" + jsonData.age[1] + ".png";
// if(jsonData.image != null){
//     document.getElementById("word_img").src = jsonData.image;
// } else{
//     document.getElementById("word_img").style.display = "none";
// }

// document.getElementById("word_mean").textContent = jsonData.mean;
// document.getElementById("word_detail_content").textContent = jsonData.content;

// // 좋아요 및 작성자 정보 삽입
// document.getElementById("like_count").textContent = jsonData.likes;
// document.querySelector(".word_detail_userinfo p").textContent = "작성자 : " + jsonData.author.nickname;
// var authorTitle = document.querySelector(".detail_tab#word_register_tab .tab_title");
// authorTitle.textContent = jsonData.author.nickname + " 님의 등록 단어";

// // 수정 요청 목록 삽입
// var editList = jsonData.edits;
// var editListContainer = document.querySelector(".detail_tab#changing_inform_tab .tab_content");
// for (var i = 0; i < Math.min(editList.length, 4); i++) {
//     var editContainer = document.createElement("div");
//     editContainer.className = "tab_content_container";

//     var titleElement = document.createElement("div");
//     titleElement.className = "tab_content_title";
//     titleElement.textContent = editList[i].title;

//     var dateElement = document.createElement("div");
//     dateElement.className = "tab_content_date";
//     dateElement.textContent = editList[i].created_at;

//     editContainer.appendChild(titleElement);
//     editContainer.appendChild(dateElement);
//     editListContainer.appendChild(editContainer);
// }

// // 관련 질문 목록 삽입
// var questionList = jsonData.questions;
// var questionListContainer = document.querySelector(".detail_tab#relative_question_tab");
// for (var i = 0; i < Math.min(questionList.length, 4); i++){
//     var questionContainer = document.createElement("div");
//     questionContainer.className = "tab_content_container";

//     var titleElement = document.createElement("div");
//     titleElement.className = "tab_content_title";
//     titleElement.textContent = questionList[i].title;

//     var dateElement = document.createElement("div");
//     dateElement.className = "tab_content_date";
//     dateElement.textContent = questionList[i].created_at;

//     questionContainer.appendChild(titleElement);
//     questionContainer.appendChild(dateElement);
//     questionListContainer.appendChild(questionContainer);
// }

// // 등록한 단어 목록 삽입
// var wordList = jsonData.my_words;
// var wordListContainer = document.querySelector(".detail_tab#word_register_tab .tab_content");
// for (var i = 0; i < Math.min(wordList.length,4); i++) { //최대 4개의 list만 뜨게 제한
//     var wordElement = document.createElement("p");
//     wordElement.textContent = wordList[i];
//     wordListContainer.appendChild(wordElement);
// }

// });
});