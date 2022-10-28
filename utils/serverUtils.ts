import { NextApiRequest, NextApiResponse } from "next";
import joi from "joi";
import jwt from "jsonwebtoken";
import { ALGORITHM, SECRET_KEY } from "./constants";
import clientPromise from "./mongodb";
import { v4 } from "uuid";

export const validateWithJoi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  schema: joi.ObjectSchema<any>,
  callback: () => void
) => {
  try {
    const value = await schema.validateAsync(req.body);
    callback();
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: (err as joi.ValidationError).details
        .map((one) => one.message)
        .join(" "),
    });
  }
};

export const authUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  func: (user: object) => void
) => {
  const headers = req.headers;
  if (headers.authorization) {
    const token_list = headers.authorization.split(" ");
    if (token_list.length !== 2) {
      res.status(401).json({
        status: 401,
        message: "Invalid Authorization Header",
      });
    }
    const bearer = token_list[0];
    if (bearer !== "Bearer") {
      res.status(401).json({
        status: 401,
        message: "Authorization token must be a bearer token",
      });
    }
    const token = token_list[1];
    try {
      const payload = jwt.verify(token, SECRET_KEY, {
        algorithm: ALGORITHM,
      } as jwt.VerifyOptions);
      const username = (payload as { username: string }).username;

      const client = await clientPromise;
      const db = client.db("glamznik");

      let user = (await db
        .collection("admin")
        .findOne({ username: username })) as unknown as {
        username: string;
        name: string;
        hashed_password?: string;
      };

      delete user.hashed_password;

      func(user);
    } catch (err) {
      res.status(401).json({
        status: 401,
        message: "Invalid token",
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      message: "No authorization was included in header",
    });
  }
};

export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY, {
      algorithm: ALGORITHM,
    } as jwt.VerifyOptions);
    return true;
  } catch (err) {
    return false;
  }
};

export const slugify = (name: string) => {
  let name_again = name.toLowerCase().replace(" ", "-");
  let code = v4().slice(0, 8);
  return name_again + "-" + code;
};
