export const getImageSource = (image) => {
  if (!image) return null;
  return typeof image === "string" ? { uri: image } : image;
};
