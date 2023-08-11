document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const qnaCardContainer = document.getElementById("qnaCardContainer");
    const searchButton = document.getElementById("searchButton");
    const resultTitle = document.getElementById("resultTitle")

    // 예시 데이터 - 실제로는 서버에서 가져오는 데이터로 대체해야 합니다.
    const qnaData = [
        // ... (데이터 배열)
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

        qnaCardContainer.appendChild(qnaCard);
    }

    function displayMatchingQna(searchTerm) {
        qnaCardContainer.innerHTML = ''; // 초기화

        const matchingQna = qnaData.filter(data =>
            data.questionTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );

        matchingQna.forEach(data => {
            createQnaCard(data);
        });
    }

    searchButton.addEventListener("click", function() {
        const searchTerm = searchInput.value.trim();
        // 초기화
        qnaCardContainer.innerHTML = '';

        if (searchTerm === "") {
            window.location.href = "/templates/main_templates/main_board_all.html";
        } else {
            resultTitle.textContent = "검색 결과";
            displayMatchingQna(searchTerm);
        }
    });
});
