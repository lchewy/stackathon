const express = require('express');
// const volley = require('volleyball');
const path = require('path');

const app = express();
// app.use(volley);


app.use(express.static(path.join(__dirname, "./")));

// app.get('/', function(req, res, next){
//   res.send('index.html');
// })

app.listen(process.env.PORT || 1337, function(){
  console.log('Listening to port 1337');
})