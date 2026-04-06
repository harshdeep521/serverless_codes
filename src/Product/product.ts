import { APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import  {dbClient}  from "../config/db";
import  validations  from "../config/validation";
import  { productSchema }  from "./validation";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import {SendMessageCommand, ReceiveMessageCommand , SendMessageBatchCommand} from "@aws-sdk/client-sqs";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   try {
   const body = JSON.parse(event.body??"{}");
   const result = validations(productSchema, body);
  
   if(!result.success) {
      return {
         statusCode: 500,
         body: JSON.stringify({
               success: false,
               message: result.error,
            }),
         };
         
      }
   
   
   const saveData =await  dbClient.send(new PutCommand({
       TableName:"Inventory",
       Item:{
         PK: `product#${body.productId}`,
         SK: `MetaData`,
         GS1PK: "Product",
         GS1SK: new Date().getTime().toString(),
         name:body.productName,
         cost:body.cost
       }
   }));
  
 return {
    statusCode:200,
    body: JSON.stringify({message:"test"})
 }
} catch(e) {
  return {
    statusCode:599,
    body: JSON.stringify(e)
 }
}

}