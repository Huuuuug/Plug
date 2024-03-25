import { createApp } from "vue";
import App from "./App.vue";

import "./styles/main.css";
import "./styles/prose.css";
import "./styles/markdown.css";

import "@shikijs/twoslash/style-rich.css";

const app = createApp(App);

app.mount("#app");
