import styled from "styled-components";
import { Card } from "antd";

export const StyledCard = styled(Card)`
  && {
    border-radius: 20px;

    .ant-card-body {
      padding: 20px;
    }
  }
`;

export const IconBox = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  text-align: center;
  background: ${({ $color }) => $color};
  color: #fff;
  border-radius: 0.5rem;
`;

export const Icon = styled.div`
  height: 100%;
  font-size: 1.5rem;
`;
