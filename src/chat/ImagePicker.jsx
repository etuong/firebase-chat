import React, { memo, useEffect, useRef } from "react";
import { sendImage } from "../services/Firebase";

const ImagePicker = ({ tag, callback }) => {
  const imageInputRef = useRef(null);

  useEffect(() => {
    const element = imageInputRef.current;

    if (element) {
      element.addEventListener("change", processImageData);

      return () => {
        element.removeEventListener("change", processImageData);
      };
    }
  }, [imageInputRef]);

  function processImageData() {
    const file = imageInputRef.current.files[0];
    sendImage(file);
    // uploadImage(file, isProfileCloud, callback);
  }

  return <input type="file" ref={imageInputRef} accept="image/*" id={tag} />;
};

export default memo(ImagePicker);
