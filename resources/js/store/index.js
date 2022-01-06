import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            authenticated: false,
            user: null,
        };
    },
    getters: {
        authenticated(state) {
            return state.authenticated;
        },
        user(state) {
            return state.user;
        },
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setAuthenticated(state, payload) {
            state.authenticated = payload;
        },
    },
    actions: {
        async signIn({ dispatch }, payload) {
            try {
                await axios.get("/sanctum/csrf-cookie");
                const res = await axios.post("/api/authenticate", payload);

                // await axios.post("/api/authenticate", payload)
                // .then((res) => {
                //     return dispatch("getUser");
                // })
                // .catch((err) => {
                //     throw err.response;
                // });

                // if (res.data.status.code == 401) {
                //     throw res.message;
                // }

                return dispatch("getUser");
            } catch (e) {
                throw `User can not get autheticated`;
                // throw e;
            }
        },

        async getUser({ commit }) {
            await axios
                .get("/api/user")
                .then((res) => {
                    commit("setUser", res.data);
                    commit("setAuthenticated", true);
                })
                .catch((e) => {
                    commit("setUser", null);
                    commit("setAuthenticated", false);
                    throw `User can not get autheticated`;
                });
        },

        async logout({ commit }) {
            await axios
                .post("/api/logout")
                .then((res) => {
                    commit("setUser", null);
                    commit("setAuthenticated", false);
                })
                .catch(() => {
                    commit("setUser", null);
                    commit("setAuthenticated", false);
                });
        },
    },
});

export default store;
