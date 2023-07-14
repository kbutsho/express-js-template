const User = require("../models/user.model");

exports.addUserService = async (data) => {
    const result = await User.create(data);
    return result;
}
exports.getAllUserService = async () => {
    const result = await User.find({}).select('-password');
    return result;
}
