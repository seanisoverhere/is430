import styled from "styled-components";
import { MOBILE_VIEWPORT } from "@/utils/constants/mobile";

export const CenterContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MobileContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: ${MOBILE_VIEWPORT};
  background-color: #f8f8f8;
`;
