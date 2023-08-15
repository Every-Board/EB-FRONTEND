import styled from "styled-components";
import ButtonLayout from "@/components/ButtonLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const TitleWrap = styled.div`
  color: #5429ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  height: 30px;

  @media (min-width: 768px) {
    width: 715px;
  }
  @media (min-width: 1080px) {
    width: 1000px;
  }
  @media (min-width: 1440px) {
    width: 1330px;
  }
`;

const PhotoWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  width: 330px;
  overflow-x: hidden;

  img {
    border-radius: 10px;
    background-color: #eee;
    width: 330px;
    height: 250px;
  }
  @media (min-width: 768px) {
    width: 715px;
    gap: 10px;
    img {
      width: 171.25px;
      height: 150px;
    }
  }
  @media (min-width: 1080px) {
    width: 1000px;
    img {
      width: 242.5px;
      height: 180px;
    }
  }
  @media (min-width: 1440px) {
    width: 1330px;
    gap: 20px;
    img {
      width: 317.5px;
      height: 220px;
    }
  }
`;
const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
  h5 {
    font-size: 1rem;
    font-weight: 400;
  }
  span {
    color: gray;
    display: flex;
    align-items: center;
    gap: 3px;
    cursor: pointer;
  }
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

const PhotoLine = () => {
  const router = useRouter();

  const [photodata, setPhotoData] = useState<photoData[]>([]);

  // 최신순으로 생성된 데이터 4개를 가져오기
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
      <TitleWrap>
        <h4>🚀 갤러리</h4>
        <ButtonLayout
          width="58px"
          height="28px"
          radius="25px"
          background="var(--primary)"
          color=" #ffffff"
          text="더보기"
          border="none"
          onClick={() => router.push("/board/gallery")}
        ></ButtonLayout>
      </TitleWrap>
      <PhotoWrap>
        {/* 최신순으로 생성된 데이터 4개를 가져오기 */}
        {sortedPhotoData.slice(0, 4).map((el, index) => (
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
              width={500}
              height={500}
              alt="이미지"
            />
            <TextWrap>{el.title}</TextWrap>
          </div>
        ))}
      </PhotoWrap>
    </Section>
  );
};

export default PhotoLine;
