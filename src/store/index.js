import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from "redux-persist";

import thunk from "redux-thunk";
import reducers from "../reducers/index";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "primary",
  storage,
  blacklist: [],
};

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

const persistedReducer = persistReducer(persistConfig, reducers(history));

const middlewares = [routeMiddleware, thunk];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let enhancers = [applyMiddleware(...middlewares)];

// if (process.env.NODE_ENV === "development") {
//   enhancers.push(
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );
// }

// function configureStore(initialState) {
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept("../reducers/index", () => {
//       const nextRootReducer = require("../reducers/index");
//       // store.replaceReducer(nextRootReducer);
//       store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
//     });
//   }
//   return { store, persistor };
// }

const store = createStore(persistedReducer, compose(...enhancers));
let persistor = persistStore(store);

export { history, store, persistor };
