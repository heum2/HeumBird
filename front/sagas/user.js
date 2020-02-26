import {
  all,
  fork,
  call,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'; // effects가 알아서 generator를 next() 해준다.
import axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  DUPLICATE_USER_REQUEST,
  DUPLICATE_USER_SUCCESS,
  DUPLICATE_USER_FAILURE,
  DUPLICATE_NICK_REQUEST,
  DUPLICATE_NICK_SUCCESS,
  DUPLICATE_NICK_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  USER_ACCESS_TARGET_REQUEST,
  USER_ACCESS_TARGET_SUCCESS,
  USER_ACCESS_TARGET_FAILURE,
} from '../reducers/user';

function logInAPI(loginData) {
  return axios.post('/user/login', loginData, {
    withCredentials: true, // back 과 front가 쿠키를 주고 받을 수 있다.
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data); // call : 동기 함수 호출
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function emailDuplicateAPI(emailData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/duplicate', emailData);
}

function* emailDuplicate(action) {
  try {
    yield call(emailDuplicateAPI, action.data); // call : 동기 함수 호출
    yield put({
      type: DUPLICATE_USER_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: DUPLICATE_USER_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchEmailDuplicate() {
  yield takeLatest(DUPLICATE_USER_REQUEST, emailDuplicate);
}

function nickDuplicateAPI(nickData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/duplicate', nickData);
}

function* nickDuplicate(action) {
  try {
    yield call(nickDuplicateAPI, action.data); // call : 동기 함수 호출
    yield put({
      type: DUPLICATE_NICK_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: DUPLICATE_NICK_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchNickDuplicate() {
  yield takeLatest(DUPLICATE_NICK_REQUEST, nickDuplicate);
}

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/signup', signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data); // call : 동기 함수 호출
    yield put({
      type: SIGN_UP_SUCCESS,
    });
    yield put({
      type: LOG_IN_REQUEST,
      data: {
        email: action.data.email,
        password: action.data.password,
      },
    });
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function loadUserAPI() {
  // 서버에 요청을 보내는 부분
  return axios.get('/user/', {
    withCredentials: true, // 클라이언트에서 요청 보낼 때는 브라우저가 쿠키를 같이 동봉해준다.
  }); // 서버사이드렌더링일 때는, 브라우저가 없음.
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function userAccessAPI(publictarget) {
  // 서버에 요청을 보내는 부분
  return axios.patch(
    '/user/access',
    { publictarget },
    {
      withCredentials: true, // 클라이언트에서 요청 보낼 때는 브라우저가 쿠키를 같이 동봉해준다.
    },
  ); // 서버사이드렌더링일 때는, 브라우저가 없음.
}

function* userAccess(action) {
  try {
    const result = yield call(userAccessAPI, action.data); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: USER_ACCESS_TARGET_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_ACCESS_TARGET_FAILURE,
      error: e,
    });
  }
}

function* watchAccessRestrictor() {
  yield takeEvery(USER_ACCESS_TARGET_REQUEST, userAccess);
}

export default function* userSaga() {
  yield all([
    // 이벤트리스너 설정하는것과 비슷한것같음.
    fork(watchLogIn), // fork : 비동기 함수호출
    fork(watchEmailDuplicate),
    fork(watchNickDuplicate),
    fork(watchSignUp),
    fork(watchLoadUser),
    fork(watchAccessRestrictor),
  ]);
}
