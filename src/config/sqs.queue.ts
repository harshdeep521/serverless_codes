const sqsCleint  =  process.env.AWS_EXECUTION_ENV?
 require("../layers/nodejs/sqs"
).client : require("/opt/nodejs/sqs").client;

export default sqsCleint