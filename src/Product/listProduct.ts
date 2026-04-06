import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import { dbClient } from "../config/db";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import {verifyClient} from "../config/verify";


export const handler = async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
    let data =[];
    let lastEvaluatedKey = undefined;
    const token = event.headers.authrizations?.split(" ")[1];
     if (!token) {
      return { statusCode: 401, body: "No token provided" };
    }

    const user = await verifyClient(token);

    do {

     const result:any = await dbClient.send(new QueryCommand({
          TableName: "Inventory",
          IndexName: "GS1",
          KeyConditionExpression: "GS1PK=:pk",
          ExpressionAttributeValues: {
            ":pk": "Product"
          },
          Limit:1,
          ExclusiveStartKey: lastEvaluatedKey
    }))
    data.push(...result.Items);
    lastEvaluatedKey= result.LastEvaluatedKey

} while(lastEvaluatedKey)   
  
    return {
        statusCode:200,
        body: JSON.stringify(data)
    }
    } catch(e:any){
         return {
        statusCode:500,
        body: JSON.stringify(e.message)
    }
    }

}