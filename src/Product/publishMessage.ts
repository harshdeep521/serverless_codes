import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PublishCommand } from "@aws-sdk/client-sns";
import { json } from "node:stream/consumers";
import { snsCleint}  from  "../config/sns"

export const handler = async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(process.env.Sns);
    await snsCleint.send(new PublishCommand({
        TargetArn: process.env.Sns,
        Message: JSON.stringify({message:"test"})
     }));
    return {
        statusCode :200,
        body: JSON.stringify({message: "test"})
    }
}