const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname+'/dist/bugs123'));

app.listen(process.env.PORT || 8080);

//Path location strategy
app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname + '/dist/bugs123/index.html'));
});

console.log('Application listening.');
