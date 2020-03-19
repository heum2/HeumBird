import produce from 'immer';

export const initialState = {
  mainPosts: [], // 내가 올린 포스트들
  followPosts: [], // 팔로우한 유저 포스트들
  compassPosts: [], // 전체공개 포스트들
  singlePost: {}, // 개인 포스트
  imagePaths: [], // 미리보기 이미지 경로
  hashtagList: [], // 해쉬검색 리스트
  imageUploadErrorReason: '', // 이미지 업로드 실패 사유
  isAddingPost: false, // 포스트 업로드 중
  postAdded: false, // 포스트 업로드 성공
  addPostErrorReason: '', // 포스트 업로드 실패 사유
  isAddingComment: false, // 댓글 업로드 중
  commentAdded: false, // 댓글 업로드 성공
  addCommentErrorReason: '', // 댓글 업로드 실패 사유
  postRemoved: false, // 포스트 삭제 성공
  removePostErrorReason: '', // 포스트 삭제 실패 사유
  isEditingPost: false, // 포스트 수정 중
  postEdited: false, // 포스트 수정 성공
  editPostErrorReason: '', // 포스트 수정 실패사유
  hasMorePost: false, // 게시글 더보기,
  hasMoreComment: false, // 댓글 더보기
};

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';
export const UPLOAD_IMAGES_NULLURE = 'UPLOAD_IMAGES_NULLURE';

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

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';
export const EDIT_POST_NULLURE = 'EDIT_POST_NULLURE';

export const LOAD_EXPLORE_POSTS_REQUEST = 'LOAD_EXPLORE_POSTS_REQUEST';
export const LOAD_EXPLORE_POSTS_SUCCESS = 'LOAD_EXPLORE_POSTS_SUCCESS';
export const LOAD_EXPLORE_POSTS_FAILURE = 'LOAD_EXPLORE_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const FIND_HASHTAG_REQUEST = 'FIND_HASHTAG_REQUEST';
export const FIND_HASHTAG_SUCCESS = 'FIND_HASHTAG_SUCCESS';
export const FIND_HASHTAG_FAILURE = 'FIND_HASHTAG_FAILURE';
export const FIND_HASHTAG_NULLURE = 'FIND_HASHTAG_NULLURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case UPLOAD_IMAGES_REQUEST: {
        draft.imageUploadErrorReason = '';
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        action.data.forEach(p => {
          draft.imagePaths.push(p);
        });
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        draft.imageUploadErrorReason = action.error;
        break;
      }
      case UPLOAD_IMAGES_NULLURE: {
        draft.imageUploadErrorReason = '';
        draft.imagePaths = [];
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
        draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
        draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
        break;
      }
      case LOAD_MAIN_POSTS_SUCCESS: {
        action.data.forEach(p => {
          draft.mainPosts.push(p);
        });
        draft.hasMorePost = action.data.length === 10;
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
        if (Object.keys(draft.singlePost).length !== 0) {
          draft.singlePost.Comments.push(action.data.comment);
        }
        if (draft.mainPosts.length !== 0) {
          const postIndex = draft.mainPosts.findIndex(
            v => v.id === action.data.postId,
          );
          draft.mainPosts[postIndex].Comments.push(action.data.comment);
        }
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
        if (Object.keys(draft.singlePost).length !== 0) {
          draft.singlePost.Likers.unshift({ id: action.data.userId });
        }
        if (draft.mainPosts.length !== 0) {
          const postIndex = draft.mainPosts.findIndex(
            v => v.id === action.data.postId,
          );
          draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId });
        }
        break;
      }
      case LIKE_POST_FAILURE: {
        break;
      }
      case UNLIKE_POST_REQUEST: {
        break;
      }
      case UNLIKE_POST_SUCCESS: {
        if (Object.keys(draft.singlePost).length !== 0) {
          const singleLikeIndex = draft.singlePost.Likers.findIndex(
            v => v.id === action.data.userId,
          );
          draft.singlePost.Likers.splice(singleLikeIndex, 1);
        }
        if (draft.mainPosts.length !== 0) {
          const postIndex = draft.mainPosts.findIndex(
            v => v.id === action.data.postId,
          );
          const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(
            v => v.id === action.data.userId,
          );
          draft.mainPosts[postIndex].Likers.splice(likeIndex, 1);
        }
        break;
      }
      case UNLIKE_POST_FAILURE: {
        break;
      }
      case REMOVE_POST_REQUEST: {
        draft.postRemoved = false;
        break;
      }
      case REMOVE_POST_SUCCESS: {
        const index = draft.mainPosts.findIndex(v => v.id === action.data);
        draft.mainPosts.splice(index, 1);
        draft.postRemoved = true;
        break;
      }
      case REMOVE_POST_FAILURE: {
        draft.postRemoved = false;
        draft.removePostErrorReason = action.error;
        break;
      }
      case EDIT_POST_REQUEST: {
        draft.isEditingPost = true;
        draft.postEdited = false;
        draft.editPostErrorReason = '';
        break;
      }
      case EDIT_POST_SUCCESS: {
        const index = draft.mainPosts.findIndex(v => v.id === action.data.id);
        draft.mainPosts[index] = action.data;
        draft.postEdited = true;
        draft.isEditingPost = false;
        break;
      }
      case EDIT_POST_FAILURE: {
        draft.editPostErrorReason = action.error;
        draft.isEditingPost = false;
        break;
      }
      case EDIT_POST_NULLURE: {
        draft.editPostErrorReason = '';
        draft.postEdited = false;
        break;
      }
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_EXPLORE_POSTS_REQUEST: {
        draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
        draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
        break;
      }
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_EXPLORE_POSTS_SUCCESS: {
        action.data.forEach(p => {
          draft.mainPosts.push(p);
        });
        draft.hasMorePost = action.data.length === 12;
        break;
      }
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_EXPLORE_POSTS_FAILURE: {
        break;
      }
      case LOAD_POST_REQUEST: {
        draft.singlePost = {};
        break;
      }
      case LOAD_POST_SUCCESS: {
        draft.singlePost = Object.assign({}, action.data);
        break;
      }
      case LOAD_POST_FAILURE: {
        break;
      }
      case FIND_HASHTAG_REQUEST: {
        draft.hashtagList = [];
        draft.hashtagFinding = true;
        break;
      }
      case FIND_HASHTAG_SUCCESS: {
        action.data.forEach(p => {
          draft.hashtagList.push(p);
        });
        draft.hashtagFinding = false;
        break;
      }
      case FIND_HASHTAG_FAILURE: {
        draft.hashtagFinding = false;
        break;
      }
      case FIND_HASHTAG_NULLURE: {
        draft.hashtagList = [];
        draft.hashtagFinding = false;
        break;
      }
      default: {
        break;
      }
    }
  });
};
