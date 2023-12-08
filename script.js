

const datas = await fetch("./json_eco.json")
    .then((res) => {
        return res.json();
    })
    .then((data) => data);

function setBarreRemplissage(pourcentage) {
    const barreRemplie = document.querySelector('.barre-remplie');
    barreRemplie.style.height = pourcentage + '%';
}

setBarreRemplissage(30);


function addBarreRemplissage(pourcentage) {
    const barreRemplie = document.querySelector('.barre-remplie');
    let totalPourcentage = pourcentage + parseInt(barreRemplie.style.height.replace("%", ""));
    if (totalPourcentage <= 100) {
        barreRemplie.style.height = totalPourcentage + '%';
    } else {
        barreRemplie.style.height = "100%";

    }

}


function renderQuestion(i) {
    let responsesHtml = "";

    datas.questions[i].responses.forEach(response => {
        responsesHtml += `<button class='reponse' data-fin="${response.fin}" data-img="${response.img}" data-status="${response.status}" data-next="${response.next}">${response.response}</button>\n`
    });

    document.querySelector(".image-principale").innerHTML = `<img src="${datas.questions[i].responses[0].img}" style="max-height: 800px; width: auto;" alt="Image Centrale" class="image-centrale">`

    let response = `
    <p class="question">${datas.questions[i].question}</p>
    <div class="reponses">     
      ${responsesHtml}
    </div>
    `;

    return response;
}

function renderFin(i) {

    let response = `
    <div class="reponses">     
      <h1>${datas.fin[i].explication}</h1>
    </div>
    `;

    return response;
}


function setupButtonListeners() {
    const buttons = document.querySelectorAll('.reponse');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttonRender(button.getAttribute('data-next'), button.getAttribute('data-fin'), button.getAttribute("data-status"), button.getAttribute("data-img"));
        });


        button.addEventListener('mouseover', () => {
            setImg(button.getAttribute('data-img'));
        })
    });
}


function setImg(src) {
    document.querySelector(".image-principale").innerHTML = `<img src="${src}" style="max-height: 800px; width: auto;"  alt="Image Centrale" class="image-centrale">`

}


function jeu() {
    let questionaire = document.querySelector(".questionnaire");
    questionaire.innerHTML = renderQuestion(0);
    setupButtonListeners();
}

function buttonRender(nextIndex, theEnd, status, img) {
    let questionaire = document.querySelector(".questionnaire");

    if(status == 1) {
        addBarreRemplissage(-3);
    } else if(status == 0) {
        addBarreRemplissage(10);
        
    }

    if (nextIndex == "undefined") {
        questionaire.innerHTML = renderFin(theEnd);
        setImg(datas.fin[theEnd].img);
    } else {
        questionaire.innerHTML = renderQuestion(nextIndex);
    }
    setupButtonListeners();

}

jeu();