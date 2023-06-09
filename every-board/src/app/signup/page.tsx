"use client";

import styled from "styled-components";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Left = styled.div`
  width: 35%;
  min-width: 530px;
  display: flex;
  flex-direction: column;
  padding: 0 5rem;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin-left: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    position: relative;
  }

  &:nth-child(2) {
    position: relative;
  }

  &:nth-child(4) {
    position: relative;
  }

  &:nth-child(5) {
    position: relative;
  }
`;

const Label = styled.label`
  color: #344054;
  font-size: 1rem;
  margin-bottom: 8px;
`;

const Input = styled.input`
  border-radius: 8px;
  padding: 10px 14px;
  border-width: 1px;
  border-style: solid;
  border-color: #d0d5dd;
`;

const PWButton = styled.div`
  svg:nth-child(1) {
    position: absolute;
    top: 38px;
    right: 20px;
  }

  svg:nth-child(2) {
    position: absolute;
    top: 38px;
    right: 20px;
  }
`;

const EmailBtn = styled.button`
  position: absolute;
  top: 35px;
  right: 7px;
  padding: 6px;
  border: none;
  color: white;
  font-size: 8px;
  border-radius: 7px;
  background: #5429ff;

  &:last-child {
  }
`;

const ErrorText = styled.span`
  margin: 5px;
  font-size: 0.8rem;
  color: #fc0374;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  color: #344054;
  cursor: pointer;
  background-color: white;
  border: 1px solid #d0d5dd;
`;

const SubmitWrap = styled.div`
  text-align: center;
`;

const Submit = styled.span`
  color: #344054;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
`;

const Icon = styled.div`
  svg {
    display: flex;
    margin-right: 8px;
    font-size: 1.5rem;
  }
`;

const Right = styled.div`
  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 1080px) {
    width: 980px;
    display: none;
  }
`;

