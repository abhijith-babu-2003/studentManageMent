import { App } from "./app";
import { ConnectMongoDB } from "./config/connectDatabase";

const app = new App();

const database = new ConnectMongoDB();
database.connectDB();

app
  .getApp()
  .listen(3000, () =>
    console.log(`Server is running on http://127.0.0.1:3000`)
  );