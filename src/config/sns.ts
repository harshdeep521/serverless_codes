import { snsClient } from "../layers/sns";

export const snsCleint  =  process.env.AWS_EXECUTION_ENV?
 require("../layers/sns"
).snsClient : require("/opt/nodejs/sns").snsClient;

