const { VITE_API_URL } = import.meta.env;
export const login = async (json) => {
  const { username, password } = json;
  const res = await fetch(
    `${VITE_API_URL}/users/login?username=${username}&password=${password}`
  );
  return await res.json();
};

export const editUser = async (json) => {
  const { username, password, name, accessRoles } = json;
  const res = await fetch(`${VITE_API_URL}/users/editUser`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, name, accessRoles }),
  });
  return await res.json();
};

export const getUsers = async () => {
  const res = await fetch(`${VITE_API_URL}/users/getUsers`);
  return await res.json();
};

export const resetPassword = async (json) => {
  const { username } = json;
  const res = await fetch(`${VITE_API_URL}/users/resetPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  return await res.json();
};

export const deleteUser = async (json) => {
  const { _id } = json;
  const res = await fetch(`${VITE_API_URL}/users/deleteUser`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id }),
  });
  return await res.json();
};

export const addUser = async (json) => {
  const { username, password, name, accessRoles } = json;
  const res = await fetch(`${VITE_API_URL}/users/addUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, name, accessRoles }),
  });
  return await res.json();
};

export const searchUsers = async (json) => {
  const { search } = json;
  const res = await fetch(`${VITE_API_URL}/users/searchUsers?search=${search}`);
  return await res.json();
}