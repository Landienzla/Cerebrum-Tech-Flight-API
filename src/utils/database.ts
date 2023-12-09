import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});

export default pool;

// {
//     "users": {
//       "userId": "Integer (Primary Key, Auto-Increment)",
//       "email": "String (Unique)",
//       "password": "String",
//       "firstName": "String",
//       "lastName": "String",
//       "emailVerified": "Boolean",
//       "verificationToken": "String",
//       "verificationExpires": "DateTime",
//       "passwordResetToken": "String",
//       "passwordResetExpires": "DateTime",
//       "createdAt": "DateTime",
//       "updatedAt": "DateTime",
//       "lastLogin": "DateTime",
//       "status": "String (Optional)"
//     }
//   }

// {
//     "reservations": {
//       "reservationId": "Integer (Primary Key, Auto-Increment)",
//       "userId": "Integer (Foreign Key to users.userId)",
//       "flightId": "String",
//       "seatNumber": "String",
//       "reservationDate": "DateTime",
//       "travelDate": "DateTime",
//       "status": "String",
//       "price": "Decimal",
//       "paymentStatus": "String",
//       "createdAt": "DateTime",
//       "updatedAt": "DateTime"
//     }
//   }
