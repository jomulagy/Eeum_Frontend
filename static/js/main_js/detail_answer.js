//단어 카드 추가

document.addEventListener("DOMContentLoaded", function() {
    const qnaCardContainer = document.getElementById("qnaCardContainer_answer");

    // 예시 데이터 - 실제로는 서버에서 가져오는 데이터로 대체해야 합니다.
    const wordsData = [
        {
            index: 1,
            profileImgSrc: "/static/img/profile/지렁이.png",
            username: "귀여운 햄스터",
            date: "2023/07/25",
            time: "22:00",
            questionTitle: "움직이는 짤의 줄임말입니다.",
            questionTitle_two: "짤은 사진이니까 움직이는 사진이라는 뜻입니다.",
            answerCommentCount: 12,
        },
        {
            index: 2,
            profileImgSrc: "/static/img/profile/지렁이.png",
            username: "귀여운 햄스터",
            date: "2023/07/25",
            time: "22:00",
            questionTitle: "움직이는 짤이라는 뜻입니다",
            questionTitle_two: "짤은 사진이니까 움직이는 사진이라는 뜻입니다.",
            answerCommentCount: 12,
        },
        // ... 이하 데이터 추가
    ];

    // 함수를 통해 단어 카드 생성
    // 함수를 통해 Q&A 카드 생성
    function createQnaCard(data, container) {
        const qnaCard = document.createElement("div");
        qnaCard.classList.add("qna_card");

        qnaCard.innerHTML = `
            <div class="qna_card_img"><img src="${data.profileImgSrc}"></div>
            <div class="qna_card_inf">
                <div class="qna_card_name">
                    <p>${data.username}</p>
                </div>
                <div class="qna_card_date">
                    <p>&nbsp;· ${data.date}</p>
                </div>
                <div class="qna_card_a_view">
                    <p>&nbsp;${data.time}</p>
                </div>
            </div>
            <div class="qna_card_a_text">
                <h1>${data.questionTitle}<br>${data.questionTitle_two}</h1>
            </div>
            <div class="qna_card_q">
                <button onclick="countqView();">
                    <img src="/static/img/imoge/smiling_face_with_heart-eyes_color 1.png">
                    <p>도움이 되었어요 ${data.answerCommentCount}</p>
                </button>
            </div>
            <div class="qna_card_background"></div>
        `;

        container.appendChild(qnaCard);
    }
    
    // 기존 데이터로 단어 카드 생성
    wordsData.forEach(data => {
        createQnaCard(data, qnaCardContainer_answer);
    });
});
