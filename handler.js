exports.hello = async (event) => {
  console.log("EVENT:", event);

  let body = {};

  try {
    if (typeof event.body === "string") {
      body = JSON.parse(event.body);
    } else if (typeof event.body === "object") {
      body = event.body;
    } else {
      body = event;
    }
  } catch (err) {
    console.log("Parse error:", err);
  }

  console.log("BODY:", body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: body.name ,
    }),
  };
};
