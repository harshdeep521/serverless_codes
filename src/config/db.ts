// src/config/db.ts
const dbClient = process.env.AWS_EXECUTION_ENV
  ? require("../layers/nodejs/db").dbClient: require("/opt/nodejs/db").dbClient;

  console.log('db',dbClient);
export { dbClient };