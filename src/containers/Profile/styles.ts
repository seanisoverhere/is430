import styled from "styled-components";
import { Row } from "antd";
import { StyledButton } from "@/utils/styles";

export const StyledRow = styled(Row)`
  && {
    width: 100%;
    overflow: scroll;
    max-height: 500px;
    position: relative;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`;

export const CompanyName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;

export const CompanyUen = styled.div`
  font-size: 0.9rem;
  color: #999;
`;

export const InstructionText = styled.div`
  margin: 1rem 0 2rem;
  font-size: 0.9rem;
`;

export const FormContainer = styled.div`
  margin: 1rem 0;
`;

export const BottomStyledButton = styled(StyledButton)`
  position: absolute;
  bottom: -12%;
`;

export const Container = styled.div`
  position: relative;
`;
