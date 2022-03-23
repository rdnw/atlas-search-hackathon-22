exports = function(changeEvent) {
	/*
	  A Database Trigger will always call a function with a changeEvent.
	  Documentation on ChangeEvents: https://docs.mongodb.com/manual/reference/change-events/
	*/
  // Access the _id of the changed document:
   const docId = changeEvent.documentKey._id;
   const updateDescription = changeEvent.updateDescription;
	  // See whic"h fields were changed (if any):
	  if (updateDescription) {
		const updatedFields = updateDescription.updatedFields;// A document containing updated field
		if(Object.keys(updatedFields).some(field => field.match(/wishlist/))) {
		  for (const wishlist of Object.values(updatedFields.wishlist)) {
			const product_ids = wishlist.product_ids;
			console.log("product_ids: " + product_ids);
			const product_collection = context.services.get("mongodb-atlas").db("test").collection("products");
			const products = product_collection.find( {_id : { $in : product_ids}}).toArray();
			//for (const item of products) {
			const i = 0;
			while (i <= products.length) {
			  const item = products[i];
			  product_collection.updateOne({_id: item._id}, {wishlist_count: item.wishlist_count +1});
			}
		  }
		}
	  }
  };