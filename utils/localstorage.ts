export const setLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  const storageData = data !== null ? JSON.parse(data) : [];
  return storageData;
};

export const cleanLocalStorage = (key: string) => {
  localStorage.setItem(key, "[]");
};
