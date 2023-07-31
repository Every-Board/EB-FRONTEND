import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState, useRef, useEffect } from "react";
import { useAvatar } from "../../context/AvatarContext";
import axios from "axios";

const Wrapper = styled.div`
  gap: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  height: 550px;
  width: 450px;
  top: 50%;
  left: 50%;
  border-radius: 18px;
  background: white;
  border: 5px solid #cacacb;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const ProfilWrapper = styled.div`
  gap: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CloseIcon = styled.button`
  top: 8px;
  right: 8px;
  border: none;
  position: absolute;
  background-color: transparent;

  svg {
    color: #63637f;
    font-size: 2rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const UploadWrapper = styled.div`
  padding: 12px;
  color: #63637f;
  border-radius: 7px;
  background-color: white;
  border: 2px solid #cacacb;
`;

const UploadImage = styled.label`
  cursor: pointer;
  font-size: 16px;
`;

const Input = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;

const DeleteImage = styled.button`
  padding: 12px;
  cursor: pointer;
  font-size: 16px;
  color: #63637f;
  border-radius: 7px;
  background-color: white;
  border: 2px solid #cacacb;
`;

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function ProfileModal({ onClose, children }: Props) {
  const [image, setImage] = useState<string | null>(null);
  const { setAvatarImage } = useAvatar();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      //파일 사이즈 제한 (2MB)
      const maxFileSize = 2 * 1024 * 1024;
      if (file.size > maxFileSize) {
        alert(
          "파일 크기가 2MB를 초과하였습니다. 더 작은 사이즈의 이미지를 선택해주세요.",
        );
        return;
      }

      const reader = new FileReader();

      reader.onload = async e => {
        const result = e.target?.result as string;

        setImage(result);
        setAvatarImage(result);
        sessionStorage.setItem("AvatarImage", result);
        await uploadImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const userId = sessionStorage.getItem("userId");
  const Access_Token = sessionStorage.getItem("Authorization");

  const uploadImage = async () => {
    if (
      inputFileRef.current &&
      inputFileRef.current.files &&
      inputFileRef.current.files[0]
    ) {
      const formData = new FormData();

      const USER_ID = sessionStorage.getItem("userId");

      const data = {
        userId: USER_ID,
      };

      //type을 지정하지 않을 경우 500error발생
      formData.append(
        "data",
        new Blob([JSON.stringify(data)], {
          type: "application/json",
        }),
      );

      formData.append(
        "ProfileUrl",
        inputFileRef.current.files[0],
        inputFileRef.current.files[0].name,
      );

      try {
        await axios.post(
          `https://every-board.shop/user/${userId}/profile`,
          formData,
          {
            headers: {
              Authorization: Access_Token,
            },
          },
        );
      } catch (err: any) {
        console.log(err);
        alert("Error: " + err.message);
      }
    }
  };

  const DeleteImageFile = () => {
    setImage(null);
    setAvatarImage(null);
    sessionStorage.removeItem("AvatarImage");
  };

  useEffect(() => {
    const storedImage = sessionStorage.getItem("AvatarImage");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  return (
    <Wrapper>
      {children}
      <CloseIcon onClick={() => onClose()}>
        <AiOutlineCloseCircle />
      </CloseIcon>
      <ProfilWrapper>
        <Avatar size="large" image={image} />
        <InputWrapper>
          <UploadWrapper>
            {/* <UploadImage htmlFor="upload" onClick={handleClick}>
              사진 올리기
            </UploadImage> */}
            <UploadImage htmlFor="upload">사진 올리기</UploadImage>
            <Input
              type="file"
              id="upload"
              ref={inputFileRef}
              onChange={handleFileChange}
            />
          </UploadWrapper>
          <DeleteImage onClick={DeleteImageFile}>사진 삭제하기</DeleteImage>
        </InputWrapper>
      </ProfilWrapper>
    </Wrapper>
  );
}
