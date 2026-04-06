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

// src/layers/cognito.ts
var cognito_exports = {};
__export(cognito_exports, {
  cognito: () => cognito
});
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
var cognito;
var init_cognito = __esm({
  "src/layers/cognito.ts"() {
    "use strict";
    cognito = new CognitoIdentityProviderClient();
  }
});

// src/Product/signup.ts
import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

// src/config/cognito.ts
var cognitoClient = process.env.AWS_EXECUTION_ENV ? (init_cognito(), __toCommonJS(cognito_exports)).cognito : __require("/opt/nodejs/cognito").cognito;

// src/Product/signup.ts
import crypto from "crypto";
function getSecretHash(username, clientId, clientSecret) {
  return crypto.createHmac("sha256", clientSecret).update(username + clientId).digest("base64");
}
var handler = async (event) => {
  const data = JSON.parse(event?.body || "{}");
  const { Username, Password, name, role } = data;
  console.log("data", data);
  await cognitoClient.send(new SignUpCommand(
    {
      ClientId: "5ujmrpk0lrpetncnsviefntn7c",
      SecretHash: getSecretHash(Username, "5ujmrpk0lrpetncnsviefntn7c", "q5ns9smme7k4ua9mm1pbvoclf0vbvocda7dkqdmdrn6cdcpj2ou"),
      Username,
      Password,
      UserAttributes: [
        {
          Name: "name",
          Value: name
        },
        {
          Name: "email",
          Value: Username
        },
        {
          Name: "custom:role",
          Value: role
        }
      ]
    }
  ));
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "complete" })
  };
};
export {
  handler
};
//# sourceMappingURL=signup.js.map
