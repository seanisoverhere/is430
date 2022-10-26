import styled from "styled-components";
import { MOBILE_VIEWPORT } from "@/utils/constants/mobile";

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
  padding: 0.25rem 0;
`;
