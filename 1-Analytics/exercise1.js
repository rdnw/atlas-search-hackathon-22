[
  {
    '$project': {
      '_id': 0, 
      'item_id': 1
    }
  }, {
    '$lookup': {
      'from': 'reviews', 
      'localField': 'item_id', 
      'foreignField': 'asin', 
      'as': 'reviews'
    }
  }, {
    '$unwind': {
      'path': '$reviews', 
      'preserveNullAndEmptyArrays': false
    }
  }, {
    '$project': { 
      'item_id': 1, 
      'reviews.overall': 1
    }
  }, {
    '$group': {
      '_id': '$item_id', 
      'averageScore': {
        '$avg': '$reviews.overall'
      }, 
      'count': {
        '$count': {}
      }
    }
  }, {
    '$sort': {
      'averageScore': -1, 
      'count': -1
    }
  }, {
    '$limit': 10
  }
]
