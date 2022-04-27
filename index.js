// Importing Modules.
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const cors = require('cors');


// Application Setup.
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// Getting News.

app.get('/news', (req, res) => {

    axios('https://www.ntv.co.ug/ntvlive/4522052-4522052-gb6xt4z/index.html')
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            let newsArticles = [];

            $('.desc', html).each(function() {
                const title = $(this).text();
                const url = $(this).find('a').attr('href');

                newsArticles.push({
                    title,
                    url
                })
            });

            res.json(newsArticles);
        })

})


// Test Route.
app.get('/', (req, res) => { res.send('Welcome to the National News API. Get Latest News on what is happening around Uganda via trusted news platforms in the country. ') })

// Server Initialization.
app.listen(PORT, () => { console.log(`Server Application Running at http://localhost:${PORT}`); });