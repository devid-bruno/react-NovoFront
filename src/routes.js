import Default from "./layouts/dashboards/default";
import Listas from "layouts/dashboards/listas";
import AddPhone from "layouts/dashboards/ferramentas";
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";

import filtroemlote from "layouts/filtros/portabilidade/filtro-em-lote"
import filtroindividual from "layouts/filtros/portabilidade/filtro-individual"
import filtroemlotewpp from "layouts/filtros/whatsapp/filtro-em-lote-wpp"
import filtroindividualwpp from "layouts/filtros/whatsapp/filtro-individual-wpp"

import users from "layouts/users/gerenciamento";

import newUser from "layouts/pages/users/user-new"
import DataTables from "layouts/applications/data-tables";
import Calendar from "layouts/applications/calendar";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import ProductPage from "layouts/ecommerce/products/product-page";
import OrderList from "layouts/ecommerce/orders/order-list";
import OrderDetails from "layouts/ecommerce/orders/order-details";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpBasic from "layouts/authentication/sign-up/basic";
import SignUpCover from "layouts/authentication/sign-up/cover";
import SignUpIllustration from "layouts/authentication/sign-up/illustration";

// React icons
import { IoDocument } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoDocuments } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FcSimCard } from "react-icons/fc";
import { FaTools } from "react-icons/fa";

const routes = [
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <IoHome size="15px" color="inherit" />,
    collapse: [
      {
        name: "Listas",
        key: "default",
        route: "/",
        component: Listas,
        private: true,
      }
    ],
  },{
    type: "collapse",
    name: "Ferramentas",
    key: "ferramentas",
    icon: <FaTools size="15px" color="inherit" />,
    collapse: [
      {
        name: "Adicionar Telefone",
        key: "default",
        route: "/adicionar-telefone",
        component: AddPhone,
        private: true,
      }
    ],
  },
  { type: "title", title: "Menus", key: "title-pages" },
  {
    type: "collapse",
    name: "Gerenciamento",
    key: "gerenciamento",
    icon: <IoBuild size="15px" color="inherit" />,
    collapse: [
      {
        name: "Usuários",
        key: "usuarios",
        route: "/applications/Users",
        component: users,
        private: true,
        admin: true,
        user: false
      },
      {
        name: "Novo Usuário",
        key: "novo-usuario",
        route: "/applications/new-user",
        component: newUser,
        private: true,
        admin: true,
        user: false
      }
    ],
  },
  {
    type: "route",
    name: "Applications",
    key: "applications",
    icon: <IoBuild size="15px" color="inherit" />,
    collapse: [
      {
        name: "Kanban",
        key: "kanban",
        route: "/applications/kanban",
        component: Kanban,
      },
      {
        name: "Wizard",
        key: "wizard",
        route: "/applications/wizard",
        component: Wizard,
      },
      {
        name: "Data Tables",
        key: "data-tables",
        route: "/applications/data-tables",
        component: DataTables,
      },
      {
        name: "Calendar",
        key: "calendar",
        route: "/applications/calendar",
        component: Calendar,
      },
    ],
  },
  {
    type: "route",
    name: "Ecommerce",
    key: "ecommerce",
    icon: <FaShoppingCart size="15px" color="inherit" />,
    collapse: [
      {
        name: "Products",
        key: "products",
        collapse: [
          {
            name: "New Product",
            key: "new-product",
            route: "/ecommerce/products/new-product",
            component: NewProduct,
          },
          {
            name: "Edit Product",
            key: "edit-product",
            route: "/ecommerce/products/edit-product",
            component: EditProduct,
          },
          {
            name: "Product Page",
            key: "product-page",
            route: "/ecommerce/products/product-page",
            component: ProductPage,
          },
        ],
      },
      {
        name: "Orders",
        key: "orders",
        collapse: [
          {
            name: "Order List",
            key: "order-list",
            route: "/ecommerce/orders/order-list",
            component: OrderList,
          },
          {
            name: "Order Details",
            key: "order-details",
            route: "/ecommerce/orders/order-details",
            component: OrderDetails,
          },
        ],
      },
    ],
  },
  {
    type: "route",
    name: "Authentication",
    key: "authentication",
    icon: <IoDocuments size="15px" color="inherit" />,
    collapse: [
      {
        name: "Sign In",
        key: "sign-in",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/login",
            component: SignInBasic,
          },
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-in/cover",
            component: SignInCover,
          },
          {
            name: "Illustration",
            key: "illustration",
            route: "/authentication/sign-in/illustration",
            component: SignInIllustration,
          },
        ],
      },
      {
        name: "Sign Up",
        key: "sign-up",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/sign-up/basic",
            component: SignUpBasic,
          },
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-up/cover",
            component: SignUpCover,
          },
          {
            name: "Illustration",
            key: "illustration",
            route: "/authentication/sign-up/illustration",
            component: SignUpIllustration,
          },
        ],
      },
    ],
  },
  {
    type: "collapse",
    name: "Filtros",
    key: "Filtros",
    icon: <FcSimCard size="15px" color="inherit" />,
    collapse: [
      {
        name: "Filtro Operadora",
        key: "filtro-operadora",
        collapse: [
          {
            name: "Filtro Em Lote",
            key: "filtro-em-lote",
            route: "/filtros/portabilidade/filtro-em-lote",
            component: filtroemlote,
            private: true
          },
          {
            name: "Filtro Individual",
            key: "filtro-individual",
            route: "/filtros/portabilidade/filtro-individual",
            component: filtroindividual,
            private: true
          }
        ],
      },
      {
        name: "Filtro WhatsApp",
        key: "filtro-whatsapp",
        collapse: [
          {
            name: "Filtro Em Lote",
            key: "filtro-em-lote",
            route: "/filtro-em-lote-wpp",
            component: filtroemlotewpp,
            private: true
          },
          {
            name: "Filtro Individual",
            key: "filtro-individual",
            route: "/filtros/whatsapp/filtro-individual",
            component: filtroindividualwpp,
            private: true
          }
        ],
      },
    ],
  },
];

export default routes;