type SigninValues = {
  errors: string;
  email: string;
  emailconfirm: string;
  nickname: string;
  password: string;
  passwordconfirm: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SigninValues>();

  const router = useRouter();

  //비밀번호
  const [ShowPassword, setShowPassword] = useState<boolean>(false);

  //비밀번호체크용
  const [ShowPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);

  //비밀번호
  const togglePassword = () => {
    setShowPassword(!ShowPassword);
  };

  //비밀번호체크용
  const togglePasswordCheck = () => {
    setShowPasswordCheck(!ShowPasswordCheck);
  };

  const password = getValues("password");

  //회원가입 form전송
  const onSubmit = async (data: SigninValues) => {
    try {
      const response = await fetch("https://every-board.shop/user/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      router.push("/signin");
    } catch (err) {
      console.error("회원 가입 과정에서 문제가 발생했습니다:", err);
    }
  };

  //이메일 인증에러
  const [emailError, setEmailError] = useState<string>("");

  //이메일 인증번호 에러
  const [emailConfirmError, setEmailConfirmError] = useState<string>("");

  const [isemailSend, setIsEmailSend] = useState<boolean>(false);

  //이메일 인증번호 받는 함수
  const handleEmailSubmit = async () => {
    const email = getValues("email");

    try {
      const response = await axios.post("https://every-board.shop/auth/email", {
        email,
      });

      if (response.status === 200) {
        setIsEmailSend(true);
        setEmailError(""); //메세지 초기화
      }
    } catch (err) {
      console.log(err);
      setEmailError(
        "이메일주소가 이미 사용되었거나 이메일 형식이 잘못되었습니다.",
      );
    }
  };

  //이메일 인증번호 확인 함수
  const verifyEmailCode = async () => {
    const email = getValues("email");
    const authCode = getValues("emailconfirm");

    try {
      const response = await axios.post(
        "https://every-board.shop/auth/email/confirm",
        {
          email,
          authCode,
        },
      );

      if (response.status === 200) {
        setEmailConfirmError("이메일 인증에 성공했습니다.");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setEmailConfirmError("이메일 인증 번호가 올바르지 않습니다.");
      } else {
        setEmailConfirmError("인증 과정에서 문제가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <Wrapper>
        <Left>
          <TitleWrap>
            <Image
              src={"/logo.svg"}
              width={50}
              height={50}
              alt="logo"
              priority
            />
            <Title>모두의 게시판</Title>
          </TitleWrap>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormWrap>
              <Label>Email</Label>
              <Input
                placeholder="test@example.com"
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: "이메일 형식에 맞지 않습니다.",
                  },
                })}
              />
              <EmailBtn type="button" onClick={handleEmailSubmit}>
                이메일 인증
              </EmailBtn>
              {isemailSend && (
                <ErrorText>
                  해당 이메일로 확인 부탁드립니다.
                  {errors.email && errors.email.message}
                </ErrorText>
              )}
              <ErrorText>
                {errors.email && errors.email.message}
                {emailError}
              </ErrorText>
            </FormWrap>
            <FormWrap>
              <Label>Email 인증번호 확인</Label>
              <Input
                placeholder="ex) 6AAR32f"
                {...register("emailconfirm", {
                  required: "이메일인증 부탁드립니다.",
                })}
              />
              <EmailBtn type="button" onClick={verifyEmailCode}>
                확인
              </EmailBtn>
              <ErrorText>
                {errors.emailconfirm && errors.emailconfirm.message}
                {emailConfirmError}
              </ErrorText>
            </FormWrap>
            <FormWrap>
              <Label>Nick Name</Label>
              <Input
                placeholder="nickname"
                {...register("nickname", {
                  required: "닉네임은 필수사항입니다.",
                  pattern: {
                    value: /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{2,10}$/,
                    message: "한글,영문,숫자 2~10자리형식 입니다.",
                  },
                })}
              />
              <ErrorText>
                {errors.nickname && errors.nickname.message}
              </ErrorText>
            </FormWrap>
            <FormWrap>
              <Label>Password</Label>
              <Input
                type={ShowPassword ? "text" : "password"}
                id="password"
                autoComplete="off"
                placeholder="●●●●●●●●"
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "최소 8자 이상의 비밀번호를 입력해주세요.",
                  },
                })}
              />
              <PWButton onClick={togglePassword}>
                {ShowPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </PWButton>
              <ErrorText>
                {errors.password && errors.password.message}
              </ErrorText>
            </FormWrap>
            <FormWrap>
              <Label>Password Check</Label>
              <Input
                type={ShowPasswordCheck ? "text" : "password"}
                placeholder="비밀번호확인"
                {...register("passwordconfirm", {
                  required: "비밀번호가 일치하지 않습니다.",
                  validate: value =>
                    value === getValues("password") ||
                    "비밀번호가 일치하지 않습니다.",
                })}
                autoComplete="off"
              />
              <PWButton onClick={togglePasswordCheck}>
                {ShowPasswordCheck ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </PWButton>
              <ErrorText>
                {errors.passwordconfirm && errors.passwordconfirm.message}
              </ErrorText>
            </FormWrap>
            <Button
              style={{
                color: "white",
                backgroundColor: "#5429FF",
                border: "none",
                fontWeight: "bold",
              }}
            >
              회원가입
            </Button>
          </Form>
          <Button style={{ margin: "20px 0" }}>
            <Icon>
              <FcGoogle />
            </Icon>
            Sign in with Google
          </Button>
          <SubmitWrap>
            <Submit>이미 계정이 있으신가요?</Submit>
            <Submit
              onClick={() => router.push("/signin")}
              style={{ color: "#fc0374", fontWeight: "bold" }}
            >
              로그인
            </Submit>
          </SubmitWrap>
        </Left>
        <Right>
          <Image src={"/frame.png"} width={400} height={500} alt="frame" />
        </Right>
      </Wrapper>
    </>
  );
}
