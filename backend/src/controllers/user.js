import Joi from "joi";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import jsonSpec from "json-spec";
import User from "../models/user";
import Token from "../models/token";
import config from "../config";
import {
  TOKEN_TYPE,
  USER_SPEC,
  USER_PERMISSION,
  USER_STATUS
} from "../constants";

const controller = {};

controller.getSelf = (req, res) => {
  const userData = jsonSpec(req.currentUser.toJSON(), USER_SPEC);
  res.json({ user: userData });
};

controller.createUser = async (req, res) => {
  const schema = Joi.object({
    firstName   : Joi.string().required(),
    lastName    : Joi.string().required(),
    email       : Joi.string().email().required(),
    permissions : Joi.array().items(
      Joi.string().valid(...Object.values(USER_PERMISSION))
    )
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    const message = error.details.length > 0 ? error.details[0].message : "Invalid request";
    return res.status(400).json({ message });
  }
  value.email = value.email.toLowerCase().trim();

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create user
    const userObj = await User.create(value);

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
      subject : "Create your password",
      html    : `Click <a href="${config.frontend}/password/reset/${emailToken.token}">here</a> to create your password`,
    };
    sgMail.setApiKey(config.sendgridAPIKey);
    await sgMail.send(msg);

    // Return
    res.json({ user: jsonSpec(userObj.toJSON(), USER_SPEC) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

controller.updateUser = async (req, res) => {
  const schema = Joi.object({
    firstName   : Joi.string().required(),
    lastName    : Joi.string().required(),
    email       : Joi.string().email().required(),
    permissions : Joi.array().items(
      Joi.string().valid(...Object.values(USER_PERMISSION))
    ),
    status: Joi.string().valid(...Object.values(USER_STATUS))
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    const message = error.details.length > 0 ? error.details[0].message : "Invalid request";
    return res.status(400).json({ message });
  }
  value.email = value.email.toLowerCase().trim();

  try {
    // Check if email already exists on another user
    const existingUser = await User.findOne({ email: value.email });
    if (existingUser && existingUser._id.toString() !== req.params.userId) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Get user object
    const userObj = await User.findById(req.params.userId);
    if (!userObj) {
      return res.status(404).json({ message: "Cannot find user" });
    }

    // Update user
    Object.assign(userObj, value);
    await userObj.save();

    // Return
    res.json({ user: jsonSpec(userObj.toJSON(), USER_SPEC) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

controller.getUser = async (req, res) => {
  try {
    // Get user object
    const userObj = await User.findById(req.params.userId);
    if (!userObj) {
      return res.status(404).json({ message: "Cannot find user" });
    }

    // Return
    res.json({ user: jsonSpec(userObj.toJSON(), USER_SPEC) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

controller.searchUser = async (req, res) => {
  const schema = Joi.object({
    status : Joi.string().valid(...Object.values(USER_STATUS)).optional(),
    text   : Joi.string().optional(),
  });
  const { error, value } = schema.validate(req.query);
  if (error) {
    const message = error.details.length > 0 ? error.details[0].message : "Invalid request";
    return res.status(400).json({ message });
  }

  try {
    const dbQuery = {};
    if (value.status) {
      Object.assign(dbQuery, {
        status: value.status
      });
    }
    if (value.text) {
      Object.assign(dbQuery, {
        email: { $regex: value.text, $options: "i" }
      });
    }

    // Get users
    const users = await User.find(dbQuery);

    // Return
    res.json({
      totalCounts : users.length,
      users       : jsonSpec(users, [USER_SPEC])
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default controller;
