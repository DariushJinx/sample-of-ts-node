import * as mongoose from "mongoose";
mongoose
  .connect("mongodb://127.0.0.1:27017/ts-node")
  .then(() => console.log("connected to ts-node DB..."))
  .catch((err) => console.log("error : ", err.message));
