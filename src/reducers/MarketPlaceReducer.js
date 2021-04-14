import * as types from "../constants/MarketPlaceConstants";

const addMarketPlaceReducer = (
  state = {
    loading: false,
    statusAddMarketPlace: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ADD_MARKET_PLACE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_MARKET_PLACE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case types.ADD_MARKET_PLACE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_STATUS_ADD_MARKET_PLACE:
      return {
        ...state,
        statusAddMarketPlace: payload,
      }

    default:
      return state;
  }
};

const editMarketPlaceReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.EDIT_MARKET_PLACE_REQUEST:
      return {
        loading: true,
      };
    case types.EDIT_MARKET_PLACE_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.EDIT_MARKET_PLACE_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const archiveMarketPlaceReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ARCHIVE_MARKET_PLACE_REQUEST:
      return {
        loading: true,
      };
    case types.ARCHIVE_MARKET_PLACE_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ARCHIVE_MARKET_PLACE_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const restoreMarketPlaceReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.RESTORE_MARKET_PLACE_REQUEST:
      return {
        loading: true,
      };
    case types.RESTORE_MARKET_PLACE_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.RESTORE_MARKET_PLACE_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const marketPlaceInfoReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.MARKET_PLACE_INFO:
      return {
        info: payload,
      };
    default:
      return state;
  }
};

export {
  addMarketPlaceReducer,
  editMarketPlaceReducer,
  archiveMarketPlaceReducer,
  restoreMarketPlaceReducer,
  marketPlaceInfoReducer,
};
