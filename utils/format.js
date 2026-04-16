// Format single asset (remove unwanted fields)
export const formatAsset = (item) => {
  return {
    id: item._id,
    name: item.name,
    type: item.type,
    quantity: item.quantity,
    buyPrice: item.buyPrice,
    currentPrice: item.currentPrice,
    createdAt: item.createdAt,
  };
};

// Format multiple assets
export const formatAssets = (items) => {
  return items.map((item) => formatAsset(item));
};
