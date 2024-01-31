import React from "react";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [authUser, setAuthUser] = useState({});
  const [usuarioData, setUsuarioData] = useState({});

  const [artist, setArtist] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // El usuario ha iniciado sesión
        setAuthUser(user);
      } else {
        // No hay usuario logueado
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    db.collection("artist").onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let platillos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setArtist(platillos);
    }
  }, []);

  // useEffect(() => {
  //   const data = db.collection("usuarios").doc(authUser.uid);

  //   data
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         setUsuarioData(doc.data());
  //       } else {
  //         console.log("El documento no existe.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error al obtener el documento:", error);
  //     });

  //   data.onSnapshot(
  //     (doc) => {
  //       if (doc.exists) {
  //         setUsuarioData(doc.data());
  //       } else {
  //         console.log("El documento ya no existe.");
  //       }
  //     },
  //     (error) => {
  //       console.error("Error al escuchar cambios en el documento:", error);
  //     }
  //   );
  // }, [authUser]);

  const cerrarSesionAuth = () => {
    auth
      .signOut()
      .then(function () {
        // Cierre de sesión exitoso
        toast.success("Cierre de sesión exitoso");
        navigate("/");
        setAuth({});
      })
      .catch(function (error) {
        // Manejar errores al cerrar sesión
        console.error("Error al cerrar sesión:", error.code, error.message);
      });
  };

  const handleArtist = (body, initial, id) => {
    if (id) {
      editArtist(body, initial, id);
    } else {
      createArtist(body, initial);
    }
  };

  const createArtist = (body, initial) => {
    db.collection("artist")
      .doc()
      .set(body)
      .then(() => {
        toast.success("Artista Creado correctamente");
        initial();
      })
      .catch(() => {
        toast.error("Ocurrio un error no se pudo crear el artista");
      });
  };

  const editArtist = (body, initial, id) => {
    db.collection("artist")
      .doc(id)
      .update(body)
      .then(() => {
        toast.success("Datos de Artista modificados correctamente");
        initial();
      })
      .catch(() => {
        toast.error("Ocurrio un error no se pudo modificar el artista");
      });
  };

  const deleteArtist = (id) => {
    db.collection("artist")
      .doc(id)
      .delete()
      .then(() => {
        toast.success("Artista eliminado correctamente");
      })
      .catch(() => {
        toast.error("Ocurrio un error no se pudo modificar el artista");
      });
  };

  return (
    <AuthContext.Provider
      value={{
        cargando,
        cerrarSesionAuth,
        authUser,
        usuarioData,
        handleArtist,
        artist,
        deleteArtist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
