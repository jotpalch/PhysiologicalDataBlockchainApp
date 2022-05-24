var express = require("express");
var router = express.Router();

const mongo = require("mongodb").MongoClient;
const url =
  "mongodb://admin:69251@ec2-54-201-240-164.us-west-2.compute.amazonaws.com:27017/?authSource=admin&readPreference=primary&serverSelectionTimeoutMS=2000&appname=mongosh%201.3.0&directConnection=true&ssl=false";
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
  res.status(200).send(result).end();
});

router.get("/:publickey", async (req, res) => {
  console.log(req.params.publickey);
  const col = db.collection(req.params.publickey);
  const result = await col.find({}).toArray();
  res.status(200).send(result).end();
});

router.get("/:publickey/:attr", async (req, res) => {
  const col = db.collection(req.params.publickey);
  // const result = await col.find({ name: req.params.attr }).toArray();
  const result = await col.find({ [req.params.attr]: { $gt: 0 } }).toArray();
  res.status(200).send(result).end();
});

module.exports = router;
