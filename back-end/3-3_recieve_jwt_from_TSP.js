const jwt = require('jsonwebtoken');
const { is } = require('express/lib/request');
const { type } = require('express/lib/response');
const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/form",function(req,res){                          //Data requester輸入需要之資料型態
    res.sendfile('views/form_for_require_data.html')
});

app.post('/data',urlencodedParser,async function(req, res) {   


});

app.listen(3001,function(){
    console.log("server start at port 3001");
});