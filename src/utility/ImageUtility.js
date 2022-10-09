export const isImageLink = (text) => {
  if (typeof text !== "string") {
    return false;
  }
  //return text.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|webp)(\?(.*))?$/gim) !== null
  return text.includes("firebasestorage.googleapis");
};
