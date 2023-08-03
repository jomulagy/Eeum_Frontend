// 질문 3 타이핑 수 제한
const q3_textarea = document.getElementById('q3_word_register_textarea');
const q3_textLengthCnt = document.querySelector('.q3_text-length-cnt');
const q3_maxLength = 40;

q3_textarea.addEventListener('input', function () {
    const q3_textLength = q3_textarea.value.length;
    q3_textLengthCnt.textContent = q3_textLength;

    // 입력 글자 수가 최대 글자 수를 초과할 경우 자르기
    if (q3_textLength > q3_maxLength) {
        q3_textarea.value = q3_textarea.value.slice(0, q3_maxLength);
        q3_textLengthCnt.textContent = q3_maxLength;
    }
});

// 질문 4 타이핑 수 제한
const q4_textarea = document.getElementById('q4_word_register_textarea');
const q4_textLengthCnt = document.querySelector('.q4_text-length-cnt');
const q4_maxLength = 300;

q4_textarea.addEventListener('input', function () {
    const q4_textLength = q4_textarea.value.length;
    q4_textLengthCnt.textContent = q4_textLength;

    // 입력 글자 수가 최대 글자 수를 초과할 경우 자르기
    if (q4_textLength > q4_maxLength) {
        q4_textarea.value = q4_textarea.value.slice(0, q4_maxLength);
        q4_textLengthCnt.textContent = q4_maxLength;
    }
});



// 질문 2 선택 갯수 제한
