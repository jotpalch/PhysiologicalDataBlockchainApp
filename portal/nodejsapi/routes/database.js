var express = require("express");
var router = express.Router();

const mongo = require("mongodb").MongoClient;
const url =
  "mongodb://admin:69251@ec2-34-221-6-169.us-west-2.compute.amazonaws.com:27017/?authSource=admin&readPreference=primary&serverSelectionTimeoutMS=2000&appname=mongosh%201.3.0&directConnection=true&ssl=false";
let db = null;

mongo.connect(url, async (err, client) => {
  if (err) {
    throw err;
  }
  db = await client.db("RealTime_BigData");
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

router.get("/:collection", async (req, res) => {
  console.log(req.params.collection);
  const col = db.collection(req.params.collection);
  const result = await col.find({}).toArray();
  res.status(200).send(result).end();
});

router.get("/:collection/:pk", async (req, res) => {
  console.log(req.params.collection);
  const col = db.collection(req.params.collection);
  const result = await col.find({ DID_Public_Key: req.params.pk }).toArray();
  res.status(200).send(result).end();
});

module.exports = router;
