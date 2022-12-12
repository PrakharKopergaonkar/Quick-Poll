const db = require('../models')


exports.getPollDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const poll = JSON.parse(JSON.stringify(await db.poll.findById(id)));
        const options = await db.option.find({ pollID: id });
        poll["options"] = options;

        return res.status(200).json({
            status: true,
            data: poll
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.getAllUserPolls = async (req, res) => {
    try {
        const {id} = req.params;
        const polls = JSON.parse(JSON.stringify(await db.poll.find({userID:id})))

        for (let i = 0; i<polls.length; i++) {
            const options = await db.option.find({pollID: polls[i]._id});
            polls[i]["options"] = options;
        }

        return res.status(200).json({
            status: 200,
            data: polls
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.submitPoll = async (req, res) => {
    try {
        const { userID, name, options } = req.body;
        const Poll = db.poll({
            name,
            userID
        })

        await Poll.save();
        const pollID = Poll._id.toString()

        await db.option.insertMany(options.map((option) => {
            return {
                ...option,
                userID,
                pollID
            }
        }))

        return res.status(200).json({
            status: true,
            message: "Poll has been added successfully"
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.deactivatePoll = async (req, res) => {
    try {
        const { userID } = req.body;
        const { id } = req.params;

        const Poll = await db.poll.findById(id);
        if (Poll.userID !== userID) {
            throw new Error("Access Denied! Unauthorised user")
        }

        await Poll.updateOne({ isActive: false });

        return res.status(200).json({
            status: 200,
            message: "Poll has been deactivated"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.reactivatePoll = async (req, res) => {
    try {
        const { userID } = req.body;
        const { id } = req.params;

        const Poll = await db.poll.findById(id);
        if (Poll.userID !== userID) {
            throw new Error("Access Denied! Unauthorised user")
        }

        await Poll.update({ isActive: true });
        return res.status(200).json({
            status: 200,
            message: "Poll has been reactivated"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.updatePoll = async (req, res) => {
    try {
        console.log(req);
        return res.status(200).json({
            status: 200,
            message: "Poll has been updated"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.deletePoll = async (req, res) => {
    try {
        const {id} = req.params;
        const {userID} = req.body;

        const Poll = await db.poll.findById(id);
        if (Poll.userID !== userID) {
            throw new Error("Access Denied! Unauthorised user")
        }

        await Poll.delete();
        await db.option.deleteMany({pollID: id})

        return res.status(200).json({
            status: 200,
            message: "Poll has been deleted"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}




