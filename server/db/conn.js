const { MongoClient } = require("mongodb");
const configUrl = process.env.ATLAS_URI;
const client = new MongoClient(configUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: async function (callback) {
    const clientConnected = await client.connect();
    _db = clientConnected.db("FitArc");
  },
 
  getDb: function () {
    return _db;
  },
};