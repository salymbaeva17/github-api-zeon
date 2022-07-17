const username = document.querySelector('.username')
const perPage = document.querySelector('.per-page')
const order = document.getElementById('order')
const sort = document.getElementById('sort')
const searchBtn = document.getElementById('search-btn')
const row = document.getElementById('row')
const pagination = document.querySelector('.pagination-ul')
const favBtns = document.querySelectorAll('.favorite')
let itemNumber = 0;

async function getUsers(url = `https://api.github.com/search/users?q=${username.value}in:user&order=${order.value}&sort=${sort.value}&page=${itemNumber}&per_page=${perPage.value}`) {
    clear()
    const response = await fetch(url)
    const result = await response.json()
    const link = response.headers.get('link')
    const links = link.split(',')
    const urls = links.map(a => {
        return {
            url: a.split(';')[0].replace('<', '').replace('>', ''),
            title: a.split(';')[1].trim()
        }
    })
    result.total_count === 0 ? row.innerHTML = `<h5>No such results!</h5>` :
        result?.items?.forEach(item => {
            console.log(result)
            const {avatar_url, html_url, login,} = item
            row.innerHTML += !item ? ` <div id="loader"></div>`
                : `<div id="user" class="row row-cols-1 mt-4 bg-light p-4 mx-0 rounded-2 align-items-center">
                                <div class="col-md-1">
                                    <img id='user-avatar' src=${avatar_url} class="img-fluid rounded-start" alt="user image">
                                </div>
                                <div class="col-md">
                                    <div class="card-body d-flex justify-content-between p-0">
                                        <div class="d-flex flex-column justify-content-between">
                                            <h5 class="card-title">${login}</h5>
                                            <a href=${html_url} target="_blank" class="card-text">Link to GitHub</a>
                                        </div>
                                        <div class="d-flex flex-column justify-content-between">
                                            <button class="btn btn-secondary p-1 mb-2 favorite">
                                                <svg class="d-flex align-items-center justify-content-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                    <path fill='white' d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
                                                </svg>
                                            </button>
                                            <a href="./userInfo.html" id="reposUrl" class="btn btn-dark py-1 px-3">Show repositories</a>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        })
    urls.map(i => {
        const btn = document.createElement('button')
        btn.textContent = i.title.slice(5, -1)
        btn.classList.add('btn')
        btn.classList.add('btn-success')
        btn.classList.add('mx-2')
        btn.addEventListener('click', () => getUsers(i.url))
        pagination.children.length<4&&pagination.appendChild(btn)
    })
}

searchBtn.addEventListener('click', () => getUsers())

function clear() {
    while (row.firstChild) {
        row.innerHTML = ''
    }
}
favBtns.forEach(btn => btn.addEventListener('click', (e) => {
    console.log(e.target)
}))