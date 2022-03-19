
// struct member{
//     id;
//     public key;
//     opendata [];
//     lastmodifytime;
//     signuptime;

// }
// member -> opendata['devicesupplierpublickey'] = ['steps', 'heartbeat','height']
// console.log("test")
//function createmember()
//function changeacc()
//function checkacc()
const express = require('express');
const { is } = require('express/lib/request');
const { type } = require('express/lib/response');
const app = express();
var bodyParser = require('body-parser');
const { Console } = require('console');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => {
    res.send('hello, My Server!')
});

app.get('/form', function(req, res) {
    res.sendfile('./views/form.html');
});

app.post('/signup',urlencodedParser,function(req, res) {
    // console.log("name:" + req.body.name);
    // console.log("publickey:" + req.body.pubkey);
    let newmem = createmember(req.body.name,req.body.pubkey)
    console.log(newmem)
    //res.send(req.body.name + '謝謝你的回覆');
    res.sendfile('signup.html');
});

app.listen(3000, ()=>{
    console.log('the app is running on localhost:3000');
})

class member{
    constructor(name,pubkey,signuptime){
        this.name = name;
        this.id = pubkey;
        this.pubkey = pubkey;
        this.signuptime = signuptime;
        this.opendata =  {};
        this.lastmodifytime = signuptime;
    }

}

function createmember(name,pubkey){
    var currenttime = new Date();
    var a = new member(name,pubkey,currenttime);
    return a;
}

function updateacc(user,dspubkey,data){
    var pk = user.pubkey;
    //比對key??
    //get identity??
    if (user.opendata[dspubkey] != undefined){
        for (var i=0; i<data.length; ++i) {
            user.opendata[dspubkey].push(data[i]);
        }
    }
    else{
        user.opendata[dspubkey] = data;
    }
    var currenttime = new Date();
    user.lastmodifytime = currenttime;
    
}

function checkacc(user,dspubkey,require_data){
    for (var i=0; i<require_data.length; ++i) {
        if(user.opendata[dspubkey].indexOf(require_data[i]) === -1){
            return false;
        }
    }
    return true;

}

function getjwt(check_acc_result,dspubkey,user){

}

let x = createmember('Brad',123);
let y = createmember('mark',24232);
updateacc(x,456,['heartbeat','blood sugar']);
updateacc(x,456,['steps','bodyfat']);
updateacc(x,789,['steps']);
console.log(x)
let jwt = 'jwt';
if (checkacc(x,456,['heartbeat','steps','blood sugar']) == true){
    console.log('jwt');
}


