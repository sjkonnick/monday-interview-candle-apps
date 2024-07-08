import express, { Request, Response } from "express";
const router = express.Router();
import initMondayClient from "monday-sdk-js";
import dotenv from "dotenv";
dotenv.config();

const mondayClient = initMondayClient({
  token: process.env.MONDAY_API_KEY,
});
mondayClient.setApiVersion("2024-01");

router.use(express.static("client/build"));

router.get("/", function (req, res) {
  res.json(getHealth());
});

router.get("/health", function (req, res) {
  res.json(getHealth());
  res.end();
});

router.get("/view", function (req, res) {
  res.sendFile("index.html", { root: "client/build/" });
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    const { boardId, groupId, itemName, columnValues } = req.body;
    const query = `mutation create_item($boardId: ID!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
      create_item(board_id: $boardId, group_id: $groupId, item_name: $itemName, column_values: $columnValues) {
        id
      }
    }
    `;
    const variables = { boardId, groupId, itemName, columnValues };

    const response = await mondayClient.api(query, { variables });
    res.send(response);
  } catch (err) {
    console.error("Error creating Monday board item");
    res.send(500);
  }
});

function getHealth() {
  return {
    ok: true,
    message: "Healthy",
  };
}

export default router;
