const express = require("express");
const cors = require("cors");
const connectToMongoDb = require("./connection");
const {productRouter} = require("./routes/product")
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL
connectToMongoDb(mongoUrl).then(() => console.log("MongoDb Connected")).catch(() => console.log("MongoDb disconnected"));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/products", productRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
