import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "@/scss/styles.scss";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { PiniaSharedState } from "pinia-shared-state";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
// Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa";
import { md } from "vuetify/iconsets/md";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      fa,
      mdi,
      md,
    },
  },
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
pinia.use(PiniaSharedState({ enable: true, initialize: true, type: "native" }));

const app = createApp(App);

app.component("FontAwesomeIcon", FontAwesomeIcon);
library.add(fas);

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    app,
    dsn: "https://d202205b1dbd4963b4ca1dc315757ee3@sentry.office.onix.ua/111",
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["onix-systems-vue-onix-base.staging.onix.ua", /^\//],
      }),
    ],
    tracesSampleRate: 1.0,
    environment: "development",
    logErrors: true,
  });
}

app.use(pinia).use(router).use(vuetify).mount("#app");
