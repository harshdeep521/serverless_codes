import {SQSClient, SendMessageBatchCommand, SendMessageCommand, ReceiveMessageCommand} from "@aws-sdk/client-sqs";
export const client = new SQSClient();