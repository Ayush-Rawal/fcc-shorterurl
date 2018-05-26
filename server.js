const express = require('express')
const app = express()
const shortURLs = {
    count: 0
}

app.get('/:url', (req, res) => {
    if (shortURLs.hasOwnProperty(req.params.url)) {
        res.redirect(shortURLs[req.params.url])
    } else {
        res.status(404).end()
    }
})

app.get(/\/new\/(http(|s):\/\/\w+.\w+)/, (req, res) => {
    shortURLs[++ shortURLs.count] = req.params[0]
    res.status(200).json({
        "original_url": req.params[0],
        "short_url": shortURLs.count
    })
})

app.listen(process.env.PORT || 8080, () => console.log(`Server listening on ${process.env.PORT || 8080}`))