import produce from 'immer';

export const initialState = {
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: '', // 로그인 실패 사유
  isLoggingOut: false, // 로그아웃 시도중
  emailValidate: '', // 이메일 체크
  emailErrorReason: '', // 이메일 실패 사유
  nickValidate: '', // 이메일 체크
  nickErrorReason: '', // 이메일 실패 사유
  isSigningUp: false, // 회원가입 시도중
  isImageUploading: false, // 이미지 업로딩 중..
  imageUploadingReason: '', // 이미지 업로딩 실패 사유
  me: null, // 내 정보
  userInfo: null, // 상대방 정보
  userSearching: false, // 유저 찾는중
  userFinded: false, // 유저 발견
  userCommentFinded: false, // 검색 폼 유저 발견
  usersList: [], // 유저검색 리스트
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트
  hasMoreFollow: false,
  suggestedList: [], // 팔로우 추천 리스트
};

// 액션의 이름
// 비동기 요청(리덕스 사가 필요함), 동기요청 (리덕스 사가 필요 없음)
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_IN_NULLURE = 'LOG_IN_NULLURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const EMAIL_INPUT_FAILURE = 'EMAIL_INPUT_FAILURE';
export const EMAIL_REGEX_FAILURE = 'EMAIL_REGEX_FAILURE';

export const NICKNAME_INPUT_FAILURE = 'NICKNAME_INPUT_FAILURE';
export const NICKNAME_REGEX_FAILURE = 'NICKNAME_REGEX_FAILURE';

export const DUPLICATE_USER_REQUEST = 'DUPLICATE_USER_REQUEST';
export const DUPLICATE_USER_SUCCESS = 'DUPLICATE_USER_SUCCESS';
export const DUPLICATE_USER_FAILURE = 'DUPLICATE_USER_FAILURE';

export const DUPLICATE_NICK_REQUEST = 'DUPLICATE_NICK_REQUEST';
export const DUPLICATE_NICK_SUCCESS = 'DUPLICATE_NICK_SUCCESS';
export const DUPLICATE_NICK_FAILURE = 'DUPLICATE_NICK_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_UP_NULLURE = 'SIGN_UP_NULLURE';

export const USER_ACCESS_TARGET_REQUEST = 'USER_ACCESS_TARGET_REQUEST';
export const USER_ACCESS_TARGET_SUCCESS = 'USER_ACCESS_TARGET_SUCCESS';
export const USER_ACCESS_TARGET_FAILURE = 'USER_ACCESS_TARGET_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const LOAD_FOLLOW_SUGGESTED_REQUEST = 'LOAD_FOLLOW_SUGGESTED_REQUEST';
export const LOAD_FOLLOW_SUGGESTED_SUCCESS = 'LOAD_FOLLOW_SUGGESTED_SUCCESS';
export const LOAD_FOLLOW_SUGGESTED_FAILURE = 'LOAD_FOLLOW_SUGGESTED_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const UPLOAD_USER_IMAGE_REQUEST = 'UPLOAD_USER_IMAGE_REQUEST';
export const UPLOAD_USER_IMAGE_SUCCESS = 'UPLOAD_USER_IMAGE_SUCCESS';
export const UPLOAD_USER_IMAGE_FAILURE = 'UPLOAD_USER_IMAGE_FAILURE';

export const REMOVE_USER_IMAGE_REQUEST = 'REMOVE_USER_IMAGE_REQUEST';
export const REMOVE_USER_IMAGE_SUCCESS = 'REMOVE_USER_IMAGE_SUCCESS';
export const REMOVE_USER_IMAGE_FAILURE = 'REMOVE_USER_IMAGE_FAILURE';

