import "./styles/quasar.sass";
import "@quasar/extras/material-icons/material-icons.css";
import { Loading, Dialog } from "quasar";

export default {
  config: {
    dark: true,
  },
  plugins: { Dialog, Loading },
};
