import produce from 'immer';

export const initialState = {
  followPosts: [], // 팔로우한 유저 포스트들
  compassPosts: [], // 화면에 보일 포스트들
  imagePaths: [], // 미리보기 이미지 경로
  addPostErrorReason: false, // 포스트 업로드 실패 사유
  isAddingPost: false, // 포스트 업로드 중
  postAdded: false, // 포스트 업로드 성공
  addCommentErrorReason: '', // 댓글 업로드 실패 사유
  isAddingComment: false, // 댓글 업로드 중
  commentAdded: false, // 댓글 업로드 성공
  hasMorePost: false, // 더보기
  singlePost: null,
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      default: {
        break;
      }
    }
  });
};
