//게시글 단건조회 타입
export interface ContentDetail {
  category: string;
  comments: IComment[];
  content: string;
  contentHeartCount: number;
  contentId: number;
  contentImages: ContentImage[];
  createdAt: string;
  modifiedAt: string;
  tag: string;
  title: string;
  userId: number | null | undefined;
  viewCount: number;
}

export interface ContentImage {
  contentImageId: number;
  contentId: number;
  contentImgUrl: string;
}

//회원 단건 조회 타입
export interface UserInfo {
  userId: number;
  email: string;
  nickname: string;
  password: string;
  profileUrl: null;
  loginType: string;
  createdAt: string;
}

//카테고리
export interface CategoryType {
  category: string;
  contents: ContentDetail[];
}

//핫 토픽 타입
export interface HotTopic {
  contentId: string;
  title: string;
}

//게시글 검색
export interface contentResponseDto {
  contentResponseDto: SearchKeyword[];
}

export interface SearchKeyword {
  contentId: number;
  comments: IComment[];
  userId: number | null | undefined;
  viewCount: number;
  contentHeartCount: number;
  title: string;
  content: string;
  contentImages: ContentImage[];
  category: string;
  tag: string;
  createdAt: string;
  modifiedAt: string;
}

//이미지 받아오기
export interface Image {
  contentId: number;
  contentImages: ContentImage[];
}

//Like
export interface PostLike {
  contentHeartId: number;
  contentId: number;
  userId: number;
  heartType: string;
}

//Comment
export interface IComment {
  comment: string;
  commentId: number;
  contentId: number;
  createdAt: string;
  modifiedAt: string;
  nickName: string;
  title: string;
  userId: number;
}
