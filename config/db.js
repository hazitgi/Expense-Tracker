const MongoClient = require('mongodb').MongoClient;

const state = {
    db: null
}
module.exports.connect = (done) => {
    const dbname = 'ExpenseTracker'
    MongoClient.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true },
        (err, client) => {
            if (err) return done(err)
            state.db = client.db(dbname)
            done()
        })
}

module.exports.get = () => {
    return state.db
}
