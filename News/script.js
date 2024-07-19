const apikey = '';

const blogContainer = document.getElementById('blog-container');
const search = document.getElementById('search-input');
const btn = document.getElementById('search-button');

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apikey}&q=pizza`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error);
        return [];
    }
}

btn.addEventListener('click', async () => {
    const query = search.value.trim();

    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching by query: ", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apikey}&q=${query}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const div = document.createElement('div');
        div.classList.add('blog-card');

        console.log(article);

        if (article.image_url) {
            const img = document.createElement('img');
            img.src = article.image_url;
            img.alt = article.title;
            div.appendChild(img);
        } else {
            console.log('No image URL for article:', article.title);
        }

        const title = document.createElement('h2');
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        title.textContent = truncatedTitle;

        div.appendChild(title);

        if (article.description) {
            const description = document.createElement('p');
            description.textContent = article.description;
            div.appendChild(description);
        } else {
            console.log('No description for article:', article.title);
        }

        div.addEventListener('click', () => {
            if (article.url) {
                console.log('Opening URL:', article.url); // Log the URL to verify it's correct
                window.open(article.url, "_blank");
            } else {
                console.log('No URL for article:', article.title);
            }
        });

        blogContainer.appendChild(div);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.log('Unable to fetch data', error);
    }
})();
