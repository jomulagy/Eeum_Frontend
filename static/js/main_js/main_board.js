document.addEventListener("DOMContentLoaded", function() {
    const qnaCardContainerMostViewed = document.getElementById("qnaCardContainerMostViewed");
    const qnaCardContainerRecent = document.getElementById("qnaCardContainerRecent");

    // 예시 데이터 - 실제로는 서버에서 가져오는 데이터로 대체해야 합니다.
    const qnaData = [
        // ... (여러분의 예시 데이터)
        {
            index: 1,
            profileImgSrc: "/static/img/profile/지렁이.png",
            username: "귀여운 햄스터",
            date: "2023/07/25",
            viewCount: 123,
            answerCount: 3,
            questionTitle: "라고할뻔이 뭔가요?",
            questionCommentCount: 12,
        },
        {
            index: 2,
            profileImgSrc: "/static/img/profile/지렁이.png",
            username: "귀여운 햄스터",
            date: "2023/07/25",
            viewCount: 113,
            answerCount: 3,
            questionTitle: "움짤이 무슨 뜻인가요?",
            questionCommentCount: 12,
        },
        {
            index: 3,
            profileImgSrc: "/static/img/profile/지렁이.png",
            username: "귀여운 햄스터",
            date: "2023/07/25",
            viewCount: 112,
            answerCount: 3,
            questionTitle: "움짤이 무슨 뜻인가요?",
            questionCommentCount: 12,
        },
        {
            index: 4,
            profileImgSrc: "/static/img/profile/지렁이.png",
            username: "귀여운 햄스터",
            date: "2023/07/25",
            viewCount: 123,
            answerCount: 3,
            questionTitle: "움짤이 무슨 뜻인가요?",
            questionCommentCount: 12,
        },
        {
            index: 5,
            profileImgSrc: "/static/img/profile/지렁이.png",
            username: "귀여운 햄스터",
            date: "2023/07/25",
            viewCount: 123,
            answerCount: 3,
            questionTitle: "움짤이 무슨 뜻인가요?",
            questionCommentCount: 12,
        },
        {
            index: 6,
            profileImgSrc: "/static/img/profile/지렁이.png",
            username: "귀여운 햄스터",
            date: "2023/07/25",
            viewCount: 123,
            answerCount: 3,
            questionTitle: "움짤이 무슨 뜻인가요?",
            questionCommentCount: 12,
        },
        {
            index: 7,
            profileImgSrc: "/static/img/profile/지렁이.png",
            username: "귀여운 햄스터",
            date: "2023/07/25",
            viewCount: 123,
            answerCount: 3,
            questionTitle: "움짤이 무슨 뜻인가요?",
            questionCommentCount: 12,
        },
        {
            index: 8,
            profileImgSrc: "/static/img/profile/지렁이.png",
            username: "귀여운 햄스터",
            date: "2023/07/25",
            viewCount: 777,
            answerCount: 3,
            questionTitle: "움짤이 무슨 뜻인가요?",
            questionCommentCount: 12,
        },
    ];

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
                <div class="qna_card_view">
                    <p>&nbsp;· 조회수 ${data.viewCount}</p>
                </div>
                <div class="qna_card_a_view">
                    <p>&nbsp;· 답변수 ${data.answerCount}</p>
                </div>
            </div>
            <div class="qna_card_a_text">
                <h1>${data.questionTitle}</h1>
                <h2>${data.questionTitle}</h2>
            </div>
            <div class="qna_card_q">
                <button onclick="countqView();">
                    <img src="/static/img/imoge/thinking_face_color.png">
                    <p>나도 궁금해요 ${data.questionCommentCount}</p>
                </button>
            </div>
            <div class="qna_card_a">
                <button onclick="qna_a();">
                    <img src="/static/img/imoge/nerd_face_color.png">
                    <p>댓글 등록하기</p>
                </button>
            </div>
            <div class="qna_card_background"></div>
        `;

        container.appendChild(qnaCard);
    }

    // 좋아요 순으로 정렬된 데이터를 가장 좋아요가 많은 8개만 표시
    qnaData.sort((a, b) => b.viewCount - a.viewCount);
    qnaData.slice(0, 4).forEach(data => {
        createQnaCard(data, qnaCardContainerMostViewed);
    });

    // 최근 등록된 데이터를 인덱스 순으로 정렬하여 1번부터 8번까지 표시
    qnaData.sort((a, b) => a.index - b.index);
    qnaData.slice(0, 4).forEach(data => {
        createQnaCard(data, qnaCardContainerRecent);
    });
});
