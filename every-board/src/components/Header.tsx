import styled from "styled-components";
import Image from "next/image";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const router = useRouter();
  return (
    <Top>
      <Left>
        <Image
          src={"/logo.svg"}
          width={45}
          height={45}
          alt="logo"
          onClick={() => {
            router.push("/");
          }}
          style={{ cursor: "pointer" }}
        />
        <Title>{title}</Title>
      </Left>
      <Avatar />
    </Top>
  );
};

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding-top: 2.5rem;
  width: 350px;

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

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 1.75rem;

  @media (min-width: 1080px) {
    font-size: 2.25rem;
  }
`;

export default Header;
