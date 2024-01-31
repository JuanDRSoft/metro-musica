import React, { useState } from "react";
import MenuArtist from "./MenuArtist";
import ModalArtista from "./ModalArtista";
import useAuth from "../../hooks/useAuth";

const ArtistCard = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  const { name, genere, urlSpotify, urlYoutube, countrie } = data;
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
          <i class="fas fa-user-circle text-5xl"></i>
        </div>

        <div className="w-full text-center">
          <p>{countrie}</p>
        </div>

        <div className="w-full text-center">
          <p>{genere}</p>
        </div>

        <div className="w-full text-center">
          <a href={`//${urlSpotify}`} target="_blank">
            {urlSpotify}
          </a>
        </div>

        <div className="w-full text-center">
          <a href={`//${urlYoutube}`} target="_blank">
            {urlYoutube}
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
