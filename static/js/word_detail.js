function clearPlaceholder() {
    const searchInput = document.getElementById('searchInput');
    searchInput.placeholder = '';
}

let likeCount = 0;
let isLiked = false;
let isBookmarked = false;

function toggleHeart() {
    isLiked = !isLiked;

    const heartIcon = document.getElementById('heart_icon');
    const likeCountElement = document.getElementById('like_count');

    if (isLiked) {
        heartIcon.classList.add('filled-heart');
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid');
        likeCount++;
    } else {
        heartIcon.classList.remove('filled-heart');
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
        likeCount--;
    }

    likeCountElement.innerText = likeCount;

}

function toggleBookmark() {
    isBookmarked = !isBookmarked;

    const bookmarkIcon = document.getElementById('bookmark_icon');

    if(isBookmarked){
        bookmarkIcon.classList.add('fa-solid');
        bookmarkIcon.classList.remove('fa-regular');
    } else{
        bookmarkIcon.classList.remove('fa-solid');
        bookmarkIcon.classList.add('fa-regular');
    }
}

$(document).ready(function () {
    var jsonData;
    //         "title": "핑프",
    //         "mean": "핑거프린스",
    //         "content": "찾아보지도 않고 물어보는 사람",
    //         "age": [
    //           10,
    //           20
    //         ],
    //         "likes": 3,
    //         "views": 24,
    //         "created_at": "2023/08/06 23:54",
    //         "image": "null",
    //         "author": {
    //           "nickname": "김지훈",
    //           "level": "에메랄드"
    //         },
    //         "edits": [],
    //         "questions": [],
    //         "my_words": [
    //           "핑프2",
    //           "핑프",
    //           "~라고 할뻔",
    //           "바보",
    //           "멍청이"
    //         ],
    //         "like_ages": {
    //           "10": 30,
    //           "20": 10,
    //           "30": 10,
    //           "40": 40,
    //           "50": 50
    //         }
    // };
    $.ajax({
        type:"POST",
        url: "http://3.34.3.84/api/word/detail/",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({word_id:localStorage.getItem("word_id")}),
        success: function(response){
            jsonData = response;
            console.log(jsonData);
            createElement(jsonData);
        }
    });

    function createElement(jsonData){
        // 단어와 단어 뜻 삽입
    document.getElementById("word_title").textContent = jsonData.title;
    document.getElementById("word_age_icon1").src = "/static/img/age/age_" + jsonData.age[0] + ".png";
    document.getElementById("word_age_icon2").src = "/static/img/age/age_" + jsonData.age[1] + ".png";
    if(jsonData.image != null){
        document.getElementById("word_img").src = jsonData.image;
    } else{
        document.getElementById("word_img").style.display = "none";
    }
    
    document.getElementById("word_mean").textContent = jsonData.mean;
    document.getElementById("word_detail_content").textContent = jsonData.content;

    // 좋아요 및 작성자 정보 삽입
    document.getElementById("like_count").textContent = jsonData.likes;
    document.querySelector(".word_detail_userinfo p").textContent = "작성자 : " + jsonData.author.nickname;
    var authorTitle = document.querySelector(".detail_tab#word_register_tab .tab_title");
    authorTitle.textContent = jsonData.author.nickname + " 님의 등록 단어";

    // 수정 요청 목록 삽입
    var editList = jsonData.edits;
    var editListContainer = document.querySelector(".detail_tab#changing_inform_tab .tab_content");
    for (var i = 0; i < Math.min(editList.length, 4); i++) {
        var editContainer = document.createElement("div");
        editContainer.className = "tab_content_container";

        var titleElement = document.createElement("div");
        titleElement.className = "tab_content_title";
        titleElement.textContent = editList[i].title;

        var dateElement = document.createElement("div");
        dateElement.className = "tab_content_date";
        dateElement.textContent = editList[i].created_at;

        editContainer.appendChild(titleElement);
        editContainer.appendChild(dateElement);
        editListContainer.appendChild(editContainer);
    }
    
    // 관련 질문 목록 삽입
    var questionList = jsonData.questions;
    var questionListContainer = document.querySelector(".detail_tab#relative_question_tab");
    for (var i = 0; i < Math.min(questionList.length, 4); i++){
        var questionContainer = document.createElement("div");
        questionContainer.className = "tab_content_container";

        var titleElement = document.createElement("div");
        titleElement.className = "tab_content_title";
        titleElement.textContent = questionList[i].title;

        var dateElement = document.createElement("div");
        dateElement.className = "tab_content_date";
        dateElement.textContent = questionList[i].created_at;

        questionContainer.appendChild(titleElement);
        questionContainer.appendChild(dateElement);
        questionListContainer.appendChild(questionContainer);
    }

    // 등록한 단어 목록 삽입
    var wordList = jsonData.my_words;
    var wordListContainer = document.querySelector(".detail_tab#word_register_tab .tab_content");
    for (var i = 0; i < Math.min(wordList.length,4); i++) { //최대 4개의 list만 뜨게 제한
        var wordElement = document.createElement("p");
        wordElement.textContent = wordList[i];
        wordListContainer.appendChild(wordElement);
    }

    // 레벨에 따라 다른 div 생성 및 추가
    var userLevel = jsonData.author.level; // 레벨 정보 

    var userLevelContainer = document.querySelector(".word_detail_userlevel_container");    

    var levelDiv = document.createElement("div");
    levelDiv.id = "userlevel_" + userLevel;
    levelDiv.classList.add("word_detail_userlevel_container");

    var levelFrameImg = document.createElement("img");
    levelFrameImg.id = "userlevel_frame";
    levelFrameImg.src = "/static/img/icon/Frame " + userLevel + ".png";
    levelFrameImg.alt = userLevel + " 이미지";

    var levelIconImg = document.createElement("img");
    levelIconImg.id = "userlevel_icon";
    levelIconImg.src = "/static/img/icon/userlevel_icon_" + userLevel + ".png";
    levelIconImg.alt = userLevel + " 이미지";

    levelDiv.appendChild(levelFrameImg);
    levelDiv.appendChild(levelIconImg);

    userLevelContainer.parentNode.insertBefore(levelDiv, userLevelContainer.nextSibling);


    // "like_ages" 데이터를 기반으로 막대 그래프 생성
    var ctx = document.getElementById('like_ages_chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(jsonData.like_ages),
            datasets: [{
                label: '좋아요 연령 분석',
                data: Object.values(jsonData.like_ages),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    }
    
});
