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

export const StyledCard = styled(Card)`
  && {
    font-weight: 600;
    border-radius: 15px;

    &.ant-card:hover {
      box-shadow: 0 0 0 0.1rem #f0f0f0;
      scale: 101%;
      transition: all 0.3s ease-in-out;
    }

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
  color: #999;
`;