export const FIND_USER_REQUEST = 'FIND_USER_REQUEST';
export const FIND_USER_SUCCESS = 'FIND_USER_SUCCESS';
export const FIND_USER_FAILURE = 'FIND_USER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

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
      case LOG_IN_NULLURE: {
        draft.logInErrorReason = '';
        break;
      }
      case LOG_OUT_REQUEST: {
        draft.isLoggingOut = true;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.isLoggingOut = false;
        draft.me = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        break;
      }

      case LOAD_USER_REQUEST: {
        break;
      }
      case LOAD_USER_SUCCESS: {
        if (action.me) {
          draft.me = action.data;
          break;
        }
        draft.userInfo = action.data;
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
      case NICKNAME_INPUT_FAILURE: {
        draft.nickValidate = 'error';
        draft.nickErrorReason = '닉네임을 입력해주세요!';
        break;
      }
      case NICKNAME_REGEX_FAILURE: {
        draft.nickValidate = 'error';
        draft.nickErrorReason = '2~20글자로 입력해주세요!';
        break;
      }
      case DUPLICATE_NICK_REQUEST: {
        draft.nickValidate = 'validating';
        draft.nickErrorReason = '';
        break;
      }
      case DUPLICATE_NICK_SUCCESS: {
        draft.nickValidate = 'success';
        draft.nickErrorReason = '';
        break;
      }
      case DUPLICATE_NICK_FAILURE: {
        draft.nickValidate = 'error';
        draft.nickErrorReason = action.error;
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
      case LOAD_FOLLOW_SUGGESTED_REQUEST: {
        draft.suggestedList = !action.offset ? [] : draft.suggestedList;
        break;
      }
      case LOAD_FOLLOW_SUGGESTED_SUCCESS: {
        action.data.forEach(d => {
          draft.suggestedList.push(d);
        });
        break;
      }
      case LOAD_FOLLOW_SUGGESTED_FAILURE: {
        break;
      }
      case LOAD_FOLLOWERS_REQUEST: {
        draft.followerList = !action.offset ? [] : draft.followerList;
        draft.hasMoreFollow = action.offset ? draft.hasMoreFollow : true;
        break;
      }
      case LOAD_FOLLOWERS_SUCCESS: {
        action.data.forEach(d => {
          draft.followerList.push(d);
        });
        draft.hasMoreFollow = action.data.length === 15;
        break;
      }
      case LOAD_FOLLOWERS_FAILURE: {
        break;
      }
      case LOAD_FOLLOWINGS_REQUEST: {
        draft.followingList = !action.offset ? [] : draft.followingList;
        draft.hasMoreFollow = action.offset ? draft.hasMoreFollow : true;
        break;
      }
      case LOAD_FOLLOWINGS_SUCCESS: {
        action.data.forEach(d => {
          draft.followingList.push(d);
        });
        draft.hasMoreFollow = action.data.length === 15;
        break;
      }
      case LOAD_FOLLOWINGS_FAILURE: {
        break;
      }
      case ADD_POST_TO_ME: {
        draft.me.Posts.unshift({ id: action.data });
      }
      case FOLLOW_USER_REQUEST: {
        break;
      }
      case FOLLOW_USER_SUCCESS: {
        draft.me.Followings.unshift(action.data);
        if (draft.userInfo !== null) {
          draft.userInfo.Followings += 1;
        }
        draft.followingList.push(action.data);
        break;
      }
      case FOLLOW_USER_FAILURE: {
        break;
      }
      case UNFOLLOW_USER_REQUEST: {
        break;
      }
      case UNFOLLOW_USER_SUCCESS: {
        const index = draft.me.Followings.findIndex(v => v.id === action.data);
        draft.me.Followings.splice(index, 1);
        if (draft.userInfo !== null) {
          draft.userInfo.Followings -= 1;
        }
        const listIndex = draft.followingList.findIndex(
          v => v.id === action.data,
        );
        draft.followingList.splice(listIndex, 1);
        break;
      }
      case UNFOLLOW_USER_FAILURE: {
        break;
      }
      case UPLOAD_USER_IMAGE_REQUEST: {
        draft.isImageUploading = true;
        break;
      }
      case UPLOAD_USER_IMAGE_SUCCESS: {
        draft.isImageUploading = false;
        draft.me.Image = action.data;
        draft.userInfo.Image = action.data;
        break;
      }
      case UPLOAD_USER_IMAGE_SUCCESS: {
        draft.isImageUploading = false;
        draft.imageUploadingReason = action.error;
        break;
      }
      case REMOVE_USER_IMAGE_REQUEST: {
        draft.isImageUploading = true;
        break;
      }
      case REMOVE_USER_IMAGE_SUCCESS: {
        draft.isImageUploading = false;
        draft.me.Image = null;
        draft.userInfo.Image = null;
        break;
      }
      case REMOVE_USER_IMAGE_FAILURE: {
        draft.isImageUploading = false;
        draft.imageUploadingReason = action.error;
        break;
      }
      case FIND_USER_REQUEST: {
        if (!action.data || !action.search) {
          draft.userSearching = false;
        } else {
          draft.userSearching = true;
        }
        draft.usersList = [];
        draft.userFinded = false;
        draft.userCommentFinded = false;
        break;
      }
      case FIND_USER_SUCCESS: {
        action.data.forEach(d => {
          draft.usersList.push(d);
        });
        draft.userSearching = false;
        if (!action.search) {
          draft.userCommentFinded = !action.data.length ? false : true;
        } else {
          draft.userFinded = !action.data.length ? false : true;
        }
        break;
      }
      case FIND_USER_FAILURE: {
        draft.userSearching = false;
        break;
      }
      default: {
        break;
      }
    }
  });
};
