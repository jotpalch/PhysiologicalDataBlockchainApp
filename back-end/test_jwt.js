const jwt = require('jsonwebtoken');
const { MongoClient } = require("mongodb");

async function main(){
    const uri = "mongodb://admin:69251@ec2-34-221-6-169.us-west-2.compute.amazonaws.com:27017/?authSource=admin&readPreference=primary&serverSelectionTimeoutMS=2000&appname=mongosh%201.3.0&directConnection=true&ssl=false";
    const client = new MongoClient(uri);

    try{
        await client.connect();
        //create jwt內容
        Header = {
            "alg": "HS256",     //產生簽章使用之演算法
            "typ": "JWT"        //token種類
        }
        
        payload = {
            "_id": "8KkAzQcZ2fOMmnNP7TfFOqCX1OteQ56y",  //欲蒐集之使用者的publickey
            "collection_type" : ["Blood_Oxygen" , "Blood_Pressure", "Weight"]
        }
        
        // 設定密鑰
        const SECRET = 'thisismynewproject'
        // 建立 Token
        const token = jwt.sign({ _id: payload._id.toString(),collection_type: payload.collection_type}, SECRET, { expiresIn: '1 day' })
        console.log(token);
        //透過密鑰解碼
        const decoded = jwt.verify(token, SECRET);
        console.log(decoded);        
        await findOneListingByid(client, decoded._id, decoded.collection_type);
    }catch(e){
        console.error(e);
    }finally{
        await client.close();    }


}
main().catch(console.error);
async function listDatabases(client){
    const databaseList = await client.db().admin().listDatabases();

    console.log("Database:");
    databaseList.databases.forEach(db => {
        console.log(db.name);
        
    });
}
async function findOneListingByid(client,id_list,collection_type){
    console.log(id_list);
    console.log(collection_type);
    for (var i = 0; i<collection_type.length; ++i){
        const result = await client.db("users").collection(collection_type[i]).findOne( { DID_Public_Key : id_list });
        if(result){
            console.log(id_list);
            console.log(result)
        }
        else{
            console.log("no",collection_type[i],"data in database");
        }
    }

}
