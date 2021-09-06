const MongoClient = require('mongodb')
const db = require('../config/db')

// Schema Validation Function
const runDbSchemaValidation = () => {
    db.createCollection("Transaction", {
        validator: {

            $jsonSchema: {
                bsonType: "object",
                required: ["text", "amount", "createdAt"],
                properties: {
                    name: {
                        bsonType: "string",
                        description: "Please add some text"
                    },
                    amount: {
                        bsonType: "double",
                        description: "Please add positive or negative number"
                    },
                    createdAt: {
                        bsonType: "date",
                        default: "$$NOW"
                    },

                }
            }
        },
        validationLevel: "strict"
    })
}
module.exports = {
    runDbSchemaValidation
}