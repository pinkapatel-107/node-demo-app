const Register = require("../Model/user.Model");

module.exports = {
    Register: async (req, res) => {
        try {
            const user = await Register.create(req.body)
            return res.status(200).json({
                status_code: 200,
                message: "success",
                data: user
            });
        } catch (error) {
            return res.status(200).json({
                status_code: 500,
                message: error.message,
                data: []
            });
        }
    },
    login: async (req, res) => {
        try {
            if (!req.body.email && !req.body.password) {
                return res.status(409).json({ status_code: 409, message: "email and password is required", data: [] });
            } else {
                const user_exist = await Register.findOne({ email: req.body.email }).select('-password');
                if (!user_exist) {
                    return res.status(404).json({ status_code: 404, message: "User not found.", data: [] });
                }
                return res.status(200).json({
                    status_code: 200,
                    message: "successfully login",
                    data: user_exist
                });
            }
        } catch (error) {
            return res.status(200).json({
                status_code: 500,
                message: error.message,
                data: []
            });
        }
    },
    getUser: async (req, res) => {
        try {
            const results = await Register.find()
        
            return res.status(200).json({
                status_code: 200,
                message: "Data Reviewed successfully",
                data: results
            });
        } catch (error) {
            return res.status(500).json({
                status_code: 500,
                message: error.message,
                data: []
            });
        }
    }
}
