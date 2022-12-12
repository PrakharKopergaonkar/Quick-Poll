const db = require("../models");

exports.updateOption = async (req, res) => {

}

exports.deleteOption = async (req, res) => {
    try {
        const {id} = req.params;
        const {userID} = req.body;
        
        const option = await db.option.findById(id);
        if(option.userID !== userID) {
            throw new Error("Access Denied! Unauthorised user");
        }
        await option.delete();
        
        return res.status(200).json({
            status:true,
            message:"Option has been deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.submitOption = async (req, res) => {
    try {
        const { id } = req.params;
        await db.option.findByIdAndUpdate(id, { $inc: { totalSubmits: 1 } })

        return res.status(200).json({
            status: 200,
            message: "Poll has been submitted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
