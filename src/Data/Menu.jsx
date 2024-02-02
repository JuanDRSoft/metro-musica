export const menuPrincipal = [
  {
    name: "Inicio",
    url: "/app",
    icon: <i class="fas fa-home"></i>,
  },
  {
    name: "Artistas",
    url: "/app/artistas",
    icon: <i class="fas fa-music"></i>,
  },
  {
    id: "ajustes",
    name: "Ajustes",
    icon: <i class="fas fa-cog"></i>,
    sub: [
      {
        name: "Generos",
        url: "/app/generos",
      },
    ],
  },
];
