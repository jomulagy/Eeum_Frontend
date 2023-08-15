let access_token = localStorage.getItem("access");

document.addEventListener("DOMContentLoaded", function() {
    

    const response = { 
        "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5MjE5Mjk5NSwiaWF0IjoxNjkyMTA2NTk1LCJqdGkiOiI2ZGQwMDYxZmNkNGU0MzVjYTMyMjBmNzk2MWZjMWUwOCIsInVzZXJfaWQiOjMxfQ.EbkGSDqtK1XcZQ1W6hiB_rSycswLCzx4xZuGT6NFmb8"
    }
    refreshAccessToken(response)
    getUserInfo();
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
                "refresh": response.refresh // response 객체에서 refresh token 가져옴
            }),
            success: function(res) {
                const access = res.access;
                const refresh = res.refresh;
                    
                localStorage.setItem('access', access);
                localStorage.setItem('refresh', refresh);
                console.log(2);
           
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            }
        });
    });
}
});


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
            alert('불러오기 성공');
            console.log("data : ", response);

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


    var myPageAge = age+"대";
    var myPageName = nickname;
    var myPageProfile = image;
    var myPageLevel = level;
    var pointNum = point;

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


// //   const wordContainer = document.getElementById("wordContainer");
// //     // 함수를 통해 단어 카드 생성
// //     function createWordCard(data) {
// //         const wordItem = document.createElement("ul");
// //         wordItem.classList.add("word");
    
// //         let imageHtml = `<img src="${data.image}">`;
    
// //         if (data.image_snd) {
// //             imageHtml += `<img src="${data.image_snd}">`;
// //         }
    
// //         wordItem.innerHTML = `
// //             <li class="word_name">
// //                 <p>${data.name}</p>
// //                 <div class="img_container">
// //                     ${imageHtml}
// //                 </div>
// //             </li>
// //             <li class="word_what"><p>${data.what}</p></li>
// //             <li class="word_heart">
// //                 <img src="${data.heart_img}">
// //                 <p>${data.heart}</p>
// //             </li>
// //         `;

// //         // 클릭 이벤트 처리
// //         wordItem.addEventListener("click", function() {
// //             // 해당 단어 카드의 링크로 이동
// //             window.location.href = data.link;
// //         });
    
// //         wordContainer.appendChild(wordItem);

// //         var savedWord = wordsData.length;

// //     }
    
// //     // 기존 데이터로 단어 카드 생성
// //         wordsData.forEach(data => {
// //         createWordCard(data);
// //      });
// });



