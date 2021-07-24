const express = require("express");

const fs = require('fs');

const bodyParser = require("body-parser");

const translate = require('@vitalets/google-translate-api');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

let history = [];
let json_history = JSON.parse(fs.readFileSync('./history.json'));

for (var i in json_history){
  history.push(json_history[i]);
};


app.get('/',(req,res) => {
  res.render('speechtranslator',{title:"English To Yoruba Translator",history:history, translated:""})
})

app.post('/speechtranslator',(req,res) => {

  console.log(req.body.speech)

  translate(req.body.speech, {to: req.body.language}).then(response => {
    console.log(response.text);
    const newSearch = {
      "search" : req.body.speech,
      "translation" : response.text
    };

    history[history.length] = newSearch;
    const data = JSON.stringify(history);
    fs.writeFileSync('history.json', data)
    res.render('speechtranslator',{title:"English To Yoruba Translator",translated:response.text,history:history})
      }).catch(err => {
          console.error(err);
      });

  })


app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});