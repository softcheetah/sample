import Joi from "joi";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import jsonSpec from "json-spec";
import User from "../models/user";
import Token from "../models/token";
import config from "../config";
import {
  TOKEN_TYPE, USER_SPEC
} from "../constants";

const controller = {};

controller.requestResetPassword = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    const message = error.details.length > 0 ? error.details[0].message : "Invalid request";
    return res.status(400).json({ message });
  }
  value.email = value.email.toLowerCase().trim();
  const { email } = value;

  try {
    const userObj = await User.findOne({ email });
    if (!userObj) {
      return res.status(404).json({ message: "No user with that email registered" });
    }

    // Generate email token
    const emailToken = await Token.create({
      user  : userObj._id,
      type  : TOKEN_TYPE.EMAIL,
      token : crypto.randomBytes(30).toString("hex")
    });
    // Send email to user
    const msg = {
      to      : value.email,
      from    : config.supportEmail,
      subject : "Reset your password",
      html    : `Click <a href="${config.frontend}/password/reset/${emailToken.token}">here</a> to reset your password`,
    };
    sgMail.setApiKey(config.sendgridAPIKey);
    await sgMail.send(msg);

    // Return
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

controller.resetPassword = async (req, res) => {
  const schema = Joi.object({
    token    : Joi.string().required(),
    password : Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    const message = error.details.length > 0 ? error.details[0].message : "Invalid request";
    return res.status(400).json({ message });
  }

  try {
    // Check token
    const tokenObj = await Token.findOne({ token: value.token, type: TOKEN_TYPE.EMAIL });
    if (!tokenObj) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Get user
    const userObj = await User.findById(tokenObj.user);
    if (!userObj) {
      return res.status(404).json({ message: "Cannot find user" });
    }

    // Reset password
    const salt = crypto.randomBytes(32);
    userObj.salt = salt.toString("hex");
    userObj.password = await argon2.hash(value.password, { salt });
    await userObj.save();

    // Delete token
    await tokenObj.remove();

    // Generate token
    const userData = jsonSpec(userObj.toJSON(), USER_SPEC);
    const token = jwt.sign(userData, config.jwtSecret, config.jwt);

    // Return
    res.json({ token, user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server error" });
  }
};

controller.signIn = async (req, res) => {
  const schema = Joi.object({
    email    : Joi.string().email().required(),
    password : Joi.string().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    const message = error.details.length > 0 ? error.details[0].message : "Invalid request";
    return res.status(400).json({ message });
  }
  value.email = value.email.toLowerCase().trim();
  const { email, password } = value;

  try {
    const userObj = await User.findOne({ email });
    if (!userObj) {
      return res.status(401).json({ message: "No user with that email registered" });
    }
    if (!userObj.password) {
      return res.status(401).json({ message: "You need to create password" });
    }

    // Validate password
    const validPassword = await argon2.verify(userObj.password, password);
    if (!validPassword) {
      return res.status(401).json({ message: "Wrong password or username" });
    }

    // Generate token
    const userData = jsonSpec(userObj.toJSON(), USER_SPEC);
    const token = jwt.sign(userData, config.jwtSecret, config.jwt);

    // Return
    res.json({ token, user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

controller.checkToken = (req, res) => {
  // Generate token
  const userData = jsonSpec(req.currentUser.toJSON(), USER_SPEC);
  const token = jwt.sign(userData, config.jwtSecret, config.jwt);

  // Return
  res.json({ token, user: userData });
};

export default controller;
