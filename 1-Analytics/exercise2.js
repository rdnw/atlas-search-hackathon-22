[
  {
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
