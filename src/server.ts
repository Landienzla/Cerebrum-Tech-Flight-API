import app from "./app";
require("dotenv").config();
import database from "./utils/database";
// @ts-ignore
import { logInfo, logError } from "./utils/logger";

const port = process.env.PORT || 3001;
app.listen(port, async () => {
  logInfo(`Server listening on port ${port}`);
  try {
    await database.query("SELECT NOW()"); // Simple query to check the connection
    logInfo("Connected to the database"); // If successful, log this message
  } catch (error) {
    logError("Failed to connect to the database"); // If error, log this message
    console.error(error); // Also log the error stack
  }
});
