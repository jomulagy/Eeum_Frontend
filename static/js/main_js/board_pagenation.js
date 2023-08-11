document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 6; // 페이지당 보여줄 아이템 개수
    const qnaCardContainer = document.getElementById("qnaCardContainer");
    const paginationContainer = document.getElementById("paginationContainer");

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

    function createQnaCard(data) {
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

    function displayPageItems(pageNumber) {
        // 해당 페이지의 아이템들을 보여주는 함수
        qnaCardContainer.innerHTML = ''; // 기존 아이템 제거

        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = qnaData.slice(startIndex, endIndex);

        pageItems.forEach(data => {
            createQnaCard(data);
        });
    }

    function createPaginationButtons(totalPages, currentPage) {
        // 페이지네이션 버튼 생성 함수
        let paginationHtml = '';

        paginationHtml += '<button id="prevButton" class="pag_btn">&lt;</button>';

        const startPage = Math.max(currentPage - 2, 1);
        const endPage = Math.min(startPage + 4, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            if (i === currentPage) {
                paginationHtml += `<button class="pag_btn current">${i}</button>`;
            } else {
                paginationHtml += `<button class="pag_btn">${i}</button>`;
            }
        }

        paginationHtml += '<button id="nextButton" class="pag_btn">&gt;</button>';

        paginationContainer.innerHTML = paginationHtml;

        const pageButtons = paginationContainer.querySelectorAll(".pag_btn");

        pageButtons.forEach((button, index) => {
            button.addEventListener("click", function () {
                if (button.textContent === "<") {
                    currentPage = Math.max(currentPage - 1, 1);
                } else if (button.textContent === ">") {
                    currentPage = Math.min(currentPage + 1, totalPages);
                } else {
                    currentPage = parseInt(button.textContent);
                }

                createPaginationButtons(totalPages, currentPage);
                displayPageItems(currentPage);
            });
        });
    }

    function initializePagination() {
        const totalPages = Math.ceil(qnaData.length / itemsPerPage);
        let currentPage = 1;

        createPaginationButtons(totalPages, currentPage);
        displayPageItems(currentPage);
    }

    initializePagination(); // 초기 페이지 설정 함수 호출
});
