import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
} from '../reducers/post';

function uploadImagesAPI(formData) {
  return axios.post('/post/images', formData, {
    withCredentials: true,
  });
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default function* postSaga() {
  yield all([fork(watchUploadImages)]);
}
