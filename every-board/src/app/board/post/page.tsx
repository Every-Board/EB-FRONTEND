"use client";

import styled from "styled-components";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Category from "@/components/Category";
import TextArea from "@/components/post/TextArea";
import axios from "axios";

const Wrapper = styled.div`
  width: 350px;
  margin: 0 auto;
  border-radius: 18px;
  background-color: white;
  @media (min-width: 768px) {
    width: 680px;
  }
  @media (min-width: 1080px) {
    width: 980px;
  }
  @media (min-width: 1440px) {
    width: 1200px;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  padding: 0 15px;
  gap: 25px;
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;

  div {
    width: 320px;
    height: auto;
    min-height: 45px;
    background: #ffffff;
    border: 1px solid #e9eff4;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 768px) {
      width: 650px;
    }
    @media (min-width: 1080px) {
      width: 950px;
    }
    @media (min-width: 1440px) {
      width: 1170px;
    }
    input {
      min-height: 45px;
      width: inherit;
      margin-left: 10px;
      font-weight: 700;
      @media (min-width: 1080px) {
        font-size: 1rem;
      }

      ::placeholder {
        @media (min-width: 1080px) {
          font-size: 1rem;
        }
      }
    }
  }

  Input {
    border: none;
    outline: none;
  }
`;

const CategoryWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -25px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;

  @media (min-width: 1080px) {
    font-size: 1.125rem;
  }
`;

const Catagory = styled.button<{ $isActive: Boolean }>`
  cursor: pointer;
  max-width: 150px;
  margin: 0 5px;
  width: 200px;
  height: 28.65px;
  font-size: 0.775rem;
  font-weight: bold;
  border-radius: 4px;
  background: transparent;
  border: 2px solid #5429ff;

  color: ${props => (props.$isActive ? "#ffff" : "#5429ff")};
  background: ${props => (props.$isActive ? "#5429ff" : "transparent")};
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ImageLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageName = styled.p``;

const ImageThumbnail = styled.img`
  width: 5rem;
  height: 5rem;
  padding: 10px;
`;

const ImageDeleteBtn = styled.button`
  width: 100px;
  font-size: 1rem;
  color: #fc0374;
  font-weight: bold;
  border: transparent;
  background: transparent;
  text-decoration: underline;
`;

const FileInput = styled.input``;

const FileButton = styled.button`
  width: 100%;
  padding: 20px 0;
  color: #5429ff;
  border-radius: 8px;
  background: transparent;
  border: 1px solid #e9eff4;
`;

const InputBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 100px;
  &:first-child {
    margin-right: 20px;
  }
`;

const InputBtn = styled.button<{ $isSelected?: Boolean }>`
  max-width: 150px;
  font-weight: bold;
  padding: 0.3rem 2rem;
  border-radius: 4px;
  background: transparent;
  border: 2px solid #5429ff;
  color: ${props => (props.$isSelected ? "#ffff" : "#5429ff")};
  background: ${props => (props.$isSelected ? "#5429ff" : "transparent")};

  &:first-child {
    margin-right: 20px;
  }
