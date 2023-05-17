'use client'

import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Left = styled.div`
  width: 35%;
  min-width: 530px;
  display: flex;
  flex-direction: column;
  padding: 5rem;
`

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h1`
  margin-left: 8px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  color: #344054;
  font-size: 1rem;
  margin-bottom: 8px;
`

const Input = styled.input`
  border-radius: 8px;
  padding: 10px 14px;
  border-width: 1px;
  border-style: solid;
  border-color: #d0d5dd;
`

const ErrorText = styled.span`
  margin: 5px;
  font-size: 0.8rem;
  color: #fc0374;
`

const Remember = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
`
const Rem1 = styled.p`
  margin: 0;
  color: #344054;
`
const Rem2 = styled.p`
  margin: 0;
  color: #fc0374;
`

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
`

const SubmitWrap = styled.div`
  text-align: center;
`

const Submit = styled.span`
  color: #344054;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
`

const Icon = styled.div`
  svg {
    display: flex;
    margin-right: 8px;
    font-size: 1.5rem;
  }
`

const Right = styled.div``

type SigninValues = {
  errors: string
  email: string
  emailconfirm: string
  nickname: string
  password: string
  passwordconfirm: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SigninValues>()

  const router = useRouter()

  const password = getValues('password')

  const onSubmit = (data: SigninValues) => {
    console.log(data)
  }

  return (
    <>
      <Wrapper>
        <Left>
          <TitleWrap>
            <Image src={'/logo.svg'} width={50} height={50} alt="logo" />
            <Title>모두의 게시판</Title>
          </TitleWrap>
          <Form>
            <FormWrap onSubmit={handleSubmit(onSubmit)}>
              <Label>Email</Label>
              <Input
                placeholder="test@example.com"
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: '이메일 형식에 맞지 않습니다.',
                  },
                })}
              />
              <ErrorText>{errors.email && errors.email.message}</ErrorText>
            </FormWrap>
            <FormWrap>
              <Label>Email 인증번호 확인</Label>
              <Input
                placeholder="ex) 6AAR32f"
                {...register('emailconfirm', {
                  required: '이메일 인증번호를 입력해주세요.',
                })}
              />
              <ErrorText>
                {errors.emailconfirm && errors.emailconfirm.message}
              </ErrorText>
            </FormWrap>
            <FormWrap>
              <Label>Nick Name</Label>
              <Input
                placeholder="nickname"
                {...register('nickname', {
                  required: '닉네임을 입력해주세요. ',
                  pattern: {
                    value: /^[가-힣a-zA-Z0-9]{2,16}$/,
                    message: '공백을 제외한 영어, 숫자, 한글 2자 ~ 12자입니다.',
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
                type="password"
                placeholder="●●●●●●●●"
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: {
                    value: 8,
                    message: '최소 8자 이상의 비밀번호를 입력해주세요.',
                  },
                })}
              />
              <ErrorText>
                {errors.password && errors.password.message}
              </ErrorText>
            </FormWrap>
            <FormWrap>
              <Label>Password Check</Label>
              <Input
                type="password"
                placeholder="비밀번호확인"
                {...register('passwordconfirm', {
                  required: '비밀번호가 일치하지 않습니다.',
                  validate: (value) =>
                    value === password || '비밀번호가 일치하지 않습니다.',
                })}
              />
              <ErrorText>
                {errors.passwordconfirm && errors.passwordconfirm.message}
              </ErrorText>
            </FormWrap>
            <Button
              style={{
                color: 'white',
                backgroundColor: '#5429FF',
                border: 'none',
                fontWeight: 'bold',
              }}
              onClick={handleSubmit(onSubmit)}
            >
              회원가입
            </Button>
            <Button>
              <Icon>
                <FcGoogle />
              </Icon>
              Sign in with Google
            </Button>
            <SubmitWrap>
              <Submit>이미 계정이 있으신가요?</Submit>
              <Submit
                onClick={() => router.push('/')}
                style={{ color: '#fc0374', fontWeight: 'bold' }}
              >
                로그인
              </Submit>
            </SubmitWrap>
          </Form>
        </Left>
        <Right>
          <Image src={'/frame.png'} width={450} height={600} alt="frame" />
        </Right>
      </Wrapper>
    </>
  )
}
