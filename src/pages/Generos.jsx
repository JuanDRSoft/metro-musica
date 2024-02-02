import React from "react";
import ModalGenero from "../components/Generos/ModalGenero";
import useAuth from "../hooks/useAuth";
import GeneroCard from "../components/Generos/GeneroCard";

const Generos = () => {
  const { generos } = useAuth();

  return (
    <div>
      <h1 className="font-bold text-4xl">Generos</h1>
      <hr className="mt-3 border" />

      <div className="flex justify-end mt-3">
        <ModalGenero />
      </div>

      <div className="mt-5 grid grid-cols-5 gap-5">
        {generos.map((e) => (
          <GeneroCard data={e} />
        ))}
      </div>
    </div>
  );
};

export default Generos;
