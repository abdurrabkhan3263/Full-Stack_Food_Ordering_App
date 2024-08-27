import app from "./app.js";
import errorMiddleware from "./middleware/error.middleware.js";
import connection from "./service/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "./env" });

app.use(errorMiddleware);
connection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Server is listen on || ",
        `http://localhost:${process.env.PORT}`
      );
    });
    app.on("error", (error) => {
      console.error("ERROR :: ", error);
    });
  })
  .catch((error) => {
    console.error("Server  Connection error || ", error);
  });
