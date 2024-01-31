import React from "react";
import ModalArtista from "../components/Artistas/ModalArtista";
import useAuth from "../hooks/useAuth";
import MenuArtist from "../components/Artistas/MenuArtist";
import ArtistCard from "../components/Artistas/ArtistCard";

const Artistas = () => {
  const { artist } = useAuth();

  return (
    <div>
      <h1 className="font-bold text-4xl">Artistas</h1>
      <hr className="mt-3 border" />

      <div className="flex justify-end mt-3">
        <ModalArtista />
      </div>

      <div className="mt-5">
        {artist.map((e) => (
          <ArtistCard data={e} />
        ))}
      </div>
    </div>
  );
};

export default Artistas;
