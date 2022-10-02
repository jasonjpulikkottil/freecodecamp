require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const isUrl=require('is-url');
const bodyParser=require('body-parser');

const surl={};
let counter=0;
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
 const url=req.body.url;
  if(!isUrl(url)){
     res.send({ error :'Invalid Url'});
    return;
  }
  counter += 1;
  surl[counter]=url;
 
  res.send({ original_url : url, short_url : counter})
});

app.get('/api/shorturl/:id', function(req, res) {
 const id=req.params.id;
  console.log(surl);
  
  res.redirect(surl[id]);
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
