let alertData = [];
let access_token = localStorage.getItem("access");

const alertContainer = document.querySelector(".alertCardList");

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("refresh") == null){
        alert("로그인이 필요한 서비스 입니다.")
        window.location.href="index.html";
    }
    const response = { 
        "refresh": localStorage.refresh
    }
    
    refreshAccessToken(response)
    getAlertData();
    getUserInfo();

const deleteAllBtn = document.getElementById("deleteAllBtn");
const deleteSelectBtn = document.getElementById("deleteSelectBtn");
let delCardId = [];

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
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                }
            });
        });
    }
    

function createAlertCard(alertData){
    alertData.forEach(function(alertItemData) {
    const alertItem = document.createElement('ul');
    alertItem.classList.add("alertCard");

    alertItem.setAttribute("id", `wordCard_${alertItemData.target_id}`); // id 값을 설정

    alertItem.innerHTML = `
    <div class="cardInfo">
        <p class="alTime">${alertItemData.created_at}</p>
        <p class="alcheck">${alertItemData.read ? '읽음' : '새 알림'}</p>
    </div>
    <p class="alertContent">
        ${alertItemData.content}
    </p>
    </div>
    `;

    alertItem.addEventListener("click", function () {
        let index = alertItemData.id;
        let type = alertItemData.type;
        const read = alertItemData.read;

        console.log("Clicked:", type); 
        
        if(type === "포인트") {
            readPost(index);
        } else if (type === "수정 요청") {
            console.log("수정 요청 클릭됨:", index);
            localStorage.setItem('qnafixCard_id', index);
            readPost(index);
            window.location.href = "wordfix/detail.html";
        }else if (type === "등록 요청") {
            console.log("등록 요청 클릭됨:", index);
            localStorage.setItem('qnaCardid', index);
            readPost(index, "/registrationrequest/detail.html");
        }else if (type === "단어") {
            console.log("단어 클릭됨:", index);
            localStorage.setItem('word_id', index);
            readPost(index, "/word/detail.html");
        }
        else if (type === "질문") {
            console.log("질문 클릭됨:", index);
            localStorage.setItem('qnaqnaCard_id', index);
            readPost(index,"/qna/detail.html" );
        }

    });

    alertContainer.appendChild(alertItem);
});
}

function displayAlert(alertData){
    alertContainer.innerHTML = "";
    createAlertCard(alertData);
}

function getAlertData(){
        $.ajax({
                type: 'GET',
                url: 'http://3.34.3.84/api/message/',
                contentType: 'application/json',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
                },
                success: function(response) {
                    console.log("data : ", response);
                    displayAlert(response)
                },
                error: function(request, status, error) {
                    alert('불러오기 실패');
                }
            });
        }
});


//dom 끝
function removeSelectedAlerts(id){
        $.ajax({
            type: 'DELETE',
            url: `http://3.34.3.84/api/message/`, // 각 알림 카드의 id에 해당하는 URL로 삭제 요청
            contentType: 'application/json',
            data: JSON.stringify({
                "id": [id]
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
            },
            success: function (response) {
                alert('삭제 성공');
                // Find the alert card element by its id and remove it from the DOM
                const alertCard = document.querySelector(`#wordCard_${id}`);
                if (alertCard) {
                    alertCard.remove();
                }

            },
            error: function (request, status, error) {
                alert('삭제 실패');
            }
        });
}

function readPost(id, url){
    $.ajax({
        type: 'POST',
        url: `http://3.34.3.84/api/message/`, // 각 알림 카드의 id에 해당하는 URL로 삭제 요청
        contentType: 'application/json',
        data: JSON.stringify({
            "id": id
        }),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        },
        success: function (res) {
            console.log(res)
            alert('알림을 읽었습니다.');
            console.log(url)
            window.location.href = url;
        },
        error: function (request, status, error) {
            alert('알림을 읽지 못했습니다.');
        }
    });
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
            console.log("유저 data : ", response);
            var user_nickname = response.nickname;
            userInfo(user_nickname);
        },
        error: function(request, status, error) {
            alert('불러오기 실패');
        }
    });
}

function userInfo(nickname){
    var infoNameInput = document.querySelector(".guideTxt");
    var username = document.createElement('p');
    var currentNickname = nickname;
    username.innerHTML = `
    ${currentNickname}님의 <br>
    알림 목록 입니다.
    `    
    infoNameInput.append(username);

}
