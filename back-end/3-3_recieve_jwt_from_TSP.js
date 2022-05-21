const jwt = require('jsonwebtoken');
const { is } = require('express/lib/request');
const { type } = require('express/lib/response');
const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
