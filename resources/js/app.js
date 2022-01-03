require("./bootstrap");

import { createApp } from "vue";
import ExampleComponent from "./components/ExampleComponent";

const app = createApp(ExampleComponent);
app.mount("#app");
