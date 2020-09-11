import { put, call, takeLatest, all } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import { Types } from "../actions/user";

import { requestCreator, successCreator, failureCreator } from "../utils/action";
import API from "../api/user";

function* sagaAction(action) {
  const type = action.type;
  try {
    yield put(requestCreator(type, {}));
    const payload = yield call(API[type], action);
    yield put(successCreator(type, payload));
  } catch (err) {
    console.error(err);
    yield put(failureCreator(type, { err }));
  }
}

function* createUser(action) {
  const type = action.type;
  try {
    yield put(requestCreator(type, {}));
    const payload = yield call(API[type], action);
    yield put(successCreator(type, payload));
    NotificationManager.success("New user has been successfully created!");
  } catch (err) {
    console.error(err);
    yield put(failureCreator(type, { err }));
  }
}

function* updateUser(action) {
  const type = action.type;
  try {
    yield put(requestCreator(type, {}));
    const payload = yield call(API[type], action);
    yield put(successCreator(type, payload));
    NotificationManager.success("User has been successfully updated!");
  } catch (err) {
    console.error(err);
    yield put(failureCreator(type, { err }));
  }
}

export function* userSaga() {
  yield all([
    takeLatest(Types.GET_SELF,    sagaAction),
    takeLatest(Types.SEARCH_USER, sagaAction),
    takeLatest(Types.GET_USER,    sagaAction),
    takeLatest(Types.UPDATE_USER, updateUser),
    takeLatest(Types.CREATE_USER, createUser),
  ]);
}
