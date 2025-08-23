export const generateSlug = (name, addUnique = false) => {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 60);

  if (addUnique) {
    const unique = Date.now().toString(36);
    return `${base}-${unique}`;
  }

  return base;
};
