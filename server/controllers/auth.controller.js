const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');


exports.signup = async (req, res) => {
    try {
        const body = req.body;
        const User = db.user({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            user_type: body.user_type
        })

        await User.save()

        return res.status(200).json({
            status: true,
            message: "User has been registered"
        })

    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }

}

exports.signin = async (req, res) => {
    try {
        const body = req.body
        db.user.findOne({ email: body.email })
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        message: "User Not found."
                    });
                }

                const passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        status: false,
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }

                const jsontoken = jwt.sign({
                    result: user.email
                }, process.env.PROJECT_NAME, {
                    expiresIn: "24h"
                });

                return res.status(200).json({
                    status: true,
                    message: "Logged in successfully",
                    token: jsontoken,
                    email: req.body.email,
                    user_id: user._id,
                });
            })

    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }

}

exports.refreshToken = async (req, res) => {
    try {
        let token = req.get("authorization");
        const buffer = Buffer.from(token.split(".")[1], 'base64')
        const {result} = buffer?.toString()
        const jsontoken = jwt.sign({
            result
        }, process.env.PROJECT_NAME, {
            expiresIn: "24h"
        });

        return res.status(200).json({
            status: true,
            message: "Valid Token",
            token: jsontoken,
            email: result
        });
        
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}
