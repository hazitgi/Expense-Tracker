const db = require('../config/db')
const NAME_COLLECTION = require('../config/collection')
const ObjectId = require('mongodb').ObjectId

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
    // res.send("Get Transaction")
    try {
        const entries = await db.get().collection(NAME_COLLECTION.COLLECTION).find().sort({createdAt:-1}).toArray()
        res.status(200).json({
            success: true,
            count: entries.length,
            data: entries
        });
    } catch (err) {
        console.log(err);
        res.send(500).json({
            success: false,
            error: 'server Error'
        })
    }
}

// @desc Add all transactions
// @route POST /api/v1/transactions
// @access Public
exports.addTransactions = async (req, res, next) => {
    req.body.createdAt = new Date()

    const { text, amount } = req.body
    await db.get().collection(NAME_COLLECTION.COLLECTION).insertOne(req.body)
        .then(async (response) => {
            // console.log(response);
            let insertedDoc = await db.get().collection(NAME_COLLECTION.COLLECTION).findOne({ _id: response.insertedId })
            // console.log(insertedDoc
            // );
            res.status(201).json({
                success: true,
                data: insertedDoc
            })
        })
        .catch((err) => {
            console.error('error', err)
            res.status(400).json({
                success: false,
                data: `Please add some text or validation error`,
                err,
            })
        })

}

// @desc Delete all transactions
// @route DELETE /api/v1/transactions
// @access Public
exports.deleteTransactions = async (req, res, next) => {
    console.log(req.params.id);
    db.get().collection(NAME_COLLECTION.COLLECTION).deleteOne({ _id: ObjectId(req.params.id) })
        .then((response) => {
            console.log("response", response);
            console.log(response.deletedCount);
            if (response.deletedCount == 0) {
                res.status(500).json({
                    success: false,
                    error: 'server Error'
                })
            } else {
                res.status(200).json({
                    success: true,
                    data: response
                })
            }
        })
}
