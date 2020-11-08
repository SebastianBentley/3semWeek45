let URL_P = "http://localhost:8080/webscraper/api/scrape/parallel/";
let URL_S = "http://localhost:8080/webscraper/api/scrape/sequental/";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

const getToken = () => {
    return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
}


const makeOptions = (method, addToken, body) => {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json',
        }
    }
    if (addToken && loggedIn()) {
        opts.headers["x-access-token"] = getToken();
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

function getScrapeParallel() {
    const options = makeOptions("GET", true);
    return fetch(URL_P, options)
    .then(handleHttpErrors)
}

function getScrapeSequental(){
    return fetch(URL_S)
    .then(handleHttpErrors)
}

const scrapeFacade = {
   getScrapeParallel,
   getScrapeSequental
}

export default scrapeFacade;