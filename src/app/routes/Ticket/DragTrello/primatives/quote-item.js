import React from "react";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { borderRadius, grid } from "../constants";
import { isEmpty } from "lodash";
import moment from "moment";

const getBackgroundColor = (isDragging, isGroupedOver, authorColors) => {
  if (isDragging) {
    return authorColors?.soft;
  }

  if (isGroupedOver) {
    return colors.N30;
  }

  return colors.N0;
};

const getBorderColor = (isDragging, authorColors) =>
  isDragging ? authorColors?.hard : "transparent";

const Container = styled.a`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${props => getBorderColor(props.isDragging, props.colors)};
  background-color: ${props =>
    getBackgroundColor(props.isDragging, props.isGroupedOver, props.colors)};
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px ${colors.N70}` : "none"};
  padding: ${grid}px;
  min-height: 40px;
  margin-bottom: ${grid}px;
  user-select: none;
  transform: ${props => props.isDragging ? "initial" : "none !important"};

  /* anchor overrides */
  color: ${colors.N900};

  &:hover,
  &:active {
    color: ${colors.N900};
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${props => props?.colors?.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Title = styled.div`
  font-size : 1rem;
  font-weight : 600;
  word-break: break-all;
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
  padding :8px;
`;

const BlockQuote = styled.div`
  word-break: break-all;
  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;

const Author = styled.small`
  flex-grow: 0;
  margin: 0;
  border-radius: ${borderRadius}px;
  font-weight: normal;
  padding: ${grid / 2}px;
  font-size : 0.85rem;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
  font-size : 0.85rem;
`;

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
export default class QuoteItem extends React.PureComponent {
  render() {
    const { quote, isDragging, isGroupedOver, provided, getTicketDetail } = this.props;

    return (
      <Container
        href={quote?.author?.url}
        isDragging={isDragging}
        isGroupedOver={isGroupedOver}
        colors={quote?.colors}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onClick={()=>getTicketDetail(quote?.id)}
      >
        {/* <Avatar src={quote.author.avatarUrl} alt={quote.author.name} /> */}
        <Content>
          <Title>{quote?.title}</Title>
          <BlockQuote>{quote?.description}</BlockQuote>
          <Footer>
            <Author colors={quote?.colors}>Requested by : <strong>{quote?.requestedUserName}</strong></Author>
            <QuoteId>id: {quote?.id}</QuoteId>
          </Footer>
        </Content>
      </Container>
    );
  }
}
