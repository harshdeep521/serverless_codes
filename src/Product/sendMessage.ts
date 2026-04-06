import { SendMessageCommand } from "@aws-sdk/client-sqs";
import sqsCleint from "../config/sqs.queue";
import {  APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
await sqsCleint.send(new SendMessageCommand({
    "QueueUrl": process.env.InventoryQueue,
    MessageBody: JSON.stringify({data:{
        PK: "10",
        name: "HP-laptop"
    }})
}));
    return {
        statusCode: 200,
        body: JSON.stringify({data: "message send successfully"})
    }


} 