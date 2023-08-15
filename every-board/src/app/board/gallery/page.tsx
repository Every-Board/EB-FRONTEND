"use client";

import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  gap: 40px;
  padding-bottom: 2.5rem;
`;

const PhotoWrap = styled.div`
  display: grid;
  grid-gap: 20px;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  gap: 20px;
  img {
    border-radius: 10px;
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 501px) and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 769px) and (max-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1081px) and (max-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

type ImgData = {
  contentImageId: number;
  contentId: number;
  contentImgUrl: string;
};

type photoData = {
  contentId: number;
  userId: number;
  viewCount: number;
  contentHeartCount: number;
  title: string;
  content: string;
  contentImages: ImgData[];
  category: string;
  createdAt: string;
  modifiedAt: string;
};

const Gallery = () => {
  const router = useRouter();
  const [photodata, setPhotoData] = useState<photoData[]>([]);

  const sortedPhotoData = photodata
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  useEffect(() => {
    axios
      .get("https://every-board.shop/contents?size=100")
      .then(function (res) {
        setPhotoData(res.data.contentResponseDto);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <Section>
      <PhotoWrap>
        {sortedPhotoData.map((el, index) => (
          <div
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push(`board/detail?contentId=${el.contentId}`);
            }}
          >
            <Image
              key={el.contentImages[0]?.contentImageId}
              src={`https://backendcontentimage.s3.ap-northeast-2.amazonaws.com/${el.contentImages[0]?.contentImgUrl}`}
              width={300}
              height={300}
              alt="이미지"
            />
          </div>
        ))}
      </PhotoWrap>
    </Section>
  );
};
export default Gallery;
