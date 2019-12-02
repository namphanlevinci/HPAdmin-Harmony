import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../reducers/index";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";
import logger from "redux-logger";

// redux-persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "primary",
  storage,
  blacklist: [
    "MerchantRequests_List",
    "Merchants_RejectedList",
    "MerchantsList",
    "Reject",
    "User",
    "Verify_User",
    "ApprovedStatic",
    "getConsumerUsers",
    "getAllUser",
    "getLogs",
    "getAllBatch"
  ]
};

// import signalRMiddleware from "./signalRmiddleware"

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, reducers(history));

const middlewares = [sagaMiddleware, routeMiddleware, logger];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  let persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers/index", () => {
      const nextRootReducer = require("../reducers/index");
      // store.replaceReducer(nextRootReducer);
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }
  return { store, persistor };
}
export { history };
