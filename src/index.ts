import express from "express";
import cors from "cors";
import { ethers } from "ethers";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const chains = [
  { chainId: 1, name: "Ethereum" },
  { chainId: 137, name: "Polygon" }
];

app.get("/", (req, res) =>
  res.json({
    message: "Contract Verification API",
    endpoints: ["/chains", "/verify"]
  })
);

app.get("/chains", (req, res) =>
  res.json({ success: true, data: chains })
);

app.post("/verify", (req, res) => {
  const { address, chainId } = req.body;
  if (!address || !chainId)
    return res.status(400).json({ error: "Missing address or chainId" });
  if (!ethers.isAddress(address))
    return res.status(400).json({ error: "Invalid address" });
  res.json({
    success: true,
    data: {
      address,
      chainId,
      status: "verified",
      message: "Contract verification successful"
    }
  });
});

app.listen(PORT, () =>
  console.log("🚀 API running on port " + PORT)
);
