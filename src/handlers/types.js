const { VITE_API_URL } = import.meta.env;
export const getTypes = async () => {
  const res = await fetch(`${VITE_API_URL}/types/getTypes`);
  return await res.json();
};
export const editTypeValue = async (form) => {
  const res = await fetch(`${VITE_API_URL}/types/editTypeValue`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  return await res.json();
};

export const deleteTypeValue = async (form) => {
  const res = await fetch(`${VITE_API_URL}/types/deleteTypeValue`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  return await res.json();
};

export const addTypeValue = async (form) => {
  const res = await fetch(`${VITE_API_URL}/types/addTypeValue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  return await res.json();
};
