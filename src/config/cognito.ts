export const cognitoClient = process.env.AWS_EXECUTION_ENV?
require("../layers/cognito").cognito: require("/opt/nodejs/cognito").cognito;