require("./bootstrap");

import { createApp } from "vue";
import router from "./routes";
import App from "./components/App";

const app = createApp(App);
app.use(router).mount("#app");
