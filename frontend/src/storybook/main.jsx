import React from "react";
import { createRoot } from "react-dom/client";
import "@deslop/tma/styles.css";
import "../aiwa/styles/theme.css";
import "../aiwa/styles/composition.css";
import "@deslop/web-ui/styles.css";
import "./storybook.css";
import { StorybookApp } from "./StorybookApp";

createRoot(document.getElementById("storybook-root")).render(<StorybookApp />);
