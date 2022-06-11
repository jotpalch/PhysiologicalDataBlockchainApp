const jwt = require('jsonwebtoken');
'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCCPOrg1, buildWallet } = require('../test-application/javascript/AppUtil.js');
const { is } = require('express/lib/request');
const { type } = require('express/lib/response');
const { MongoClient } = require("mongodb");
const express = require("express");

const app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/form",function(req,res){                          //Data requester輸入需要之資料型態
    res.sendfile('views/form_for_require_jwt.html')
});

app.post('/request',urlencodedParser,async function(req, res) {   
    let newmem = create_request(req.body.name,req.body.pubkey,req.body.user_pubkey_list,req.body.collection_type,req.body.provider)
    let collect_detail = newmem.collection_type;
    let pubkey = newmem.pubkey;
    let user_pubkey_list = newmem.user_pubkey_list;
    let provider = newmem.provider;
    collect_detail_f = collect_detail.split(",");
    user_pubkey_list_f = user_pubkey_list.split(",");
    var data_available = new Array();
    //需改成check ACL
    for(var i = 0;i<collect_detail_f.length;++i){
        data_available[i] = await Check_ACL_On_Chain(pubkey,collect_detail_f[i],provider);
    }
    
    let checker = arr => arr.every(v => v === true);
    if(checker(data_available)){
        var token = create_jwt(collect_detail_f,pubkey);
        res.send('<p id = "copy">' + token + '</p>' +  '<button type="button" onclick="copyEvent(`copy`)">Copy</button>' + 
        '<script>' + 
            'function copyEvent(id)' + 
            '{' + 
                'var str = document.getElementById(id);' + 
                'window.getSelection().selectAllChildren(str);'+
                'document.execCommand("Copy")'+
            '}' + 
        '</script>' + '<input type="button" value="Go back!" onclick="history.back()">');
    }
    else{
        res.sendfile('views/request_fail.html');
    }

});

app.listen(3000,function(){
    console.log("server start at port 3000");
});

class request_message{
    constructor(name,pubkey,user_pubkey_list,collection_type,provider){
        this.name = name;
        this.pubkey = pubkey;
        this.user_pubkey_list = user_pubkey_list;
        this.collection_type = collection_type;
        this.provider = provider;
    }

}

function create_request(name,pubkey,user_pubkey_list,collection_type,provider){
    var a = new request_message(name,pubkey,user_pubkey_list,collection_type,provider);
    return a;
}

//這裡要改成去鏈上check
async function Check_ACL_On_Chain(id_list,collection_type){

    const uri = "mongodb://admin:69251@ec2-54-191-160-29.us-west-2.compute.amazonaws.com:27017/?authSource=admin&readPreference=primary&serverSelectionTimeoutMS=2000&appname=mongosh%201.3.0&directConnection=true&ssl=false";
    const client = new MongoClient(uri);
    try{
        await client.connect();
        console.log(collection_type);
        const result =  await client.db("users").collection(collection_type).findOne( { DID_Public_Key : id_list });
        if(result){
            return true;
        }
        else{
            return false;
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }

}

function create_jwt(collection_type,pubkey){
    Header = {
        "alg": "SHA256",                              //產生簽章使用之演算法
        "typ": "JWT"                                 //token種類
    }
    payload = {
        "_id": "8KkAzQcZ2fOMmnNP7TfFOqCX1OteQ56y",   //欲蒐集之使用者的publickey
        "collection_type" : collection_type          //欲蒐集之資料type
    }
    
    // 設定密鑰
    const SECRET = pubkey;
    // 建立 Token
    // token = jwt.encode({'user_id': 123}, private_key, algorithm='RS256')
    const token = jwt.sign({ _id: payload._id.toString(),collection_type: payload.collection_type}, SECRET, { expiresIn: '1 day' })
    console.log(token);
    return token;
}

