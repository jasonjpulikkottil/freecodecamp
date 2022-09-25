let express = require('express');
let app = express();
const bodyParser = require('body-parser');

console.log("Hello World");
app.use('/public',express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
  console.log(req.method +" "+ req.path+" - " +req.ip);
  next();
}
)

app.get('/:word/echo',function(req, res) {
  
  res.json({echo:req.params.word});
})
app.route('/name')
  .get(function(req,res){
  res.json({name: req.query.first +" "+req.query.last })
})
.post(function(req,res){
  res.json({name: req.body.first +" "+req.body.last })
});


app.get('/now',function(req, res, next) {
  req.time=new Date().toString();
  next();
},function(req,res){
 res.json({time:req.time})
}
)


app.get("/json", (req, res) => { let message = "Hello json"; (process.env.MESSAGE_STYLE == "uppercase") ? message=message.toUpperCase() : message=message; res.json({"message": message}); });

app.get('/',function(req, res) {
  var path=__dirname + '/views/index.html';
  res.sendFile(path);
})




































 module.exports = app;
