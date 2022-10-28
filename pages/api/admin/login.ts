import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "utils/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ALGORITHM, SECRET_KEY } from "utils/constants";
import joi from "joi";
import { validateWithJoi } from "utils/serverUtils";

type Data = {
  status?: number;
  user?: object;
  message: string;
  access_token?: string;
};

const schema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await clientPromise;
  const db = client.db("glamznik");

  if (req.method == "POST") {
    await validateWithJoi(req, res, schema, async () => {
      let bodyObject = req.body;
      let username = bodyObject.username;

      let user = (await db
        .collection("admin")
        .findOne({ username: username })) as unknown as {
        hashed_password?: string;
      };

      if (user) {
        let password = bodyObject.password as string;
        let hashedPassword = user.hashed_password;
        let isValid = await bcrypt.compare(password, hashedPassword as string);
        delete user.hashed_password;

        if (isValid) {
          let token = jwt.sign({ username: username }, SECRET_KEY, {
            algorithm: ALGORITHM,
          } as jwt.SignOptions);
          res.status(200).json({
            status: 200,
            message: "Success",
            access_token: token,
            user: user,
          });
        } else {
          res.status(401).json({
            status: 401,
            message: "Incorrect Username or  Password",
          });
        }
      } else {
        res.status(401).json({
          status: 401,
          message: "Incorrect Username or password",
        });
      }
    });
  } else {
    res.status(405).json({
      message: "Method Not Allowed",
    });
  }
}
