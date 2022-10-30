import styled from "styled-components";
import { Card } from "antd-mobile";

export const StyledCard = styled(Card)`
  && {
    &.adm-card:hover {
      box-shadow: 0 0 0 0.1rem #f0f0f0;
      scale: 101%;
      transition: all 0.3s ease-in-out;
    }

    .adm-card-header {
      font-weight: 500;
      font-size: 1.1rem;
    }

    .adm-card-header-title {
      font-weight: 500;
    }
  }
`;

export const PaymentText = styled.span`
  color: #666;
`;

export const BoldText = styled.span`
  /* font-weight: 600; */
`;

export const InstallmentText = styled.div`
  font-size: 0.7rem;
  color: #666;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CompanyLogo = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export const MakePayment = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-weight: 600;
`;
