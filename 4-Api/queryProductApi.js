// This function is the endpoint's request handler.
exports = function({ query, headers}, response) {
    // Data can be extracted from the request as follows:
    // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
    const {product_name} = query;
    // Headers, e.g. {"Content-Type": ["application/json"]}
    const contentTypes = headers["Content-Type"];
    console.log("arg1: ", product_name);
    console.log("Content-Type:", JSON.stringify(contentTypes));
    // You can use 'context' to interact with other Realm features.
    // Accessing a value:
    // var x = context.values.get("value_name");
    // Querying a mongodb service:
    const doc = context.services.get("mongodb-atlas").db("test").collection("products");
    return doc.aggregate([
    {
      $search: {
        index: "product-name-autocomplete",
        autocomplete: {
          query: product_name,
          path: "name",
          tokenOrder: "any"
        }
      }
    },
    {
      $project: {
        item_id: "$item_id",
        brand: "$brand",
          name: "$name",
          score: { $meta: "searchScore" }
      }
    }
  ])
    // Calling a function:
    // const result = context.functions.execute("function_name", arg1, arg2);
    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
};