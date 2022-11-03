import styled from "styled-components";
import { Space, Card, Avatar } from "antd";

export const CardContainer = styled.div`
  margin: 1rem 0;
`;

export const StyledSpace = styled(Space)`
  && {
    width: 100%;
  }
`;

export const ScrollableCard = styled.div`
  overflow: scroll;
  max-height: 650px;
`;

export const StyledCard = styled(Card)`
  && {
    border-radius: 15px;

    .ant-card-header {
      font-weight: 500;
      font-size: 1.1rem;
    }

    .ant-card-header-title {
      font-weight: 500;
    }
  }
`;

export const UenText = styled.span`
  font-size: 0.9rem;
  color: #999;
  font-weight: 400;
`;

export const StyledAvatar = styled(Avatar)`
  && {
    line-height: 40px !important;
    margin-right: 1rem;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ItemName = styled.div`
  font-weight: 600;
`;

export const ItemDetails = styled.div`
  color: #000;
`;

export const Item = styled.div`
  margin: 0.5rem 0;
`;
