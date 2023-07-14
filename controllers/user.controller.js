const { addUserService, getAllUserService } = require("../service/user.service");

exports.addUser = async (req, res) => {
    try {
        await addUserService(req.body);
        res.json({
            "status": 200,
            "message": "user added successfully!",
        })
    } catch (error) {
        res.json({
            "status": 400,
            "message": "failed!",
            "error": error.message
            // "error": errorFormatter(error.message)
        })
    }
}
exports.getAllUser = async (req, res) => {
    try {
        const result = await getAllUserService();
        res.json({
            "status": 200,
            "message": `user found ${result.length}`,
            "data": result
        })
    } catch (error) {
        res.json({
            "status": 400,
            "message": "failed!",
            "error": error.message
        })
    }
}