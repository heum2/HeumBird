import {
  all,
  fork,
  call,
  put,
  delay,
  throttle,
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
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducers/user';

function logInAPI(loginData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/login', loginData, {
    withCredentials: true, // back 과 front가 쿠키를 주고 받을 수 있다.
  });
}

function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data); // call : 동기 함수 호출
    yield delay(2000);
    console.log('saga:', action.data);
    const result = {
      data: {
        userId: action.data.userId,
        nickname: 'HeumHeum2',
      },
    };
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
  return axios.post('/user/', emailData);
}

function* emailDuplicate(action) {
  try {
    // const result = yield call(emailDuplicateAPI, action.data); // call : 동기 함수 호출

    // 서버쪽에 이메일 비교해서 true, false값 리턴 할 듯
    const result = {
      data: false,
    };
    if (action.data === 'jwh6295@gmail.com') {
      result.data = true;
    } else {
      result.data = false;
    }
    yield put({
      type: DUPLICATE_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: DUPLICATE_USER_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchEmailDuplicate() {
  yield throttle('1000', DUPLICATE_USER_REQUEST, emailDuplicate);
}

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/', signUpData);
}

function* signUp(action) {
  try {
    // const result = yield call(signUpAPI, action.data); // call : 동기 함수 호출

    // 서버쪽에 이메일 비교해서 true, false값 리턴 할 듯
    console.log(action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    // 이벤트리스너 설정하는것과 비슷한것같음.
    fork(watchLogIn), // fork : 비동기 함수호출
    fork(watchEmailDuplicate),
    fork(watchSignUp),
  ]);
}
