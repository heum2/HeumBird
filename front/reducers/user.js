import produce from 'immer';

export const initialState = {
  isLoggingIn: false, // 로그인 시도중
  isLoggingOut: false, // 로그아웃 시도중
  logInErrorReason: '', // 로그인 실패 사유
  emailValidate: '', // 이메일 체크
  emailErrorReason: '', // 이메일 실패 사유
  isSigningUp: false, // 회원가입 시도중

  me: null, // 내 정보
};

// 액션의 이름
// 비동기 요청(리덕스 사가 필요함), 동기요청 (리덕스 사가 필요 없음)
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const EMAIL_INPUT_FAILURE = 'EMAIL_INPUT_FAILURE';
export const EMAIL_REGEX_FAILURE = 'EMAIL_REGEX_FAILURE';

export const DUPLICATE_USER_REQUEST = 'DUPLICATE_USER_REQUEST';
export const DUPLICATE_USER_SUCCESS = 'DUPLICATE_USER_SUCCESS';
export const DUPLICATE_USER_FAILURE = 'DUPLICATE_USER_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_UP_NULLURE = 'SIGN_UP_NULLURE';

export const USER_ACCESS_TARGET_REQUEST = 'USER_ACCESS_TARGET_REQUEST';
export const USER_ACCESS_TARGET_SUCCESS = 'USER_ACCESS_TARGET_SUCCESS';
export const USER_ACCESS_TARGET_FAILURE = 'USER_ACCESS_TARGET_FAILURE';

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
      case LOAD_USER_REQUEST: {
        break;
      }
      case LOAD_USER_SUCCESS: {
        draft.me = action.data;
        break;
      }
      case LOAD_USER_FAILURE: {
        break;
      }
      case EMAIL_INPUT_FAILURE: {
        draft.emailValidate = 'error';
        draft.emailErrorReason = '이메일을 입력해주세요!';
        break;
      }
      case EMAIL_REGEX_FAILURE: {
        draft.emailValidate = 'error';
        draft.emailErrorReason = '이메일 형식으로 입력해주세요!';
        break;
      }
      case DUPLICATE_USER_REQUEST: {
        draft.emailValidate = 'validating';
        draft.emailErrorReason = '';
        break;
      }
      case DUPLICATE_USER_SUCCESS: {
        draft.emailValidate = 'success';
        draft.emailErrorReason = '';
        break;
      }
      case DUPLICATE_USER_FAILURE: {
        draft.emailValidate = 'error';
        draft.emailErrorReason = action.error;
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
      case SIGN_UP_NULLURE: {
        draft.isSigningUp = false;
        draft.emailValidate = '';
        draft.emailErrorReason = '';
      }
      case USER_ACCESS_TARGET_REQUEST: {
        break;
      }
      case USER_ACCESS_TARGET_SUCCESS: {
        draft.me.publictarget = action.data;
        break;
      }
      case USER_ACCESS_TARGET_FAILURE: {
        break;
      }
      default: {
        break;
      }
    }
  });
};
