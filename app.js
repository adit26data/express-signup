const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const port = 3000;
const mailchimp = require("@mailchimp/mailchimp_marketing");
const path = require('path');
const fetch = require('node-fetch');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/index.html', (req, res) => {

    var e = req.body.emailholder;
    var n = req.body.nameholder;
    var n2 = req.body.nameholder2;
    var p = req.body.passholder;
    if (!e || !n || !p) {
        res.redirect('/fail.html');
        return;
    }
    // Construct req data
    const data = {
        members: [
            {
                email_address: e,
                status: 'subscribed',
                merge_fields: {
                    FNAME: n,
                    LNAME: n2
                }
            }
        ]
    };
    const postData = JSON.stringify(data);
    fetch('https://us21.api.mailchimp.com/3.0/lists/9885e33326', {
        method: 'POST',
        headers: {
            Authorization: 'auth a8962efb960cc3fef76a4dd316221b3c-us21'
        },
        body: postData
    })
        .then(res.statusCode === 200 ?
            res.redirect('/success.html') :
            res.redirect('/fail.html'))
        .catch(err => console.log(err))
});
app.listen(port, () => {
    console.log(`listening on post${port}`)
})
