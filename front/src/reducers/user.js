import produce from 'immer';

export const initialState = {
  isLoggingIn: false, // 로그인 시도중
  isLoggingOut: false, // 로그아웃 시도중
  logInErrorReason: '', // 로그인 에러 사유
  isDuplicateUser: null, // 이메일 중복확인
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: '', // 회원가입 실패 사유

  me: null, // 내 정보
};

// 액션의 이름
// 비동기 요청(리덕스 사가 필요함), 동기요청 (리덕스 사가 필요 없음)
export const LOG_IN_REQUEST = 'LOG_IN_REQUERS';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const DUPLICATE_USER_REQUEST = 'DUPLICATE_USER_REQUEST';
export const DUPLICATE_USER_SUCCESS = 'DUPLICATE_USER_SUCCESS';
export const DUPLICATE_USER_FAILURE = 'DUPLICATE_USER_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.isLoggingIn = true;
        draft.logInErrorReason = '';
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.isLoggingIn = false;
        draft.me = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLoggingIn = false;
        draft.logInErrorReason = action.error;
        draft.me = null;
        break;
      }
      case DUPLICATE_USER_REQUEST: {
        draft.isDuplicateUser = false;
        break;
      }
      case DUPLICATE_USER_SUCCESS: {
        draft.isDuplicateUser = action.data;
        break;
      }
      case DUPLICATE_USER_FAILURE: {
        draft.isDuplicateUser = false;
        break;
      }
      case SIGN_UP_REQUEST: {
        draft.isSigningUp = true;
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.isSigningUp = false;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSigningUp = false;
        break;
      }
      default: {
        break;
      }
    }
  });
};
