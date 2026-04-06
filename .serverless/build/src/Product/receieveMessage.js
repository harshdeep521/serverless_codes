var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/layers/nodejs/sqs.ts
var sqs_exports = {};
__export(sqs_exports, {
  client: () => client
});
import { SQSClient } from "@aws-sdk/client-sqs";
var client;
var init_sqs = __esm({
  "src/layers/nodejs/sqs.ts"() {
    "use strict";
    client = new SQSClient();
  }
});

// src/layers/nodejs/db.ts
var db_exports = {};
__export(db_exports, {
  dbClient: () => dbClient
});
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
var dynamo, dbClient;
var init_db = __esm({
  "src/layers/nodejs/db.ts"() {
    "use strict";
    dynamo = new DynamoDBClient({ region: "us-east-1" });
    dbClient = DynamoDBDocumentClient.from(dynamo);
  }
});

// src/config/sqs.queue.ts
var sqsCleint = process.env.AWS_EXECUTION_ENV ? (init_sqs(), __toCommonJS(sqs_exports)).client : __require("/opt/nodejs/sqs").client;
var sqs_queue_default = sqsCleint;

// src/Product/receieveMessage.ts
import { ReceiveMessageCommand as ReceiveMessageCommand2 } from "@aws-sdk/client-sqs";

// src/config/db.ts
var dbClient2 = process.env.AWS_EXECUTION_ENV ? (init_db(), __toCommonJS(db_exports)).dbClient : __require("/opt/nodejs/db").dbClient;
console.log("db", dbClient2);

// src/Product/receieveMessage.ts
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
var handler = async (event) => {
  const datas = await sqs_queue_default.send(new ReceiveMessageCommand2({
    QueueUrl: process.env.InventoryQueue,
    VisibilityTimeout: 30,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20
  }));
  if (datas.Messages) {
    for (let data of datas.Messages) {
      console.log(JSON.parse(data.Body));
      console.log({
        TableName: "Inventory",
        Key: {
          PK: "product#" + JSON.parse(data.Body).id,
          SK: "MetaData"
        }
      });
      await dbClient2.send(new DeleteCommand({
        TableName: "Inventory",
        Key: {
          PK: "product#" + data.Body.id,
          SK: "MetaData"
        }
      }));
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "data" })
  };
};
export {
  handler
};
//# sourceMappingURL=receieveMessage.js.map
