const validations =  process.env.AWS_EXECUTION_ENV
?  require("../layers/nodejs/validate"
).validation: require("/opt/nodejs/validate").validation;

export default validations