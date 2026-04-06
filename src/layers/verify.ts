import { CognitoJwtVerifier}  from "aws-jwt-verify";
const verify = CognitoJwtVerifier.create({
    userPoolId: "us-east-1_hqMQv8xVr",
    tokenUse: "access",
    clientId:"5ujmrpk0lrpetncnsviefntn7c"
});
export const jwtVerify = (token: string) => {
  try {
        const payload = verify.verify(token);
        console.log(payload);
        return payload;
  } catch(e){
    console.log(e);
     throw new Error('new Error');
  }

}
