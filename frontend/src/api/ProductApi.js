// frontend/api/productApi.js

// ✅ Get single product by ID
export const getProductById = async (id) => {
  const res = await fetch(`/api/products/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch product");
  return data;
};

// ✅ Update product by ID
export const updateProduct = async (id, updatedData, token) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update product");
  return data;
};

// ✅ Delete product by ID
export const deleteProduct = async (id, token) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete product");
  return data;
};
