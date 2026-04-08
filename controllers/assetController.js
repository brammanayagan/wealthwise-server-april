import Asset from "../models/Asset.js";

// @route GET /api/assets
export const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find({ userId: req.user._id });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @route POST /api/assets
export const createAsset = async (req, res) => {
  try {
    const { name, type, quantity, buyPrice, currentPrice } = req.body;

    const asset = await Asset.create({
      name,
      type,
      quantity,
      buyPrice,
      currentPrice,
      userId: req.user._id,
    });

    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @route PUT /api/assets/:id
export const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    if (asset.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updated = await Asset.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @route DELETE /api/assets/:id
export const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    if (asset.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await asset.deleteOne();

    res.json({ message: "Asset removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
