//질문 id를 받아서 다음 질문으로 넘어갈 수 있도록 하는 js
$(document).ready(function () {
    $(".nextButton").on("click", function () {
        // 현재 표시되고 있는 질문의 ID를 가져옴
        var currentQuestion = $(this).closest(".modify_word_question").attr("id");
        // 다음 질문의 ID를 data-next 속성으로부터 가져옴
        var nextQuestion = $(this).data("next");

        // 현재 질문을 숨기고 다음 질문을 표시
        $("#" + currentQuestion).hide();
        $(nextQuestion).show();
    });
});

// 질문 1 타이핑 수 제한
const q1_textarea = document.getElementById('q1_modify_word_textarea');
const q1_textLengthCnt = document.querySelector('.q1_text-length-cnt');
const q1_maxLength = 40;

q1_textarea.addEventListener('input', function () {
    const q1_textLength = q1_textarea.value.length;
    q1_textLengthCnt.textContent = q1_textLength;

    // 입력 글자 수가 최대 글자 수를 초과할 경우 자르기
    if (q1_textLength > q1_maxLength) {
        q1_textarea.value = q1_textarea.value.slice(0, q1_maxLength);
        q1_textLengthCnt.textContent = q1_maxLength;
    }
});

// 질문 2 타이핑 수 제한
const q2_textarea = document.getElementById('q2_modify_word_textarea');
const q2_textLengthCnt = document.querySelector('.q2_text-length-cnt');
const q2_maxLength = 300;

q2_textarea.addEventListener('input', function () {
    const q2_textLength = q2_textarea.value.length;
    q2_textLengthCnt.textContent = q2_textLength;

    // 입력 글자 수가 최대 글자 수를 초과할 경우 자르기
    if (q2_textLength > q2_maxLength) {
        q2_textarea.value = q2_textarea.value.slice(0, q2_maxLength);
        q2_textLengthCnt.textContent = q2_maxLength;
    }
});
