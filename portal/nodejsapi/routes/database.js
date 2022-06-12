var express = require("express");
var router = express.Router();

const mongo = require("mongodb").MongoClient;
const url =
  "mongodb://admin:69251@ec2-34-213-172-255.us-west-2.compute.amazonaws.com:27017/?authSource=admin&readPreference=primary&serverSelectionTimeoutMS=2000&appname=mongosh%201.3.0&directConnection=true&ssl=false";
let db = null;
let data = null ;

mongo.connect(url, async (err, client) => {
  if (err) {
    throw err;
  }
  db = await client.db("APPLE");
  data = client.db("DATA");
  console.log("Database connected");
});

router.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "[ Blood_Oxygen, Blood_Pressure, Body_Temperature, Heart_Beats, Step_Counts ] "
    )
    .end();
});


router.get("/provider", async (req, res) => {
  console.log(req.params.publickey);
  const col = data.collection("Providers");
  const result = await col.find({}).toArray();
  res.status(200).send(result[0]['list']).end();
});

router.post("/getpk", async (req, res) => {
  console.log(req.params.publickey);
  const col = data.collection("AccToPk");
  const result = await col.find({ account: req.body.account }).toArray();
  res.status(200).send(result[0]).end();
});

router.post("/bind", async (req, res) => {
  console.log(req.body);
  const col = data.collection("AccToPk");
  const insert = await col.insertOne(req.body);
  res.status(200).send("sussess").end();
});

router.get("/:publickey", async (req, res) => {
  console.log(req.params.publickey);
  const col = db.collection(req.params.publickey);
  const result = await col.find({}).toArray();
  res.status(200).send(result).end();
});

router.get("/:publickey/:provider/:attr", async (req, res) => {
  mongo.connect(url, async (err, client) => {
    if (err) {
      throw err;
    }
    db = await client.db(req.params.provider);
    console.log("Database connected", req.params.provider);
  });
  const col = db.collection(req.params.publickey);
  // const result = await col.find({ name: req.params.attr }).toArray();
  const result = await col.find({ [req.params.attr]: { $gt: 0 } }).toArray();
  db.close;
  res.status(200).send(result).end();
  
});

module.exports = router;
