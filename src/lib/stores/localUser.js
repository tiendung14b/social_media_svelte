import { writable } from "svelte/store";

// const createLocalUser = () => {
//   const { subscribe, set, update } = writable(null);
//   // return {
//   //   subscribe,
//   //   set,
//   //   update,
//   //   login: (user) => {
//   //     set(user);
//   //   },
//   //   logout: () => {
//   //     set(null);
//   //   },
//   // };
// }

export const localUser = writable({
  access_token: null,
});