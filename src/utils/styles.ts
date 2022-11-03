import styled from "styled-components";
import { MOBILE_VIEWPORT } from "@/utils/constants/mobile";
import { TabBar } from "antd-mobile";

export const CenterContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e5e5e5;
  overflow: hidden;
`;

export const MobileContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: ${MOBILE_VIEWPORT};
  background-color: #f8f8f8;
  position: relative;
`;

export const NavContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white;
  padding: 0.5rem 0.25rem 0;
`;

export const PageTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const ContentContainer = styled.div`
  padding: 2rem;
  height: 100vh;
`;

export const Header = styled.div`
  font-size: 1rem;
  padding-bottom: 1rem;
  font-weight: 600;
  color: #777;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTabBar = styled(TabBar)`
  && {
    .adm-tab-bar-item-active {
      color: rgb(75 85 99);
      font-weight: 900;
    }
  }
`;

export const StyledButton = styled.button<{ $isDisabled?: boolean }>`
  all: unset;
  text-align: center;
  border-radius: 10px;
  height: 40px;
  width: 100%;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background-color: ${({ $isDisabled }) => ($isDisabled ? "#ccc" : "#555")};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
`;
