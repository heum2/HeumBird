import {
  all,
  fork,
  takeLatest,
  call,
  put,
  takeEvery,
  delay,
} from 'redux-saga/effects'; // effects가 알아서 generator를 next() 해준다.
import axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  EDIT_NICKNAME_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_FAILURE,
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

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/', signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: SIGN_UP_SUCCESS,
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

function logOutAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post(
    '/user/logout',
    {},
    {
      withCredentials: true,
    },
  );
}

function* logOut() {
  try {
    yield call(logOutAPI); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: e,
    });
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function loadUserAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.get(userId ? `/user/${userId}` : '/user/', {
    withCredentials: true, // 클라이언트에서 요청 보낼 때는 브라우저가 쿠리를 같이 동봉해준다.
  }); // 서버사이드렌더링일 때는, 브라우저가 없음.
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data,
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

function unfollowAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.delete(`/user/${userId}/follow`, {
    withCredentials: true,
  });
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // console.error(e);
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: e,
    });
  }
}

function* watchUnfollow() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unfollow);
}

function followAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.post(
    `/user/${userId}/follow`,
    {},
    {
      withCredentials: true,
    },
  );
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: e,
    });
  }
}

function* watchFollow() {
  yield takeEvery(FOLLOW_USER_REQUEST, follow);
}

function loadFollowersAPI(userId, offset = 0, limit = 3) {
  // 서버에 요청을 보내는 부분
  return axios.get(
    `/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`,
    {
      withCredentials: true,
    },
  );
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data, action.offset); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadFollowers() {
  yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function loadFollowingsAPI(userId, offset = 0, limit = 3) {
  // 서버에 요청을 보내는 부분
  return axios.get(
    `/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`,
    {
      withCredentials: true,
    },
  );
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data, action.offset); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadFollowings() {
  yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function removeFollowerAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.delete(`/user/${userId}/follower`, {
    withCredentials: true,
  });
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: e,
    });
  }
}

function* watchRemoveFollower() {
  yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function editNicknameAPI(nickname) {
  // 서버에 요청을 보내는 부분
  return axios.patch(
    `/user/nickname`,
    { nickname },
    {
      withCredentials: true,
    },
  );
}

function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: e,
    });
  }
}

function* watchEditNickname() {
  yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname);
}

export default function* userSaga() {
  yield all([
    // 이벤트리스너 설정하는것과 비슷한것같음.
    fork(watchLogIn), // fork : 비동기 함수호출
    fork(watchLogOut),
    fork(watchLoadUser),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchEditNickname),
  ]);
}
