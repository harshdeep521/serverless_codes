import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import sqsCleint from "../config/sqs.queue";
import { ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import { dbClient } from "../config/db";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
     const datas = await sqsCleint.send( new ReceiveMessageCommand({
        QueueUrl: process.env.InventoryQueue,
        VisibilityTimeout: 30,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds:20
     }));
     
     if(datas.Messages){
      for(let data of datas.Messages) {
         console.log(JSON.parse(data.Body));
         console.log({
         TableName: "Inventory",
         Key: {
               PK: "product#"+JSON.parse(data.Body).id,
               SK: "MetaData"

         }  
         });
         await dbClient.send(new DeleteCommand({
         TableName: "Inventory",
         Key: {
               PK: "product#"+data.Body.id,
               SK: "MetaData"

         }  
         }));
      }
   }
    return {
        statusCode: 200,
        body: JSON.stringify({message: "data"})
    }

}