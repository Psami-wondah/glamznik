import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "utils/mongodb";
import { WithId, Document } from "mongodb";
import { authUser, slugify, validateWithJoi } from "utils/serverUtils";
import joi from "joi";

type Data = {
  status?: number;
  items?: WithId<Document>[];
  message: string;
  item?: object;
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
    const allItems = await db.collection("items").find({}).toArray();
    res.status(200).json({
      status: 200,
      items: allItems,
      message: "success",
    });
  } else if (req.method == "POST") {
    await authUser(req, res, async () => {
      await validateWithJoi(req, res, schema, async () => {
        let item = await db
          .collection("items")
          .insertOne({ ...req.body, slug: slugify(req.body.name) });
        res.status(201).json({
          status: 200,
          message: "success",
          item: req.body,
        });
      });
    });
  } else {
    res.status(405).json({
      message: "Method Not Allowed",
    });
  }
}
