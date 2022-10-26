import styled from "styled-components";
import { MOBILE_VIEWPORT } from "@/utils/constants/mobile";
import { TabBar } from "antd-mobile";

export const CenterContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e5e5e5;
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
  overflow-y: scroll;
  height: 100vh;
`;

export const StyledTabBar = styled(TabBar)`
  && {
    .adm-tab-bar-item-active {
      color: rgb(75 85 99);
      font-weight: 900;
    }
  }
`;
