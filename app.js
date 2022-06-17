
const apiKey = `TSmDHdMHXeYxp0Eq3TJcVS9elfjstb2L`;

let gifData = ``;
let searchParam = ``;
let pages = 0;
let limit = 10;
let offset = pages * limit;

function loadResults() {
    ++pages;
    offset = pages * limit;
    fetchGifs();
}

function renderGifs() {
    gifData.data.forEach((row, index) => {
        document.getElementById('results').innerHTML += `
        <div class="gif">
            <img src=${gifData.data[index].images.original.url} >
        </div>
        `
    });
    var load = document.getElementById("load");
    load.style.display = "flex";
    load.addEventListener('click', (event) => {
        loadResults();
    })
}

async function fetchGifs() {
    searchParam = document.getElementById('search').value
    const response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchParam}&limit=${limit}`)
    const results = await response.json();
    gifData = results;
    renderGifs();
}

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault()
    fetchGifs()
})
