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

// src/layers/sns.ts
var sns_exports = {};
__export(sns_exports, {
  snsClient: () => snsClient
});
import { SNSClient } from "@aws-sdk/client-sns";
var snsClient;
var init_sns = __esm({
  "src/layers/sns.ts"() {
    "use strict";
    snsClient = new SNSClient();
  }
});

// src/Product/publishMessage.ts
import { PublishCommand } from "@aws-sdk/client-sns";

// src/config/sns.ts
var snsCleint = process.env.AWS_EXECUTION_ENV ? (init_sns(), __toCommonJS(sns_exports)).snsClient : __require("/opt/nodejs/sns").snsClient;

// src/Product/publishMessage.ts
var handler = async (event) => {
  console.log(process.env.Sns);
  await snsCleint.send(new PublishCommand({
    TargetArn: process.env.Sns,
    Message: JSON.stringify({ message: "test" })
  }));
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "test" })
  };
};
export {
  handler
};
//# sourceMappingURL=publishMessage.js.map
