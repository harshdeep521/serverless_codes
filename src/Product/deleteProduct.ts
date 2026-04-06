import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dbClient } from "../config/db";
import { DeleteCommand}  from "@aws-sdk/lib-dynamodb"
export const handler = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>  => {
  try {
     if(!event.pathParameters || !event.pathParameters.id) {
        return {
            statusCode:500,
            body : JSON.stringify({message: "id is required"})
        }
     }

    
      await dbClient.send(new DeleteCommand({
        TableName: "Inventory",
        Key: {
            PK: "product#"+event.pathParameters.id,
            SK: "MetaData"

        }  
      }));
      return {
        statusCode:200,
        body : JSON.stringify({message: "Data is Successfully Deleted"})
      }

  }
  catch(e) {
   let message = "Unknown Error";
  if (e instanceof Error) {
    message = e.message;
  }
    return {
        statusCode:500,
        body: JSON.stringify({message: message})
    }
  }

}