import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {productSchemaEdit} from "./validation";
import { validation } from "../layers/nodejs/validate";
import { dbClient } from "../config/db";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
     if(!event.pathParameters || !event.pathParameters.id) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: "id is required"})

        }
     }
      const body = JSON.parse(event.body??'{}');
   
      const result = validation(productSchemaEdit, body);
      if(!result.success){
         return {
            statusCode:500,
            body : JSON.stringify({
              success:false,
              message: result.error
            })
         }

      }


     const id = event.pathParameters.id;
     
     console.log('id',{
        TableName: "Inventory",
        Key: {
            "PK": "product#"+id,
            "SK": "MetaData"
           
        },
        UpdateExpression: " SET #name=:name ADD #cost :cost",
        ExpressionAttributeNames: {
           "#name": "name",
           "#cost": "cost"
        },
        ExpressionAttributeValues: {
            ":name":"laptop-acer",
            ":cost":1
 
        }
     });
    const update= await dbClient.send(new UpdateCommand({
        TableName: "Inventory",
        Key: {
            "PK": "product#"+id,
            "SK": "MetaData"
           
        },
        UpdateExpression: " SET #name=:name ADD #cost :cost",
        ExpressionAttributeNames: {
           "#name": "name",
           "#cost": "cost"
        },
        ExpressionAttributeValues: {
            ":name":"laptop-acer",
            ":cost":1
 
        },
        ConditionExpression: "attribute_not_exists(PK)"
     }));

     return {
        statusCode: 200,
        body: JSON.stringify({message:"1"})
    }
  } catch(e:any){
   //console.log(e.message);
    return {
        statusCode: 500,
        body: JSON.stringify({message:e})
    }
  }

}