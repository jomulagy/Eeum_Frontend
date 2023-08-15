let access_token = localStorage.getItem("access");

document.addEventListener("DOMContentLoaded", function () {
        const response = { 
                "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5MjE5Mjk5NSwiaWF0IjoxNjkyMTA2NTk1LCJqdGkiOiI2ZGQwMDYxZmNkNGU0MzVjYTMyMjBmNzk2MWZjMWUwOCIsInVzZXJfaWQiOjMxfQ.EbkGSDqtK1XcZQ1W6hiB_rSycswLCzx4xZuGT6NFmb8"
        }

refreshAccessToken(response)
getAlertData();

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

//카드 클릭 시 알림 처리 (alcheck값 변경)

//읽은 알림 배경 색 변경
$(".alcheck:contains('읽음')").closest(".alertCard").css("background-color", "#FAFAFA");

// 선택 삭제 버튼 클릭 이벤트 핸들러
const deleteSelectBtn = document.getElementById("deleteSelectBtn");

deleteSelectBtn.addEventListener("click", function() {
    const selectedCards = $(".alertCard.selected");

    if ($(deleteSelectBtn).val() === "삭제하기") {
        if (selectedCards.length > 0) {
            var deleteSelectAnswer = confirm('선택한 알림을 삭제하시겠습니까?');
            if (deleteSelectAnswer) {
                selectedCards.remove(); // 선택된 카드 삭제
            }
        }

        selectedCards.removeClass("selected"); // 선택된 카드 상태 초기화
        $(deleteSelectBtn).val("선택삭제"); // 버튼 값을 다시 "선택삭제"로 변경
        $(deleteSelectBtn).css("background-color", ""); // 원래 색상으로 되돌리기
    } else {
        $(deleteSelectBtn).css("background-color", "#FFE173");
        $(deleteSelectBtn).val("삭제하기");
    }
});

//전체 삭제 버튼 클릭 이벤트 핸들러
const deleteAllBtn = document.getElementById("deleteAllBtn");

deleteAllBtn.addEventListener("click", function(){
    const alertCard = document.querySelectorAll(".alertCard");
    var deleteAllAnswer = confirm('알림을 모두 삭제하시겠습니까?');

    if(deleteAllAnswer){
        alertCard.forEach(function(card){
            card.remove();
        });
    }

});

// 알림 카드 클릭 이벤트 핸들러
$(".alertCard").click(function() {
    if ($(deleteSelectBtn).val() === "삭제하기") {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        } else {
            $(this).addClass("selected");
        }
    }
});

function getAlertData(){
        $.ajax({
                type: 'GET',
                url: 'http://3.34.3.84/api/message/',
                contentType: 'application/json',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
                },
                success: function(response) {
                    alert('불러오기 성공');
                    console.log("data : ", response);
                },
                error: function(request, status, error) {
                    alert('불러오기 실패');
                }
            });
        }
});