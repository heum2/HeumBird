import {
  all,
  fork,
  call,
  put,
  takeEvery,
  takeLatest,
  debounce,
} from 'redux-saga/effects'; // effects가 알아서 generator를 next() 해준다.
import axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
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
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOW_SUGGESTED_REQUEST,
  LOAD_FOLLOW_SUGGESTED_SUCCESS,
  LOAD_FOLLOW_SUGGESTED_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UPLOAD_USER_IMAGE_REQUEST,
  UPLOAD_USER_IMAGE_SUCCESS,
  UPLOAD_USER_IMAGE_FAILURE,
  REMOVE_USER_IMAGE_REQUEST,
  REMOVE_USER_IMAGE_SUCCESS,
  REMOVE_USER_IMAGE_FAILURE,
  FIND_USER_SUCCESS,
  FIND_USER_REQUEST,
  FIND_USER_FAILURE,
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
      error: e.response && e.response.data,
    });
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
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
      error: e.response && e.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function loadUserAPI(nickname) {
  return axios.get(nickname ? `/user/${nickname}` : '/user', {
    withCredentials: true,
  });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e.response && e.response.data,
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
      error: e.response && e.response.data,
    });
  }
}

function* watchAccessRestrictor() {
  yield takeEvery(USER_ACCESS_TARGET_REQUEST, userAccess);
}

function loadFollowSuggestedAPI(userId, offset = 0, limit = 3) {
  // 서버에 요청을 보내는 부분
  return axios.get(
    `/user/${userId || 0}/suggested?offset=${offset}&limit=${limit}`,
    {
      withCredentials: true,
    },
  );
}

function* loadFollowSuggested(action) {
  try {
    const result = yield call(
      loadFollowSuggestedAPI,
      action.data,
      action.offset,
    ); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: LOAD_FOLLOW_SUGGESTED_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_FOLLOW_SUGGESTED_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLoadFollowSuggested() {
  yield takeEvery(LOAD_FOLLOW_SUGGESTED_REQUEST, loadFollowSuggested);
}

function loadFollowersAPI(nickname, offset = 0, limit = 20) {
  // 서버에 요청을 보내는 부분
  return axios.get(
    `/user/${encodeURIComponent(
      nickname,
    )}/followers?offset=${offset}&limit=${limit}`,
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
      error: e.response && e.response.data,
    });
  }
}

function* watchLoadFollowers() {
  yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function loadFollowingsAPI(nickname, offset = 0, limit = 20) {
  // 서버에 요청을 보내는 부분
  return axios.get(
    `/user/${encodeURIComponent(
      nickname,
    )}/followings?offset=${offset}&limit=${limit}`,
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
      error: e.response && e.response.data,
    });
  }
}

function* watchFollow() {
  yield takeEvery(FOLLOW_USER_REQUEST, follow);
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
      error: e.response && e.response.data,
    });
  }
}

function* watchUnfollow() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unfollow);
}

function uploadUserImageAPI(formData) {
  return axios.post(`/user/image`, formData, {
    withCredentials: true,
  });
}

function* uploadUserImage(action) {
  try {
    const result = yield call(uploadUserImageAPI, action.data);
    yield put({
      type: UPLOAD_USER_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: UPLOAD_USER_IMAGE_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchUploadUserImage() {
  yield takeLatest(UPLOAD_USER_IMAGE_REQUEST, uploadUserImage);
}

function removeUserImageAPI() {
  return axios.delete(`/user/image`, {
    withCredentials: true,
  });
}

function* removeUserImage() {
  try {
    yield call(removeUserImageAPI); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: REMOVE_USER_IMAGE_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: REMOVE_USER_IMAGE_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchRemoveUserImage() {
  yield takeLatest(REMOVE_USER_IMAGE_REQUEST, removeUserImage);
}

function findUserAPI(nicknameData) {
  return axios.post(`/user/find`, { nickname: nicknameData });
}

function* findUser(action) {
  try {
    const result = yield call(findUserAPI, action.data); // call(함수, 인자) : 동기 함수 호출
    yield put({
      type: FIND_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: FIND_USER_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchFindUser() {
  yield debounce(2000, FIND_USER_REQUEST, findUser);
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
    fork(watchLoadFollowSuggested),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogOut),
    fork(watchUploadUserImage),
    fork(watchRemoveUserImage),
    fork(watchFindUser),
  ]);
}
