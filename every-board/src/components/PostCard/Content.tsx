import { styled } from "styled-components";
import ButtonLayout from "../ButtonLayout";

const Content = () => {
  return (
    <ContentWrap>
      <ButtonLayout
        text="자유게시판"
        width="fit-content"
        height="fit-content"
        padding="5px 10px"
        color="#ffffff"
        background="var(--primary)"
        border="none"
        radius="35px"
      />
      <div>
        <h4>Lorem ipsum dolor sit amet </h4>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, Lorem ipsum dolor sit amet, consectetur adipisicing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam,
        </span>
      </div>
    </ContentWrap>
  );
};

const ContentWrap = styled.div`
  width: 320px;
  height: fit-content;
  padding: 20px 10px;
  margin: 0 auto;
  gap: 10px;

  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 2px solid #e9eff4;
  border-radius: 5.77775px;
  div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media (min-width: 768px) {
    width: 600px;
    div {
      gap: 30px;
    }
  }
  @media (min-width: 1080px) {
    width: 900px;
  }

  @media (min-width: 1440px) {
    width: 1100px;
  }
`;

export default Content;