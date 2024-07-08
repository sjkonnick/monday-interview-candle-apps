import express from "express";
const router = express.Router();
import { getFragrances, createFragrance, updateFragrance, deleteFragrance } from "../services/fragrance-model-service";

router.use(express.static("client/build"));

router.get("/fragrances", getFragrances);
router.post("/fragrances", createFragrance);
router.put("/fragrances/:id", updateFragrance);
router.delete("/fragrances/:id", deleteFragrance);

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

function getHealth() {
  return {
    ok: true,
    message: "Healthy",
  };
}

export default router;
