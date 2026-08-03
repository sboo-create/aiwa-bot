import "./aiwa/styles/fonts.css";
import "@deslop/tma/styles.css";
import "@deslop/web-ui/styles.css";
import "./aiwa/styles/theme.css";
import "./aiwa/styles/composition.css";
// Последним: перебивает примитивы deslop, см. шапку файла.
import "./aiwa/styles/overrides.css";
import { installBridge } from "./aiwa/bridge.jsx";

installBridge();
