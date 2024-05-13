export const transformJSONtoFormData = (form) => {
  const formData = new FormData();

  for (let key in form) {
    if (key === "images" && Array.isArray(form[key])) {
      form[key].forEach((file) => {
        formData.append(key, file, file.name);
      });
    } else if (Array.isArray(form[key])) {
      formData.append(key, JSON.stringify(form[key]));
    } else if (form[key] instanceof File) {
      formData.append(key, form[key], form[key].name);
    } else if (typeof form[key] === "object" && form[key] !== null) {
      formData.append(key, JSON.stringify(form[key]));
    } else {
      formData.append(key, form[key]);
    }
  }

  return formData;
};
