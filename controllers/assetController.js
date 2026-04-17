import Asset from "../models/Asset.js";
import { success, error } from "../utils/response.js";

// =========================
// CREATE ASSET
// POST /api/portfolio
// =========================
export const createAsset = async (req, res) => {
  try {
    const { name, type, quantity, buyPrice, currentPrice } = req.body;

    // Basic validation
    if (!name || !type || !quantity || !buyPrice || !currentPrice) {
      return error(res, "All fields are required", 400);
    }

    // Numeric validation
    if (quantity <= 0 || buyPrice <= 0 || currentPrice <= 0) {
      return error(res, "Invalid numeric values", 400);
    }

    // Create asset
    const asset = await Asset.create({
      name,
      type,
      quantity,
      buyPrice,
      currentPrice,
      user: req.user._id, // from auth middleware
    });

    return success(res, asset, "Asset created successfully");
  } catch (err) {
    return error(res, err.message || "Server Error", 500);
  }
};

// =========================
// GET ALL ASSETS (WITH PAGINATION + FILTER)
// GET /api/portfolio?page=1&limit=10&type=stock
// =========================
export const getAssets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type;

    const query = { user: req.user._id };

    // Optional filtering
    if (type) {
      query.type = type;
    }

    const total = await Asset.countDocuments(query);

    const assets = await Asset.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return success(
      res,
      {
        items: assets,
        page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
      "Assets fetched successfully",
    );
  } catch (err) {
    return error(res, err.message || "Server Error", 500);
  }
};

// =========================
// GET SINGLE ASSET
// GET /api/portfolio/:id
// =========================
export const getAssetById = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await Asset.findById(id);

    if (!asset) {
      return error(res, "Asset not found", 404);
    }

    // Ownership check
    if (asset.user.toString() !== req.user._id.toString()) {
      return error(res, "Not authorized", 403);
    }

    return success(res, asset, "Asset fetched successfully");
  } catch (err) {
    return error(res, err.message || "Server Error", 500);
  }
};

// =========================
// UPDATE ASSET
// PUT /api/portfolio/:id
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
    if (asset.user.toString() !== req.user._id.toString()) {
      return error(res, "Not authorized", 403);
    }

    const { name, type, quantity, buyPrice, currentPrice } = req.body;

    // Validation
    if (!name || !type || !quantity || !buyPrice || !currentPrice) {
      return error(res, "All fields are required", 400);
    }

    if (quantity <= 0 || buyPrice <= 0 || currentPrice <= 0) {
      return error(res, "Invalid numeric values", 400);
    }

    // Safe update (whitelisted fields only)
    asset.name = name;
    asset.type = type;
    asset.quantity = quantity;
    asset.buyPrice = buyPrice;
    asset.currentPrice = currentPrice;

    const updatedAsset = await asset.save();

    return success(res, updatedAsset, "Asset updated successfully");
  } catch (err) {
    return error(res, err.message || "Server Error", 500);
  }
};

// =========================
// DELETE ASSET
// DELETE /api/portfolio/:id
// =========================
export const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const asset = await Asset.findById(id);

    if (!asset) {
      return error(res, "Asset not found", 404);
    }

    // Ownership check
    if (asset.user.toString() !== req.user._id.toString()) {
      return error(res, "Not authorized", 403);
    }

    await asset.deleteOne();

    return success(res, null, "Asset deleted successfully");
  } catch (err) {
    return error(res, err.message || "Server Error", 500);
  }
};
