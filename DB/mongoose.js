const express = require("express");
const mongoose = require("mongoose");
URL = process.env.DB_URL;

mongoose
    .connect(URL)
    .then(() => console.log("Connected To Database"))
    .catch(() => console.log("Can't Connect To Database"));
