[
  {
    '$lookup': {
      'from': 'reviews', 
      'localField': 'item_id', 
      'foreignField': 'asin', 
      'as': 'reviews'
    }
  }, {
    '$match': {
      'reviews.overall': {
        '$nin': [
          3
        ]
      }
    }
  }, {
    '$unwind': {
      'path': '$reviews', 
      'preserveNullAndEmptyArrays': false
    }
  }, {
    '$group': {
      '_id': '$item_id', 
      'scoreStdDev': {
        '$stdDevSamp': '$reviews.overall'
      }
    }
  }, {
    '$sort': {
      'scoreStdDev': -1
    }
  }
]
