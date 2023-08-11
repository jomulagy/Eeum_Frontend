document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const wordContainer = document.getElementById("wordContainer");
    const searchButton = document.getElementById("searchButton");
    const resultTitle = document.getElementById("resultTitle")
    const wordsData = [
        {
            index: 1,
            name: "~라고 할뻔",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "하고싶은 말 뒤에 쓴다",
            heart: 30,
            heart_img: "/static/img/imoge/heartred.png",
            link: "practice.html"
        },
        {
            index: 2,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_20.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 21,
        },
        {
            index: 3,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 25,
        },
        {
            index: 4,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 27,
        },
        {
            index: 5,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 29,
        },
        {
            index: 6,
            name: "~라고 할뻔",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "하고싶은 말 뒤에 쓴다",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 28,
        },
        {
            index: 7,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 8,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 9,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 10,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 11,
            name: "~라고 할뻔",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "하고싶은 말 뒤에 쓴다",
            heart: 24,
            heart_img: "/static/img/imoge/heartred.png",
            link: "practice.html"
        },
        {
            index: 12,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 13,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 14,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 15,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 16,
            name: "~라고 할뻔",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "하고싶은 말 뒤에 쓴다",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 17,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 18,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 19,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 20,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
    ]; // 데이터 배열

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

    // 카드생성 창
    function displayMatchingWords(searchTerm) {
        wordContainer.innerHTML = ''; // 초기화

        const matchingWords = wordsData.filter(data =>
            data.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        matchingWords.forEach(data => {
            createWordCard(data);
        });
    }


    searchButton.addEventListener("click", function() {
        const searchTerm = searchInput.value.trim();
        // 초기화
        wordContainer.innerHTML = '';

        if (searchTerm === "") {
            window.location.href = "/templates/main_templates/main_dictionary_view.html";
        } else {
            resultTitle.textContent = "검색 결과";
            displayMatchingWords(searchTerm);
        }
    });
});
