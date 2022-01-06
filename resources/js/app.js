require("./bootstrap");

import { createApp } from "vue";
import router from "./routes";
import App from "./components/App";
import axios from "axios";
import store from "./store/index";

axios.defaults.withCredentials = true;
//axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

store.dispatch("getUser").then(() => {
    const app = createApp(App);
    app.use(router).use(store).mount("#app");
});
