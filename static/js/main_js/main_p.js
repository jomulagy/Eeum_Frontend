const wordContainerRecent = document.getElementById("wordContainerRecent");


function createWordCard_snd(item) {
    console.log(item)
    $.each(item, function (index, data) {
        const wordItem = document.createElement("ul");
        wordItem.classList.add("word");

        const age = data.age; // Assume age is an array containing age values

        let imageHtml = ""; // Initialize imageHtml variable

        if (age[0] === 10) {
            imageHtml += `<img src="../static/img/age/age_10.png">`;
        } else if (age[0] === 20) {
            imageHtml += `<img src="../static/img/age/age_20.png">`;
        } else if (age[0] === 30) {
            imageHtml += `<img src="../static/img/age/age_30.png">`;
        } else if (age[0] === 40) {
            imageHtml += `<img src="../static/img/age/age_40.png">`;
        } else if (age[0] === 50) {
            imageHtml += `<img src="../static/img/age/age_50.png">`;
        }

        if (age[1]) {
            if (age[1] === 10) {
                imageHtml += `<img src="../static/img/age/age_10.png">`;
            } else if (age[1] === 20) {
                imageHtml += `<img src="../static/img/age/age_20.png">`;
            } else if (age[1] === 30) {
                imageHtml += `<img src="../static/img/age/age_30.png">`;
            } else if (age[1] === 40) {
                imageHtml += `<img src="../static/img/age/age_40.png">`;
            } else if (age[1] === 50) {
                imageHtml += `<img src="../static/img/age/age_50.png">`;
            }
        }

        wordItem.innerHTML = `
            <li class="word_name">
                <p>${data.title}</p>
                <div class="img_container">
                    ${imageHtml}
                </div>
            </li>
            <li class="word_what"><p>${data.mean}</p></li>
            <li class="word_heart">
                <img src="../static/img/imoge/heartred.png">
                <p>${data.likes}</p>
            </li>
        `;

        // 클릭 이벤트 처리
        wordItem.addEventListener("click", function () {
            // 해당 단어 카드의 링크로 이동
            if (data.link) {
                window.location.href = data.link;
            }
        });



        wordContainerRecent.appendChild(wordItem);
    })


}

//ajax 시작=========================================
$.ajax({
    url: 'http://3.34.3.84/api/word/all/',
    type: "GET",
    dataType: "JSON",
    headers: {},

    success: function (result) {
        console.log(JSON.stringify(result));
        createWordCard_snd(result.data.word);
    },

    error: function (xhr, textStatus, thrownError) {
        alert(
            "Could not send URL to Django. Error: " +
            xhr.status +
            ": " +
            xhr.responseText
        );
    },
})
//ajax 끝===========================================


