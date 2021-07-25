const express = require("express");

var axios = require("axios").default;

const fs = require('fs');

const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

  //console.log(req.body.speech)

    var options = {
      method: 'GET',
      url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
      params: {text: req.body.speech, to: 'yo', from: 'en'},
      headers: {
        'x-rapidapi-key': process.env.API,
        'x-rapidapi-host': 'nlp-translation.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data.translated_text.yo);

        const newSearch = {
          "search" : req.body.speech,
          "translation" : response.data.translated_text.yo
        };
        
        history[history.length] = newSearch;
        const data = JSON.stringify(history);
        fs.writeFileSync('history.json', data)
        res.render('speechtranslator',{title:"English To Yoruba Translator",translated:response.data.translated_text.yo,history:history})
    }).catch(function (error) {
      console.error(error);
    });

})


app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});
