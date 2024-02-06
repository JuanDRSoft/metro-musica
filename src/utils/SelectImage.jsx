import React from "react";
import { storage } from "../../firebase";

const SelectImage = ({ image, setImage, album }) => {
  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`${album}/${file.name}`);

      imageRef
        .put(file)
        .then((snapshot) => {
          console.log("Imagen subida exitosamente:", snapshot);

          imageRef.getDownloadURL().then((downloadURL) => {
            setImage(downloadURL);
          });
        })
        .catch((error) => {
          console.error("Error al subir la imagen:", error);
        });
    }
  };

  return (
    <div>
      <label htmlFor="img">
        {!image ? (
          <i class="fas fa-user-circle text-7xl cursor-pointer text-black/50 hover:text-black"></i>
        ) : (
          <div className="overflow-hidden rounded-full w-16 h-16 cursor-pointer">
            <img src={image} className="w-full h-full" />
          </div>
        )}
      </label>
      <input
        type="file"
        id="img"
        className="hidden"
        onChange={(e) => handleUpload(e)}
      />
    </div>
  );
};

export default SelectImage;
