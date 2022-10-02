export const isImageLink = (text) => {
  if (typeof text !== "string") {
    return false;
  }
  return (
    text.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !== null
  );
};

export const getTransformedImage = (url) => {
  const substring = "upload/";
  const index = url.indexOf(substring) + substring.length;
  const size = 300;
  return (
    url.slice(0, index) + `w_${size},h_${size},c_limit/` + url.slice(index)
  );
};

export const uploadImage = (file, isProfileCloud, callback) => {
  if (!file || file === "") return;
  const data = new FormData();
  const cloudName = process.env.REACT_APP_CLOUNDINARY_CLOUD_NAME;
  const uploadPreset = isProfileCloud
    ? process.env.REACT_APP_CLOUNDINARY_UPLOAD_PROFILES_PRESET
    : process.env.REACT_APP_CLOUNDINARY_UPLOAD_MESSAGES_PRESET;
  data.append("file", file);
  data.append("upload_preset", uploadPreset);
  data.append("cloud_name", cloudName);
  fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "post",
    body: data,
  })
    .then((resp) => resp.json())
    .then((data) => {
      callback(data.secure_url);
    })
    .catch((err) => console.log(err));
};
