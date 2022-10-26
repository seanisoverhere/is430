import styled from "styled-components";
import { Card } from "antd-mobile";

export const StyledCard = styled(Card)`
  && {
    &.adm-card:hover {
      box-shadow: 0 0 0 0.1rem #f0f0f0;
      scale: 102%;
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
