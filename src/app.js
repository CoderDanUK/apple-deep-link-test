const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 5000;

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

const getAppleAppSiteAssociation = () => {
    const appleAppSiteAssociation = fs.readFileSync(path.join(__dirname, 'static/apple-app-site-association.json'), (err, data) => {
        console.log('reading file')
        if (err) {
            console.error(err)
            return `{"error": "${err}""}`
        }
        else {
            return data
        }
    })

    return appleAppSiteAssociation
}

app.get('/.well-known/apple-app-site-association', (req, res) => {
    const json = JSON.parse(getAppleAppSiteAssociation())
    res.json(json)
})

app.get('/', (req, res) => {
    res.render('index', {openingApp: false})
})

app.get('/your-account/', (req, res) => {
    res.render('index', {openingApp: true})
})

app.listen(PORT, () => {
    console.log(`Example app listening at https://localhost:${PORT}`)
})