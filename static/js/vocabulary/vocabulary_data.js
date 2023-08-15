let access_token = localStorage.getItem("access");

document.addEventListener("DOMContentLoaded", function() {
    const itemsPerPage = 12; // 페이지당 보여줄 아이템 개수
    const wordContainer = document.getElementById("wordContainer");
    const paginationContainer = document.getElementById("paginationContainer");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");


    function createWordCard(data) {
        const wordItem = document.createElement("ul");
        wordItem.classList.add("word");
    
        let imageHtml = `<img src="${data.image}">`;
    
        if (data.image_snd) {
            imageHtml += `<img src="${data.image_snd}">`;
        }
    
        wordItem.innerHTML = `
            <li class="word_name">
                <p>${data.name}</p>
                <div class="img_container">
                    ${imageHtml}
                </div>
            </li>
            <li class="word_what"><p>${data.what}</p></li>
            <li class="word_heart">
                <img src="${data.heart_img}">
                <p>${data.heart}</p>
            </li>
        `;

        // 클릭 이벤트 처리
        wordItem.addEventListener("click", function() {
            // 해당 단어 카드의 링크로 이동
            window.location.href = data.link;
        });
    
        wordContainer.appendChild(wordItem);
    }

    function displayPageItems(pageNumber) {
        // 해당 페이지의 아이템들을 보여주는 함수
        wordContainer.innerHTML = ''; // 기존 아이템 제거

        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = wordsData.slice(startIndex, endIndex);

        pageItems.forEach(data => {
            createWordCard(data);
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
            button.addEventListener("click", function() {
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

    // 일반 검색어 없는 것에 대한 초기 설정
    function initializePagination() {
        // 초기 페이지 설정
        const totalPages = Math.ceil(wordsData.length / itemsPerPage);
        let currentPage = 1;

        createPaginationButtons(totalPages, currentPage);
        displayPageItems(currentPage);
    }

    function checkDataAndToggleQuizBtn() {
        const quizBtn = document.querySelector(".quizBtn");
        var quizBtnTxt = document.createElement('p');

        if (wordsData.length < 5 ) {
            quizBtn.classList.add("disabled");
            quizBtnTxt.textContent = "5개 이상 단어를 추가하고 퀴즈에 도전하세요!";
            quizBtn.appendChild(quizBtnTxt);
        } else {
            quizBtn.classList.remove("disabled");
            quizBtnTxt.textContent = "단어 퀴즈 풀고 경험치 쌓으세요!";
            quizBtn.appendChild(quizBtnTxt);
        }
    }

    // 저장된 단어 없을 때 호출되는 함수
    function updateWordContainerVisibility() {
    console.log(2);
        const noWordSection = document.getElementById("noWord");
        const vocabularySection = document.getElementById("vocabulary");
    
        if (wordsData.length === 0){
            vocabularySection.style.display = 'none';
            noWordSection.removeAttribute('hidden');
        } else{
            noWordSection.style.display = 'none';
        }
    }

    // 선택 삭제 버튼 클릭 이벤트 핸들러
    deleteSelectBtn.addEventListener("click", function() {
        const selectedCards = $(".word.selected");

        if ($(deleteSelectBtn).val() === "삭제하기") {
            if (selectedCards.length > 0) {
                var deleteSelectAnswer = confirm('선택한 단어를 삭제하시겠습니까?');
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

    // 단어 카드 클릭 이벤트 핸들러 (이벤트 위임)
    wordContainer.addEventListener("click", function(event) {
        const clickedCard = event.target.closest(".word");

        if (!clickedCard) return; // 클릭된 요소가 단어 카드가 아니면 종료

        if ($(deleteSelectBtn).val() === "삭제하기") {
            event.preventDefault(); // 클릭 이벤트 무시
        }
    });

    // 페이지 로딩 완료 시 호출하여 초기 가시성 설정
    // 초기 페이지 설정 함수 호출
    initializePagination();
    checkDataAndToggleQuizBtn(); // 데이터 개수 체크 및 quizBtn 상태 변경
    updateWordContainerVisibility();

});

