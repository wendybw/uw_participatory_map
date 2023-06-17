const db = require("../config/database");

const {Parser} = require('json2csv');
const json2csvParser = new Parser();


// /**
//  * Comments/Reviews: Obtains all reviews/comments of a specific location (obtained through using vid)
//  * @param {url} req: request URL data from user selected venue/location
//  * @param {*} res: all comments of the corresponding location (vid)
//  */
exports.getComment = async (req, res) => {
    let locationId = req.params.id;
    let response = await db.query('SELECT * FROM "tblReview" ' + 'WHERE hid = ' + locationId + 'ORDER BY created_at DESC;');
    res.status(200).send(response.rows);
};

// /**
//  * Insert Comment/Review: Inserts user insert data of review into tblReview in the database
//  * @param {form} req - form body that contains user selected information
//  * @param {status} res - confirmation that comment has been added into the review table
//  */
exports.addComment = async(req, res) => {
    let {hid, contributor, email, content} = req.body;
    // let currTime = new Date().toISOString();
    console.log('INSERT INTO "tblReview"(hid, reviewer, email, content) VALUES ($1, $2, $3, $4)',
        [hid, contributor, email, content]);
    let {reviewRows} = await db.query(
        'INSERT INTO "tblReview"(hid, reviewer, email, content) VALUES ($1, $2, $3, $4)',
        [hid, contributor, email, content]
    )

    res.status(200).send({
        message: "comment added into review table!",
        body: {
            review: {hid, contributor, email, content}
        }
    })
};