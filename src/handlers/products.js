const { VITE_API_URL } = import.meta.env;
export const addProduct = async (form) => {
  const res = await fetch(`${VITE_API_URL}/products/addProduct`, {
    method: "POST",
    body: form,
  });
  return await res.json();
};
export const getProducts = async () => {
  const res = await fetch(`${VITE_API_URL}/products/getProducts`);
  return await res.json();
};

export const getProduct = async (_id) => {
  const res = await fetch(`${VITE_API_URL}/products/getProduct?_id=${_id}`);
  return await res.json();
};

export const editProduct = async (form) => {
  const res = await fetch(`${VITE_API_URL}/products/editProduct`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  return await res.json();
};

export const editVariantStocks = async (form) => {
  const res = await fetch(`${VITE_API_URL}/products/editVariantStocks`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  return await res.json();
};

export const deleteProduct = async (_id) => {
  const res = await fetch(`${VITE_API_URL}/products/deleteProduct`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id }),
  });
  return await res.json();
};
