import React, { useState } from "react";
import MenuArtist from "./MenuArtist";
import ModalArtista from "./ModalArtista";
import useAuth from "../../hooks/useAuth";

const ArtistCard = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  const { name, genere, urlSpotify, urlYoutube, countrie, image, chanelImage } =
    data;
  const { deleteArtist } = useAuth();

  const edit = () => {
    setOpenModal(true);
  };
  const ondelete = () => {
    deleteArtist(data.id);
  };

  return (
    <div className="bg-white shadow mt-3  rounded-xl">
      <div className="bg-gray-300 rounded-t-xl p-1 px-3 flex justify-between">
        <h1 className="font-medium">{name}</h1>
        <MenuArtist edit={edit} ondelete={ondelete} data={data} />
      </div>

      <div className="p-3 flex items-center">
        <div className="w-full">
          {image ? (
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
              <img src={image} />
            </div>
          ) : (
            <i class="fas fa-user-circle text-5xl"></i>
          )}
        </div>

        <div className="w-full">
          <p>
            <i class="fas fa-map-marker-alt mr-1 text-red-500"></i>
            {countrie}
          </p>
        </div>

        <div className="w-full">
          <p>
            <i class="fas fa-music mr-1 text-blue-500"></i>
            {genere}
          </p>
        </div>

        <div className="w-full">
          <a
            href={`${
              urlSpotify.includes("https") ? urlSpotify : `//${urlSpotify}`
            }`}
            target="_blank"
          >
            <i class="fab fa-spotify text-green-500"></i> {urlSpotify}
          </a>
        </div>

        <div className="w-full">
          <a
            href={`${
              urlYoutube.includes("https") ? urlYoutube : `//${urlYoutube}`
            }`}
            target="_blank"
            className="flex items-center gap-2"
          >
            <i class="fab fa-youtube  text-red-500"></i>

            {urlYoutube}

            {chanelImage && (
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                <img src={chanelImage} />
              </div>
            )}
          </a>
        </div>
      </div>

      <ModalArtista
        data={data}
        openModal1={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default ArtistCard;
