import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "../config/cognito";
import crypto from "crypto"


function getSecretHash(username: string, clientId: string, clientSecret: string) {
  return crypto
    .createHmac("sha256", clientSecret)
    .update(username + clientId)
    .digest("base64");
}
export const handler  = async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
     const body = JSON.parse(event.body||'{}');
     const { email, password } = body;
     console.log({
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
            SECRET_HASH: getSecretHash(email, "5ujmrpk0lrpetncnsviefntn7c", "q5ns9smme7k4ua9mm1pbvoclf0vbvocda7dkqdmdrn6cdcpj2ou")
        },
        ClientId:"5ujmrpk0lrpetncnsviefntn7c",
        AuthFlow: "USER_PASSWORD_AUTH"

    });
    
    const result = await cognitoClient.send(new InitiateAuthCommand({
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
            SECRET_HASH: getSecretHash(email, "5ujmrpk0lrpetncnsviefntn7c", "q5ns9smme7k4ua9mm1pbvoclf0vbvocda7dkqdmdrn6cdcpj2ou")
        },
        ClientId:"5ujmrpk0lrpetncnsviefntn7c",
        AuthFlow: "USER_PASSWORD_AUTH"

    }));

    return {
        statusCode:200,
        body: JSON.stringify({data: result})
    }
      

}