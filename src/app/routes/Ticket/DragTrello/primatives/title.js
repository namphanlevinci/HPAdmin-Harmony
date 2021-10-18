import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { grid } from "../constants";

export default styled.h4`
  padding: 16px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  font-weight : 500;
  font-size : 1.1rem;
  position: relative;
  color : ${props => props.color ? props.color : "#333"};
  background-color : ${props => props.colorBackground ? props.colorBackground : "transparent"};
    &:focus {
    outline: 2px solid ${colors.P100};
    outline-offset: 2px;
  }
`;
