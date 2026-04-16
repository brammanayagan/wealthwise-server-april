// Import model
import Asset from "../models/Asset.js";

// Import helpers
import { success, error } from "../utils/response.js";

// =========================
// CREATE ASSET
// =========================
export const createAsset = async (req, res) => {
  try {
    const { name, type, quantity, buyPrice, currentPrice } = req.body;

    // Validation
    if (!name || !type || !quantity || !buyPrice || !currentPrice) {
      return error(res, "All fields are required", 400);
    }

    // Create asset (attach userId from middleware)
    const asset = await Asset.create({
      name,
      type,
      quantity,
      buyPrice,
      currentPrice,
      userId: req.user._id,
    });

    return success(res, asset, "Asset created successfully");
  } catch (err) {
    return error(res, err.message);
  }
};

// =========================
// GET ASSETS (PAGINATION + FILTER)
// =========================
export const getAssets = async (req, res) => {
  try {
    const userId = req.user._id;

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filter
    const filter = { userId };

    if (req.query.type) {
      filter.type = req.query.type;
    }

    // Fetch data
    const assets = await Asset.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Asset.countDocuments(filter);

    return success(res, {
      items: assets,
      total,
      page,
      limit,
    });
  } catch (err) {
    return error(res, err.message);
  }
};

// =========================
// UPDATE ASSET
// =========================
export const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;

    // Find asset
    const asset = await Asset.findById(id);

    if (!asset) {
      return error(res, "Asset not found", 404);
    }

    // Ownership check
    if (asset.userId.toString() !== req.user._id.toString()) {
      return error(res, "Not authorized", 403);
    }

    // Update fields
    const updated = await Asset.findByIdAndUpdate(id, req.body, { new: true });

    return success(res, updated, "Asset updated successfully");
  } catch (err) {
    return error(res, err.message);
  }
};

// =========================
// DELETE ASSET
// =========================
export const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    // Find asset
    const asset = await Asset.findById(id);

    if (!asset) {
      return error(res, "Asset not found", 404);
    }

    // Ownership check
    if (asset.userId.toString() !== req.user._id.toString()) {
      return error(res, "Not authorized", 403);
    }

    // Delete
    await asset.deleteOne();

    return success(res, null, "Asset deleted successfully");
  } catch (err) {
    return error(res, err.message);
  }
};