`;

interface FormType {
  category?: string;
  title?: string;
  content?: string;
}

const page = () => {
  const router = useRouter();
  //전체의 input관리
  const [form, setForm] = useState<FormType>({
    category: "",
    title: "",
    content: "",
  });

  //비구조할당을 통해 값 추출
  const { category, title, content } = form;

  //카테고리modal 클릭 유무를 저장할 state
  const [showModal, setShowModal] = useState<boolean>(false);

  //category버튼
  const [isActive, setIsActive] = useState(false);

  //이미지 파일을 여러개 올리기위한 state
  const [images, setImages] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  //취소하기&작성하기 버튼
  const [inputBtn, setInputBtn] = useState<string>("");

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    //이미지파일 중 첫번째 파일 가져옴
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    setImages([...images, ...newImages]);
  };

  const handleInputButton = (buttonName: string) => {
    setInputBtn(buttonName);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form, // 기존 form객체 복사
      [name]: value,
    });
  };

  const saveBoard = async () => {
    const ACCESS_TOKEN = sessionStorage.getItem("Authorization");
    const USER_ID = sessionStorage.getItem("userId");

    if (!form.category || !form.title || !form.content) {
      alert("모든 필드를 작성해주세요.");
      return;
    }
    const formData = new FormData();

    let userIdNumber = 0;

    // sessionStorage에 저장되어있는 USER_ID는 string이므로 숫자형으로 변환해야함!
    if (USER_ID !== null) {
      userIdNumber = parseInt(USER_ID);
    }

    const data = {
      userId: userIdNumber || "",
      category: form.category || "",
      title: form.title || "",
      content: form.content || "",
    };

    //formData.append("data", JSON.stringify(data));
    //이렇게 처리해야 500error가 생기지 않음!!!!
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      }),
    );

    images.forEach(image => formData.append("ContentImgUrl", image));

    try {
      const response = await axios.post(
        "https://every-board.shop/contents",
        formData,
        {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      );
      if (response.status === 201) {
        //contentId는 이와같이 가져와야함
        const contentId = response.data.data.contentId;

        //contentId sessionStorage에 저장 => 댓글에 필요
        if (contentId) sessionStorage.setItem("contentId", contentId);

        router.push(`/board/detail?contentId=${contentId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const backBoard = () => {
    router.push("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputBtn === "작성") {
      saveBoard();
    } else {
      backBoard();
    }

    setForm({ ...form, title: "" });
    console.log(form);
  };

  const onDeleteHandler = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const onAddHandler = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //카테고리 modal의 on/off
  const toggleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(!showModal);
    setIsActive(!isActive);
  };

  const categoryInput = useRef<HTMLInputElement>(null);

  //category 상태 끌어올리기
  const bringToCategoryState = (el: string) => {
    setForm(form => ({ ...form, category: el }));
    setShowModal(false);
  };

  //content 상태 끌어올리기
  const bringToContentState = (el: string) => {
    setForm(form => ({ ...form, content: el }));
  };

  return (
    <>
      <Wrapper>
        <FormWrapper onSubmit={handleSubmit}>
          <FormWrap>
            <Label>카테코리</Label>
            <div>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                ref={categoryInput}
                placeholder="카테고리를 선택하세요."
                readOnly
              />
              <Catagory $isActive onClick={toggleModal}>
                카테고리
              </Catagory>
            </div>
          </FormWrap>
          <CategoryWrap className="category">
            {showModal && <Category route="post" fn={bringToCategoryState} />}
          </CategoryWrap>
          <FormWrap>
            <Label>제목</Label>
            <div>
              <input
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="제목을 입력하세요."
              />
            </div>
          </FormWrap>
          <Label>내용</Label>
          <TextArea fn={bringToContentState} />
          <FormWrap>
            <Label>파일 추가</Label>
            {images.length > 0
              ? images.map((image, index) => (
                  <div key={index} style={{ border: "none" }}>
                    <ImageWrapper>
                      <ImageWrap>
                        <ImageThumbnail
                          src={URL.createObjectURL(image)}
                          alt={image.name}
                        ></ImageThumbnail>
                        <ImageName>{image.name}</ImageName>
                      </ImageWrap>
                      <ImageDeleteBtn onClick={() => onDeleteHandler(index)}>
                        삭제
                      </ImageDeleteBtn>
                    </ImageWrapper>
                  </div>
                ))
              : null}
            {/* type을 설정하지 않으면 작성하기 버튼과 같이 작동하여 추 추가 버튼만 눌러도 form이 서버에 보내짐 */}
            <FileButton type="button" onClick={onAddHandler}>
              이미지 추가하기
            </FileButton>
            <FileInput
              name="file"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={onFileInputChange}
              style={{ display: "none" }}
            />
          </FormWrap>
          <InputBtnWrap>
            <InputBtn
              type="submit"
              $isSelected={inputBtn === "취소"}
              onClick={() => handleInputButton("취소")}
            >
              취소하기
            </InputBtn>
            <InputBtn
              type="submit"
              $isSelected={inputBtn === "작성"}
              onClick={() => handleInputButton("작성")}
            >
              작성하기
            </InputBtn>
          </InputBtnWrap>
        </FormWrapper>
      </Wrapper>
    </>
  );
};

export default page;
