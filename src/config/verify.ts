export const verifyClient = process.env.AWS_EXECUTION_ENV?
require("../layers/verify").jwtVerify : require('/opt/nodejs/verify').jwtVerify;