import produce from 'immer';

export const initialState = {
  mainPosts: [], // 팔로우들의 포스트들 및 내가 올린 포스트들
  followPosts: [], // 팔로우한 유저 포스트들
  compassPosts: [], // 화면에 보일 포스트들
  imagePaths: [], // 미리보기 이미지 경로
  isAddingPost: false, // 포스트 업로드 중
  postAdded: false, // 포스트 업로드 성공
  addPostErrorReason: '', // 포스트 업로드 실패 사유
  isAddingComment: false, // 댓글 업로드 중
  commentAdded: false, // 댓글 업로드 성공
  addCommentErrorReason: '', // 댓글 업로드 실패 사유
  hasMorePost: false, // 더보기
  singlePost: null,
};

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case UPLOAD_IMAGES_REQUEST: {
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        action.data.forEach(p => {
          draft.imagePaths.push(p);
        });
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        break;
      }
      case REMOVE_IMAGE: {
        const index = draft.imagePaths.findIndex((v, i) => i === action.index);
        draft.imagePaths.splice(index, 1);
        break;
      }
      case ADD_POST_REQUEST: {
        draft.isAddingPost = true;
        draft.postAdded = false;
        draft.addPostErrorReason = '';
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.isAddingPost = false;
        draft.postAdded = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      }
      case ADD_POST_FAILURE: {
        draft.isAddingPost = false;
        draft.addPostErrorReason = action.error;
        break;
      }
      case LOAD_MAIN_POSTS_REQUEST: {
        break;
      }
      case LOAD_MAIN_POSTS_SUCCESS: {
        action.data.forEach(p => {
          draft.mainPosts.push(p);
        });
        break;
      }
      case LOAD_MAIN_POSTS_FAILURE: {
        break;
      }
      case ADD_COMMENT_REQUEST: {
        draft.isAddingComment = true;
        draft.commentAdded = false;
        draft.addCommentErrorReason = '';
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.data.postId,
        );
        draft.mainPosts[postIndex].Comments.push(action.data.comment);
        draft.isAddingComment = false;
        draft.commentAdded = true;
        break;
      }
      case ADD_COMMENT_FAILURE: {
        draft.isAddingComment = false;
        draft.addCommentErrorReason = action.error;
      }
      case LIKE_POST_REQUEST: {
        break;
      }
      case LIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.data.postId,
        );
        draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId });
        break;
      }
      case LIKE_POST_FAILURE: {
        break;
      }
      case UNLIKE_POST_REQUEST: {
        break;
      }
      case UNLIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.data.postId,
        );
        const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(
          v => v.id === action.data.userId,
        );
        draft.mainPosts[postIndex].Likers.splice(likeIndex, 1);
        break;
      }
      case UNLIKE_POST_FAILURE: {
        break;
      }
      default: {
        break;
      }
    }
  });
};
