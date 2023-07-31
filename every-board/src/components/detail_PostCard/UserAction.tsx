// import axios from "axios";
// import Comment from "./Comment";
// import Reply from "./Reply";
// import { useEffect, useState } from "react";
// import { AiFillHeart } from "react-icons/ai";
// import { BiCommentDetail } from "react-icons/bi";
// import styled from "styled-components";
// import { usePostLike } from "@/utils/api";

// interface Props {
//   comment?: boolean;
//   reply?: boolean;
//   like?: number | undefined;
//   userId?: number | undefined | null;
//   contentId?: number | undefined;
// }

// const UserAction = (props: Props) => {
//   const { comment, reply, like, userId, contentId } = props;
//   const [isLikeClick, setLike] = useState<boolean>(false);
//   const [isCommentClick, setComment] = useState<boolean>(false);
//   const { data, mutate } = usePostLike(userId, contentId);

//   useEffect(() => {
//     console.log(`data?.userId`, data?.data.userId);
//     console.log(`userId`, userId);
//   }, [data]);

//   return (
//     <UserActionContainer className={comment ? "comment" : ""}>
//       <UserActionWrap>
//         //좋아요
//         <span
//           onClick={() => {
//             mutate();
//             setLike(!isLikeClick);
//           }}
//           className={reply ? "reply" : ""}
//         >
//           {isLikeClick ? (
//             <span style={{ color: "var(--pink)" }}>
//               <AiFillHeart size={18} />
//               <span>좋아요</span>
//               <span>{like}</span>
//             </span>
//           ) : (
//             <span>
//               <AiFillHeart size={18} />
//               <span>좋아요</span>
//               <span>{like}</span>
//             </span>
//           )}
//         </span>
//         //댓글
//         {reply ? null : (
//           <span onClick={() => setComment(!isCommentClick)}>
//             {isCommentClick ? (
//               <span style={{ color: "#3742FF" }}>
//                 <BiCommentDetail size={15} />
//                 <span>댓글</span>
//                 <span>21</span>
//               </span>
//             ) : (
//               <span>
//                 <BiCommentDetail size={15} />
//                 <span>댓글</span>
//                 <span>21</span>
//               </span>
//             )}
//           </span>
//         )}
//       </UserActionWrap>
//       {/* 댓글을 누르고 댓글의 댓글을 눌렀을 경우(대댓글) Reply 컴포넌트
//           Reply 컴포넌트는 한칸 들여쓰기가 더 들어가있습니다!
//           나중에 한개로 통일 할 수 있는 방법 생각하기*/}
//       {isCommentClick ? comment ? <Reply /> : <Comment /> : null}
//     </UserActionContainer>
//   );
// };

// const UserActionContainer = styled.div`
//   width: 320px;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   margin: 0 auto;
//   gap: 20px;
//   font-size: 1rem;
//   font-weight: 500;
//   color: #838a91;
//   line-height: 14px;
//   .comment {
//     margin-left: 50px;
//   }

//   @media (min-width: 768px) {
//     width: 600px;
//     justify-content: flex-start;
//     .reply {
//       margin-left: 50px;
//     }
//   }
//   @media (min-width: 1080px) {
//     width: 900px;
//   }
//   @media (min-width: 1440px) {
//     width: 1100px;
//   }
// `;

// const UserActionWrap = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   gap: 20px;

//   span {
//     display: flex;
//     align-items: center;
//     gap: 3px;
//     cursor: pointer;
//   }
// `;

// export default UserAction;

import axios from "axios";
import Comment from "./Comment";
import Reply from "./Reply";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import styled from "styled-components";
import { usePostLike } from "@/utils/api";

interface IComment {
  comment: string;
  commentId: number;
  contentId: number;
  createdAt: string;
  modifiedAt: string;
  nickName: string;
  title: string;
  userId: number;
}

interface Props {
  comment?: IComment[];
  reply?: boolean;
  like?: number | undefined;
  userId?: number | undefined | null;
  contentId?: number | undefined;
}

const UserAction = (props: Props) => {
  const { comment, reply, like, userId, contentId } = props;
  const [isLikeClick, setLike] = useState<boolean>(false);
  const [isCommentClick, setComment] = useState<boolean>(false);
  const { data, mutate } = usePostLike(userId, contentId);

  useEffect(() => {
    console.log(`data?.userId`, data?.data.userId);
    console.log(`userId`, userId);
  }, [data]);

  return (
    <UserActionContainer className={comment ? "comment" : ""}>
      <UserActionWrap>
        //좋아요
        <span
          onClick={() => {
            mutate();
            setLike(!isLikeClick);
          }}
          className={reply ? "reply" : ""}
        >
          {isLikeClick ? (
            <span style={{ color: "var(--pink)" }}>
              <AiFillHeart size={18} />
              <span>좋아요</span>
              <span>{like}</span>
            </span>
          ) : (
            <span>
              <AiFillHeart size={18} />
              <span>좋아요</span>
              <span>{like}</span>
            </span>
          )}
        </span>
        //댓글
        {reply ? null : (
          <span onClick={() => setComment(!isCommentClick)}>
            {isCommentClick ? (
              <span style={{ color: "#3742FF" }}>
                <BiCommentDetail size={15} />
                <span>댓글</span>
                <span>21</span>
              </span>
            ) : (
              <span>
                <BiCommentDetail size={15} />
                <span>댓글</span>
                <span>21</span>
              </span>
            )}
          </span>
        )}
      </UserActionWrap>
      {/* 댓글을 누르고 댓글의 댓글을 눌렀을 경우(대댓글) Reply 컴포넌트
          Reply 컴포넌트는 한칸 들여쓰기가 더 들어가있습니다!
          나중에 한개로 통일 할 수 있는 방법 생각하기*/}
      {isCommentClick ? comment ? <Reply /> : <Comment /> : null}
    </UserActionContainer>
  );
};

const UserActionContainer = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  gap: 20px;
  font-size: 1rem;
  font-weight: 500;
  color: #838a91;
  line-height: 14px;
  .comment {
    margin-left: 50px;
  }

  @media (min-width: 768px) {
    width: 600px;
    justify-content: flex-start;
    .reply {
      margin-left: 50px;
    }
  }
  @media (min-width: 1080px) {
    width: 900px;
  }
  @media (min-width: 1440px) {
    width: 1100px;
  }
`;

const UserActionWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;

  span {
    display: flex;
    align-items: center;
    gap: 3px;
    cursor: pointer;
  }
`;

export default UserAction;
