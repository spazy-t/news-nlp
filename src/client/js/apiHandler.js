function nlpRequest(formUrl) {
    postData('/apiRequest', {url: formUrl})
    .then((data) => {
        displayData(data)
    })
}

function displayData(articleData) {
    let articleText
    let articlePol
    let articleSub
    let articleLang

    //parse json from api query and catch any errors
    try {
        articleText = articleData[2].result.sentences
        articlePol = articleData[1].result.polarity
        articleSub = articleData[1].result.subjectivity
        articleLang = articleData[0].result.lang
    } catch (error) {
        alert('There was an error with the url please try again or another url')
        return
    }

    //dom objects to manipulate
    const pol = document.querySelector('.polarity')
    const extra = document.querySelector('.extra')
    const article = document.querySelector('article')

    //populate dom objects
    pol.innerText = `This article is ${articlePol}`

    extra.innerText = `Subjectivity: ${articleSub}
    Language: ${articleLang}`

    article.innerText = ''
    articleText.forEach(sentence => {
        article.innerHTML += `<p>${sentence}</p>`;
    })
}

const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    try {
        const articleData = await res.json();
        return articleData;
    } catch (error) {
        console.log('error', error)
    }
}

module.exports = displayData
export { nlpRequest }