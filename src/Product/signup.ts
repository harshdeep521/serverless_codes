import { InitiateAuthCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import  {cognitoClient }from  "../config/cognito";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { client } from "../layers/nodejs/sqs";
import crypto from "crypto";

function getSecretHash(username: string, clientId: string, clientSecret: string) {
  return crypto
    .createHmac("sha256", clientSecret)
    .update(username + clientId)
    .digest("base64");
}
export const handler = async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const data = JSON.parse(event?.body||"{}");
    const {Username, Password, name, role} = data;
    console.log('data',data);
     await cognitoClient.send(new SignUpCommand({
        ClientId:"5ujmrpk0lrpetncnsviefntn7c",
        SecretHash: getSecretHash(Username, "5ujmrpk0lrpetncnsviefntn7c", "q5ns9smme7k4ua9mm1pbvoclf0vbvocda7dkqdmdrn6cdcpj2ou"), 
        Username,
        Password,
        UserAttributes: [{
            Name: "name",
            Value:name
        },{
            Name: "email",
            Value: Username

        }, {
            Name: "custom:role",
            Value : role
        }
      ]
    }
    ));

    return {
        statusCode:200,
        body: JSON.stringify({message:"complete"})
    }

}