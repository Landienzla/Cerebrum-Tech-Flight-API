import database from "./database";
import { logError, logInfo } from "./logger";

async function createTables() {
  const users = `
        CREATE TABLE IF NOT EXISTS users (
            "userId" SERIAL PRIMARY KEY,
            "email" VARCHAR(255) UNIQUE NOT NULL,
            "password" VARCHAR(255) NOT NULL,
            "firstName" VARCHAR(100),
            "lastName" VARCHAR(100),
            "emailVerified" BOOLEAN DEFAULT false,
            "verificationToken" VARCHAR(255),
            "verificationExpires" TIMESTAMP,
            "passwordResetToken" VARCHAR(255),
            "passwordResetExpires" TIMESTAMP,
            "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            "lastLogin" TIMESTAMP,
            "status" VARCHAR(50)
        );
    `;
  let tables = [
    {
      name: "users",
      query: users,
      // check_exists: "SELECT * FROM users LIMIT 1",
    },
  ]; // can add more tables here
  for await (let table of tables) {
    // for await is used to iterate over async functions
    try {
      // if (database.query(table.check_exists)) {
      //   // check if table exists, if yes, continue
      //   continue;
      // }
      await database.query(table.query);
      logInfo(`Table ${table.name.toUpperCase()} created successfully.`);
    } catch (error) {
      logError(`Error in creating ${table.name.toUpperCase()} table.`);
      throw error;
    }
  }
  logInfo("All tables created successfully.");
}

export default createTables;
