[
  {
    '$project': {
      '_id': 0, 
      'item_id': 1
    }
  }, {
    '$lookup': {
      'from': 'qa', 
      'localField': 'item_id', 
      'foreignField': 'asin', 
      'as': 'qa'
    }
  }, {
    '$unwind': {
      'path': '$qa', 
      'preserveNullAndEmptyArrays': false
    }
  }, {
    '$match': {
      'qa.answer_aggregated': 'no'
    }
  }, {
    '$sortByCount': '$item_id'
  }, {
    '$limit': 10
  }
]