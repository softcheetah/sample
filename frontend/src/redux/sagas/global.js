import { put, select, takeEvery, all } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import { Creators } from "../actions/global";
import { origin } from "../utils/action";
import { ACTION_STATUS } from "../../constants";

function* listenAction(action) {
  const { status } = yield select(state => state.global);
  if (action.type.endsWith("/request")) {
    const newStatus = {
      ...status,
      [origin(action.type)]: ACTION_STATUS.REQUEST,
    };
    yield put(Creators.updateState({ status: newStatus }));
  } else if (action.type.endsWith("/success")) {
    const newStatus = {
      ...status,
      [origin(action.type)]: ACTION_STATUS.SUCCESS,
    };
    yield put(Creators.updateState({ status: newStatus }));
  } else if (action.type.endsWith("/failure")) {
    const newStatus = {
      ...status,
      [origin(action.type)]: ACTION_STATUS.FAILURE,
    };
    yield put(Creators.updateState({ status: newStatus }));

    const { err, showAlert } = action.payload;
    if (err
      && err.response
      && err.response.data
      && err.response.data.message
      && showAlert !== false) {
      NotificationManager.error(err.response.data.message);
    }
  }
}

export function* globalSaga() {
  yield all([
    takeEvery("*", listenAction),
  ]);
}
