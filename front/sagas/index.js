import { all, call } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';

axios.defaults.baseURL = 'http://localhost:3060/api';

export default function* rootSaga() {
  yield all([call(user)]);
}
