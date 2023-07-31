import styled from "styled-components";
import Image from "next/image";
import Avatar from "../Avatar";
import { BiCommentDetail } from "react-icons/bi";
import { useState, useEffect } from "react";
import axios from "axios";

const CommentWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  color: #838a91;

  @media (min-width: 768px) {
    width: 600px;
  }
  @media (min-width: 1080px) {
    width: 900px;
  }
  @media (min-width: 1440px) {
    width: 1100px;
  }
`;

const CommentIcon = styled.div`
  svg {
    font-size: 1.5rem;
  }
`;

const CommentTitle = styled.h4``;

const CommentInputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  height: 40px;
  margin: 0 auto;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 600px;
  }
  @media (min-width: 1080px) {
    width: 900px;
  }
  @media (min-width: 1440px) {
    width: 1100px;
  }
`;

const Input = styled.span`
  width: 245px;
  height: 38px;
  @media (min-width: 768px) {
    width: 520px;
  }
  @media (min-width: 1080px) {
    width: 820px;
  }
  @media (min-width: 1440px) {
    width: 1020px;
  }
  input {
    width: inherit;
    height: inherit;
    background: #ffffff;
    border: 2px solid #e9eff4;
    border-radius: 5.77775px;
    padding: 0 10px;
  }
  input:focus {
    outline: none;
  }
`;

const Submit = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: var(--primary);
  border-radius: 50px;
`;

const GetCommentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 550px;
  }
  @media (min-width: 1080px) {
    width: 850px;
  }
  @media (min-width: 1440px) {
    width: 1050px;
  }
`;

const GetComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 10px 15px;
  border-radius: 18px;
  border: 1.5px solid #e9eff4;
`;

const GetCommentTop = styled.div`
  display: flex;
  gap: 10px;
  flex-dirction: row;
`;

const GetNickname = styled.div`
  font-weight: 700;
  font-size: 1rem;
  color: #000000;
`;

const GetDate = styled.div`
  color: #838a91;
  font-weight: 500;
  font-size: 0.875rem;
`;

const GetCommentBottom = styled.div``;

type IComment = {
  comment: string;
  commentId: number;
  contentId: number;
  createdAt: string;
  modifiedAt: string;
  nickName: string;
  title: string;
  userId: number;
};

type IFetch = {
  comment: string;
  commentId: number;
  contentId: number;
  createdAt: string;
  modifiedAt: string;
  nickName: string;
  title: string;
  userId: number;
};

export default function CommentInput() {
  const [newComment, setNewComment] = useState("");

  //댓글 toggle
  const [toggle, setToggle] = useState(false);

  const handleClickToggle = () => {
    setToggle(!toggle);
  };

  //댓글 출력
  const [showComment, setShowComment] = useState<IComment[]>([]);

  //댓글 서버에서 가져오기
  const [fetch, setFetch] = useState<IFetch>();

  //댓글 등록해서 보이기
  const fetchComment = async () => {
    const ACCESS_TOKEN = sessionStorage.getItem("Authorization");
    const contentId = sessionStorage.getItem("contentId");

    let contentIdNumber = 0;

    //sessionStorage에 저장되어있는 contentId는 string이므로 숫자형으로 변환해야함!
    if (contentId !== null) {
      contentIdNumber = parseInt(contentId);
    }

    try {
      const response = await axios.post(
        "https://every-board.shop/comments",
        {
          contentId: contentIdNumber,
          comment: newComment,
        },
        {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      );

      const commentId = response.data.commentId;
      getComments(commentId);
      setShowComment([...showComment, response.data]);
      console.log(response);
    } catch (err: any) {
      console.log(err);
    }
  };

  // //댓글 서버에서 조회
  const getComments = async (commentId: number | null = null) => {
    try {
      console.log(commentId);
      const ACCESS_TOKEN = sessionStorage.getItem("Authorization");

      const response = await axios.get(
        `https://every-board.shop/comments/${commentId}`,
        {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      );
      setFetch(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (showComment.length === 0) {
  //     getComments();
  //   }
  // }, [showComment.length]);

  const handleClick = async () => {
    await fetchComment();
    setNewComment("");
  };

  return (
    <>
      {fetch?.comment}
      <CommentWrapper onClick={handleClickToggle}>
        <CommentIcon>
          <BiCommentDetail />
        </CommentIcon>

        <CommentTitle>댓글</CommentTitle>
      </CommentWrapper>
      {/* {toggle && (
        <GetCommentsWrap>
          {showComment.map((item, index) => (
            <GetComment key={index}>
              <GetCommentTop>
                <GetNickname>{item.nickName}</GetNickname>
                <GetDate>{item.createdAt}</GetDate>
              </GetCommentTop>
              <GetCommentBottom>{item.comment}</GetCommentBottom>
            </GetComment>
          ))}
        </GetCommentsWrap>
      )} */}
      <CommentInputWrap>
        <Avatar size="verysmall" />
        <Input>
          <input
            placeholder="댓글을 입력해주세요."
            value={newComment}
            onChange={e => {
              setNewComment(e.target.value);
            }}
          />
        </Input>

        <Submit onClick={handleClick}>
          <Image src={"/send.svg"} width={15} height={15} alt="보내기" />
        </Submit>
      </CommentInputWrap>
    </>
  );
}
