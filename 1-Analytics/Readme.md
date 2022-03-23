These are the three aggregation pipelines devised to answer the questions:

1. List top 10 products based on score and number of reviews
2. List 10 products where most questions have a no answer
3. List top 10 most polarising products with highest numbers of negative and positive scores while having the least scores in the middle

In number 3 we thought take advantage of standard deviation: highest standard deviation is the highest polarised answer. At least if you assume that polarised means "not neutral" and neutral answers have been filtered out.


As far as performance we recommend adding index on "asid" in both reviews and qa collections, if these queries are used often. Plus on "item_id" in products, like so: db.products.createIndex("item_id": 1);
