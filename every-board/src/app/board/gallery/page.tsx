"use client";

import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Wrapper = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(2, minmax(200px, auto));
  grid-auto-rows: minmax(300px, auto);

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(200px, auto));
  }

  @media (min-width: 1080px) {
    grid-template-columns: repeat(4, minmax(200px, auto));
  }
`;

const Wrap = styled.div`
  border: 2px solid red;
`;

const IImg = styled.div`
  height: 160px;
  background: #dbdbdb;
`;

const BottomWrap = styled.div``;

const Title = styled.span``;

const Category = styled.span``;

const Time = styled.span`
  display: flex;
  padding: 0.7rem;
  justify-content: flex-end;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type IContent = {
  category: string;
  content: string;
  contentHeartCount: number;
  contentId: number;
  //contentImages: any[]; // contentImages의 구조에 따라서 타입을 세부적으로 정의해주세요.
  contentImages: Array<{
    contentId: number;
    contentImageId: number;
    contentImgUrl: string;
  }>;
  createdAt: string;
  modifiedAt: string;
  title: string;
  userId: number;
  viewCount: number;
};

export default function page() {
  const [contents, setContents] = useState<IContent[]>([]);

  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://every-board.shop/contents?size=100", {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(function (res) {
        setContents(res.data.contentResponseDto);
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      {contents &&
        contents.map((content, index) => (
          <Wrap key={index}>
            <img
              src={`https://every-board.shop/?size=100/${content.contentImages[0].contentImgUrl}`}
              alt={content.title}
            />
            <BottomWrap>
              <Time>{content.createdAt.toString().slice(0, 10)}</Time>
              <Bottom>
                <Title>{content.title}</Title>
                <Category>{content.category}</Category>
              </Bottom>
            </BottomWrap>
          </Wrap>
        ))}
    </Wrapper>
  );
}
