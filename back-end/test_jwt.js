const jwt = require('jsonwebtoken');
const { is } = require('express/lib/request');
const { type } = require('express/lib/response');
const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/form",function(req,res){                          //Data requester輸入需要之資料型態
    res.sendfile('back-end/views/form.html')
});

app.post('/signup',urlencodedParser,async function(req, res) {   
    let newmem = create_request(req.body.name,req.body.pubkey,req.body.collection_type)
    let collect_detail = newmem.collection_type;
    collect_detail_f = collect_detail.split(",");
    var dataindb = new Array();
    for(var i = 0;i<collect_detail_f.length;++i){
        dataindb[i] = await CheckDataInDB(newmem.pubkey,collect_detail_f[i]);
    }
    let checker = arr => arr.every(v => v === true);
    if(checker(dataindb)){
        create_jwt(collect_detail_f);
        res.sendfile('back-end/views/request_success.html')
    }
    else{
        res.sendfile('back-end/views/request_fail.html');
    }

});

app.listen(3000,function(){
    console.log("server start at port 3000");
});

class request_message{
    constructor(name,pubkey,collection_type){
        this.name = name;
        this.pubkey = pubkey;
        this.collection_type = collection_type;
    }

}

function create_request(name,pubkey,collection_type){
    var a = new request_message(name,pubkey,collection_type);
    return a;
}

// async function main(){
//     const uri = "mongodb://admin:69251@ec2-34-221-6-169.us-west-2.compute.amazonaws.com:27017/?authSource=admin&readPreference=primary&serverSelectionTimeoutMS=2000&appname=mongosh%201.3.0&directConnection=true&ssl=false";
//     const client = new MongoClient(uri);

//     try{
//         await client.connect();
//         //create jwt內容
//         Header = {
//             "alg": "HS256",     //產生簽章使用之演算法
//             "typ": "JWT"        //token種類
//         }
//         payload = {
//             "_id": "8KkAzQcZ2fOMmnNP7TfFOqCX1OteQ56y",                                  //欲蒐集之使用者的publickey
//             "collection_type" : ["Blood_Oxygen" , "Blood_Pressure", "Weight"]           //欲蒐集之資料type
//         }
        
//         // 設定密鑰
//         const SECRET = 'thisismynewproject'
//         // 建立 Token
//         const token = jwt.sign({ _id: payload._id.toString(),collection_type: payload.collection_type}, SECRET, { expiresIn: '1 day' })
//         console.log(token);
//         //透過密鑰解碼
//         const decoded = jwt.verify(token, SECRET);
//         console.log(decoded);        
//         await findOneListingByid(client, decoded._id, decoded.collection_type);
//     }catch(e){
//         console.error(e);
//     }finally{
//         await client.close();    }


// }
// main().catch(console.error);

// async function listDatabases(client){
//     const databaseList = await client.db().admin().listDatabases();

//     console.log("Database:");
//     databaseList.databases.forEach(db => {
//         console.log(db.name);
        
//     });
// }
async function CheckDataInDB(id_list,collection_type){
    const uri = "mongodb://admin:69251@ec2-34-221-6-169.us-west-2.compute.amazonaws.com:27017/?authSource=admin&readPreference=primary&serverSelectionTimeoutMS=2000&appname=mongosh%201.3.0&directConnection=true&ssl=false";
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
function create_jwt(collection_type){
    Header = {
        "alg": "HS256",                              //產生簽章使用之演算法
        "typ": "JWT"                                 //token種類
    }
    payload = {
        "_id": "8KkAzQcZ2fOMmnNP7TfFOqCX1OteQ56y",   //欲蒐集之使用者的publickey
        "collection_type" : collection_type          //欲蒐集之資料type
    }
    
    // 設定密鑰
    const SECRET = 'thisismynewproject'
    // 建立 Token
    const token = jwt.sign({ _id: payload._id.toString(),collection_type: payload.collection_type}, SECRET, { expiresIn: '1 day' })
    console.log(token); 
}

