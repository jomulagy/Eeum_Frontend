//파일 삭제
const access_token = localStorage.getItem("access");

document.addEventListener("DOMContentLoaded", function() {
    var response = { "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5MjE5Mjk5NSwiaWF0IjoxNjkyMTA2NTk1LCJqdGkiOiI2ZGQwMDYxZmNkNGU0MzVjYTMyMjBmNzk2MWZjMWUwOCIsInVzZXJfaWQiOjMxfQ.EbkGSDqtK1XcZQ1W6hiB_rSycswLCzx4xZuGT6NFmb8"
    }

    var newName = ""; // 수정된 닉네임을 저장하는 변수

    const editBtn = document.getElementById("editBtn");
    var inputBox = document.getElementById("inputName");
    
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
                newName = inputBox.value; // 수정된 닉네임 저장
        }
    }

            // 저장 버튼 클릭 이벤트 핸들러
            editBtn.addEventListener("click", function() {
                if (inputBox.readOnly) {
                    // inputBox가 편집 가능한 상태일 때에만 changeData 호출
                    changeData();
                }
            });

// // editBtnClick 이벤트 핸들러 등록
// editBtn.addEventListener("click", editBtnClick);

function changeData(newName){
    $.ajax({
        type: 'PUT',
        url: 'http://3.34.3.84/api/account/user/',
        contentType: 'application/json',
        data:{
            "age": 20,
            "nickname": "sadd",
            "image": "http://127.0.0.1:8000//media/user/1-all.jpg",
            "level": "돌멩이"
          },
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        },
        success: function(response){
            alert('변경 성공');
            console.log("data : ", response);
            changeName(response.nickname);
        },
        error: function(request, status, error){
            alert('변경 실패');
        }
    });
}

// 닉네임 변경
function changeName(newName) {
    var myPageName = document.querySelector(".myPageName");
    var userWordName = document.querySelectorAll(".userWordName");

    $(myPageName).text(newName);
    $(userWordName).text(newName);
}

// function changeData(access_token, newName){
//         $.ajax({
//             type: 'PUT',
//             url: 'http://3.34.3.84/api/account/user/',
//             contentType: 'application/json',
//             data:{
//                 "age": 20,
//                 "nickname": newName,
//                 "image": "http://127.0.0.1:8000//media/user/1-all.jpg",
//                 "level": "돌멩이"
//               },
//             beforeSend: function(xhr) {
//                 xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
//             },
//             success: function(response){
//                 alert('변경 성공');
//                 console.log("data : ", response);
//                 changeName(response.nickname);
//             },
//             error: function(request, status, error){
//                 alert('변경 실패');
//             }
//         });
//     }

 // 저장 버튼 클릭 이벤트 핸들러
// editBtn.addEventListener("click", function() {
//     if (!inputBox.readOnly) {
//      changeData(response.refresh, newName); // 수정된 닉네임 전달
//     }
// });
    
    // 초기 닉네임 값 설정
    var initialNickname = inputBox.value;
    changeName(initialNickname);


});

    // // 최초 로딩시에 닉네임 설정
    // changeName(initialNickname);





// function editBtnClick(){
//     const editBtn = document.getElementById("editBtn");
//     var inputBox = document.getElementById("inputBox");
//     var inputValue = inputBox.value;

//     inputBox.readOnly = !inputBox.readOnly;

//     if(inputBox.readOnly){
//         $(editBtn).css("background-color", "#FFFFFF");
//         $(editBtn).val("수정");
//     } else{
//         $(editBtn).css("background-color", "#FFE173");
//         $(editBtn).val("저장");
//     }
// }


