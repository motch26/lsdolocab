const { VITE_API_URL } = import.meta.env;
export const getCargos = async () => {
  const response = await fetch(`${VITE_API_URL}/cargos/getCargos`);
  return await response.json();
};

export const unreserveCargo = async (_id) => {
  const response = await fetch(`${VITE_API_URL}/cargos/deleteCargo`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id }),
  });
  return await response.json();
};

export const addCargo = async (form) => {
  const response = await fetch(`${VITE_API_URL}/cargos/addCargo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  return await response.json();
};

export const receiveCargo = async (form) => {
  const response = await fetch(`${VITE_API_URL}/cargos/receiveCargo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  return await response.json();
};
