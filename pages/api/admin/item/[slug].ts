import type { NextApiRequest, NextApiResponse } from "next";
import joi from "joi";
import { authUser, validateWithJoi } from "utils/serverUtils";
import clientPromise from "utils/mongodb";
import { Document, WithId } from "mongodb";

type Data = {
  status?: number;
  message: string;
  item?: WithId<Document>;
};
const schema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string().required(),
  image_url: joi.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await clientPromise;
  const db = client.db("glamznik");
  if (req.method == "GET") {
    let item = await db.collection("items").findOne({ slug: req.query.slug });
    if (item) {
      res.status(200).json({
        message: "Success",
        item: item,
      });
    } else {
      res.status(404).json({
        message: "Not Found",
      });
    }
  } else if (req.method == "PUT") {
    await authUser(req, res, async () => {
      await validateWithJoi(req, res, schema, async () => {
        let item = await db
          .collection("items")
          .findOne({ slug: req.query.slug });
        if (item) {
          await db
            .collection("items")
            .findOneAndUpdate({ slug: req.query.slug }, { $set: req.body });
          res.status(200).json({
            message: "Success",
          });
        } else {
          res.status(404).json({
            message: "Not Found",
          });
        }
      });
    });
  } else if (req.method == "DELETE") {
    await authUser(req, res, async () => {
      let item = await db.collection("items").findOne({ slug: req.query.slug });
      if (item) {
        await db.collection("items").findOneAndDelete({ slug: req.query.slug });
        res.status(200).json({
          message: "Success",
        });
      } else {
        res.status(404).json({
          message: "Not Found",
        });
      }
    });
  } else {
    res.status(405).json({
      message: "Method Not Allowed",
    });
  }
}
