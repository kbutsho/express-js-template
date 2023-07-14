const User = require("../models/User.model");

exports.addUserService = async (data) => {
    const result = await User.create(data);
    return result;
}
exports.getAllUserService = async () => {
    const result = await User.find({}).select('-password');
    return result;
}
