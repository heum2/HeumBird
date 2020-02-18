import produce from 'immer';

export const initialState = {
  followPosts: [], // 팔로우한 유저 포스트들
  compassPosts: [], // 화면에 보일 포스트들
  previewImages: null, // 미리보기 이미지 경로 및 상태
  imagePaths: [], // 미리보기 이미지 경로
  isAddingPost: false, // 포스트 업로드 중
  postAdded: false, // 포스트 업로드 성공
  addPostErrorReason: false, // 포스트 업로드 실패 사유
  isAddingComment: false, // 댓글 업로드 중
  addCommentErrorReason: '', // 댓글 업로드 실패 사유
  commentAdded: false, // 댓글 업로드 성공
  hasMorePost: false, // 더보기
  singlePost: null,
};

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case UPLOAD_IMAGES_REQUEST: {
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        console.log('upload_image', action.data);
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
      default: {
        break;
      }
    }
  });
};
