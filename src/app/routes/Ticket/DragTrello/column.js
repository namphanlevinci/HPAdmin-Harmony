import React, { Component } from "react";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { grid, borderRadius } from "./constants";
import { Draggable } from "react-beautiful-dnd";
import QuoteList from "./primatives/quote-list";
import Title from "./primatives/title";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
    isDragging ? colors.G50 : "#E2E3E4"};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${colors.G50};
  }
`;

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

function getTitleColor(title) {
  let color = "#333", colorBackground = "transparent";

  switch (title) {
    case "backlog":
      color = "white";
      colorBackground = "#CCCCCC";
      break;
    case "waiting":
      color = "white";
      colorBackground = "#1366AE";
      break;

    case "inprogress":
      color = "white";
      colorBackground = "#4AD2FD";
      break;

    case "complete":
      color = "white";
      colorBackground = "#50AE55";
      break;

    default:
      break;
  }

  return {
    color,
    colorBackground,
  }
}

export default class Column extends Component {
  render() {
    const title = this.props.title;
    const quotes = this.props.quotes;
    const index = this.props.index;
    const { getTicketDetail } = this.props;

    return (
      <Draggable draggableId={title} index={index}>
        {(provided, snapshot) => {
          return (
            <Container ref={provided.innerRef} {...provided.draggableProps}>
              <Header isDragging={snapshot.isDragging}>
                <Title
                  isDragging={snapshot.isDragging}
                  {...provided.dragHandleProps}
                  color={getTitleColor(title).color}
                  colorBackground={getTitleColor(title).colorBackground}
                >
                  {capitalize(title)}
                </Title>
              </Header>
              <QuoteList
                listId={title}
                listType="QUOTE"
                style={{
                  backgroundColor: snapshot.isDragging ? colors.G50 : null
                }}
                quotes={quotes}
                internalScroll={this.props.isScrollable}
                isCombineEnabled={Boolean(this.props.isCombineEnabled)}
                getTicketDetail={getTicketDetail}
              />
            </Container>
          )
        }
        }
      </Draggable>
    );
  }
}
