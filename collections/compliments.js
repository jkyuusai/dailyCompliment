Compliments = new Mongo.Collection('compliments');



Meteor.methods({ 
  draw: function (query) {
    // query: mongodb query object (optional)
    var query = query || { };
    query['random'] = { $lte: Math.random() };
    var cur = Compliments.find(query,{sort:{ rand: -1 }});
    while (! cur.count()) {
        delete query.random;
        cur = Compliments.find(query,{sort:{ rand: -1 }});
    }
    var docs = [];
    cur.forEach(function (result) {
      var res;
      res = result;
      res.random = Math.random();
      Compliments.update({ _id: res._id }, res);
      docs.push(res);
    });

    return pick(docs);
  }
});

function pick(docs) {
  var compliments = [];
  
  while(compliments.length < 2) {
    compliments.push(docs[Math.floor(Math.random()*docs.length)]);
  }

  return compliments;
}