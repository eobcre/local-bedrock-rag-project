import { ragService } from "../../services/ragService.js";

export const ragController = async (req, res) => {
  try {
    const { query, topK } = req.body;
    console.log("query, topK:", req.body);

    const result = await ragService({ query, topK });
    res.json(result);
  } catch (err) {
    console.error("RAG controller error:", err);

    res.status(500).json({
      ok: false,
      error: "RAG Error.",
    });
  }
};
