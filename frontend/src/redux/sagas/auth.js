import { put, call, takeLatest, all } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import { Types } from "../actions/auth";

import { requestCreator, successCreator, failureCreator } from "../utils/action";
import API from "../api/auth";

function* signIn(action) {
  const type = action.type;
  try {
    yield put(requestCreator(type, {}));
    const payload = yield call(API[type], action);
    window.localStorage.setItem("token", payload.token);
    yield put(successCreator(type, payload));
  } catch (err) {
    console.error(err);
    yield put(failureCreator(type, { err }));
  }
}

function* requestResetPassword(action) {
  const type = action.type;
  try {
    yield put(requestCreator(type, {}));
    const payload = yield call(API[type], action);
    yield put(successCreator(type, payload));
    NotificationManager.success("Reset password email has been successfully sent!");
  } catch (err) {
    console.error(err);
    yield put(failureCreator(type, { err }));
  }
}

function* resetPassword(action) {
  const type = action.type;
  try {
    yield put(requestCreator(type, {}));
    const payload = yield call(API[type], action);
    window.localStorage.setItem("token", payload.token);
    yield put(successCreator(type, payload));
    NotificationManager.success("New password has been successfully set!");
  } catch (err) {
    console.error(err);
    yield put(failureCreator(type, { err }));
  }
}

function* signOut(action) {
  const type = action.type;
  window.localStorage.removeItem("token");
  yield put(successCreator(type, null));
}

function* checkToken(action) {
  const type = action.type;
  try {
    yield put(requestCreator(type, {}));
    const payload = yield call(API[type], action);
    window.localStorage.setItem("token", payload.token);
    yield put(successCreator(type, payload));
  } catch (err) {
    console.error(err);
    window.localStorage.removeItem("token");
    yield put(failureCreator(type, { err, showAlert: false }));
  }
}

export function* authSaga() {
  yield all([
    takeLatest(Types.SIGN_IN,                signIn),
    takeLatest(Types.REQUEST_RESET_PASSWORD, requestResetPassword),
    takeLatest(Types.RESET_PASSWORD,         resetPassword),
    takeLatest(Types.SIGN_OUT,               signOut),
    takeLatest(Types.CHECK_TOKEN,            checkToken),
  ]);
}
