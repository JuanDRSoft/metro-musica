import React, { useState } from "react";
import MenuGenero from "./MenuGenero";
import useAuth from "../../hooks/useAuth";
import ModalGenero from "./ModalGenero";

const GeneroCard = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  const { name } = data;
  const { deleteGenero } = useAuth();

  const edit = () => {
    setOpenModal(true);
  };
  const ondelete = () => {
    deleteGenero(data.id);
  };

  return (
    <div className="bg-white shadow p-5 text-center rounded-xl relative">
      {name}
      <div className="absolute top-0 right-3">
        <MenuGenero edit={edit} ondelete={ondelete} data={data} />
      </div>

      <ModalGenero
        data={data}
        openModal1={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default GeneroCard;
