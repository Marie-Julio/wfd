import { useEffect, useState } from "react";
import Icon from "./Icon";
import { Link, useLocation } from "react-router-dom";




const SideBar = ({ open: propOpen, setOpen }) => {

  const [open, setLocalOpen] = useState(true);
  

  useEffect(() => {
    setLocalOpen(propOpen); // Synchronise l'état local avec la prop `open`
}, [propOpen]);

const location = useLocation();

    const Menus = [
      { title: "Accueil", src: "/admin/dashboard", icon: "bx-home" },


      { title: "Gestion Cours ", src: "", gap: true },
      { title: "Module", src: "/admin/cours", icon: "bx-book-bookmark"},
      { title: "Sequences", src: "/admin/sequences", icon: "bx-book-bookmark"},

      { title: "Gestion  Examens", src: "", gap: true },
      { title: "QCMs", src: "/admin/qcms", icon: "bxs-palette"  },
      { title: "QCMs questions", src: "/admin/sqcms-questions", icon: "bx-conversation"  },
      { title: "QCMs Choix", src: "/admin/sqcms-choix", icon: "bx-conversation"  },

      { title: "Gestion  Examens par Sequence", src: "", gap: true },
      { title: "Test Sequence", src: "/admin/sqcms", icon: "bxs-palette"  },
      { title: "Quetion des tests", src: "/admin/sqcms-questions", icon: "bx-conversation"  },
      { title: "Choix du Test", src: "/admin/sqcms-choix", icon: "bx-conversation"  },

      { title: "Gestion Inscriptions", src: "", gap: true },
      { title: "Promotions ", src: "/admin/promotion", icon: "bx-braille"  },
      { title: "Notifications", src: "/admin/notification", icon: "bx-bell"  }, 
      { title: "Inscriptions", src: "/admin/inscription", icon: "bx-label"  },
      { title: "Projets", src: "/admin/projets", icon: "bxs-offer"  },


      { title: "Gestion des utilisateurs ", src: "#", gap: true },
      { title: "Utitlisateur", src: "/admin/users", icon: "bx-group"  },
      { title: "Galerie", src: "/admin/gallerie", icon: "bx-key"  },

      // { title: "Parametrages", src: "Notifications", gap: true },
      // { title: "Parametres", src: "Settings", icon: "bx-cog"  }
    ];
  return (
        <section className="flex scrollbar-none  font-montserrat-light text-black drop-shadow-xl bg-[#f4f5fa] overflow-scroll h-screen">
      <div
        className={` ${
          open ? "w-20" : "w-72"
        } pl-3 pt-8 relative duration-300 h-max`}
      >
        {/* <Icon
            name="bx-chevron-left-circle"
            size="30px"
            color="white"
          className={`absolute cursor-pointer -right-0 top-9 w-7 border-dark-purple
           border-1 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        /> */}
        <div className="flex gap-x-4 items-center">
          <Icon
          name="bx-menu"
          color="black"
          size="30px"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            onClick={() => {
              const newOpenState = !open;
              setLocalOpen(newOpenState);
              setOpen(newOpenState); // Met à jour l'état du parent
          }}
          />
          <h1
            className={`text-tertiaire origin-left font-montserrat-extra-bold text-lg duration-200 ${
              open && "scale-0"
            }`}
          >
            TABLEAU DE BORD
          </h1>
        </div>
        <ul className="pt-3 ">
        {Menus.map((Menu, index) => {
          const isActive = location.pathname === Menu.src;
          const isGap = Menu.gap;
          return (
            <li
              key={index}
              className={`flex  p-2  text-sm items-center  
              ${
            isGap
              ? "mt-9 text-tertiaire font-roboto-bold text-lg font-extrabold text-2xl uppercase pl-2"
              : "mt-2 gap-x-3 rounded-md hover:text-white font-roboto text-black font-semibold cursor-pointer"
          }
          ${isActive ? "bg-tertiaire text-white" : isGap ? "hover:bg-[#f4f5fa]" : "hover:bg-[#1a5fa9]"}`}
            >
              {!Menu.gap && <Link to={Menu.src} className=" hover:text-white flex items-center gap-x-4 drop-shadow-xl">
                <Icon name={`${Menu.icon}`} />
                <span className={`${open && "hidden"} `}>
                  {Menu.title}
                </span>
              </Link>}
              {Menu.gap && <div to={Menu.src} className="flex items-center gap-x-4 drop-shadow-xl">
                {/* <Icon name={`${Menu.icon}`} /> */}
                <span className={`${open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </div>}
            </li>
          );
        })}
      </ul>
      </div>

    </section>
  )
}

export default SideBar