import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

import axios from "axios";
import { createStore } from 'vuex';
import VuexORM from "@vuex-orm/core";
import VuexORMAxios from "@vuex-orm/plugin-axios";
import { CartLine, Item, Option, User } from "@/models";

VuexORM.use(VuexORMAxios, { axios });

// Create a new instance of Database.
const database = new VuexORM.Database();

// Register Models to Database.
database.register(CartLine);
database.register(Item);
database.register(Option);
database.register(User);

// Create Vuex Store and register database through Vuex ORM.
const store = createStore({
  plugins: [VuexORM.install(database)],
  state() {
    return {
      user: null
    }
  },
  mutations: {
    login(state, payload) {
      state.user = payload;
    },
    logout(state) {
      state.user = null;
    }
  }
});

createApp(App)
.use(store)
.use(router)
.mount('#app');

export default store;
