export const saveToLocalStorage = (key, value) => {
  const now = new Date();
  // store the item in the format: { value: 'value', expiry: 'expiry time' }
  const item = {
    value: value,
    expiry: now.getTime() + 1000 * 60 * 60 * 24, // one day in milliseconds
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getFromLocalStorage = (key) => {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const getAccessRoles = () => {
  return getFromLocalStorage("ls_user").roles;
};
