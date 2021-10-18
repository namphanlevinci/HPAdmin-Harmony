import React, { Component } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";
import { colors } from "@atlaskit/theme";
import Column from "./column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { authorQuoteMap } from "./data";

const ParentContainer = styled.div`
  /* height: ${({ height }) => height}; */
  /* overflow-x: hidden;
  overflow-y: auto; */
`;

const Container = styled.div`
  background-color: white;
  /* min-height: 100vh; */
  /* like display:flex but will allow bleeding over the window width */
  /* min-width: 100vw; */
  display: inline-flex;
`;

export default class Board extends Component {
  /* eslint-disable react/sort-comp */
  static defaultProps = {
    isCombineEnabled: false
  };

  state = {
    columns: authorQuoteMap,
    ordered: Object.keys(authorQuoteMap)
  };

  boardRef;

  onDragEnd = result => {
    this.props.updateItem(result);
    // if (result.combine) {
    //   if (result.type === "COLUMN") {
    //     const shallow = [...this.state.ordered];
    //     shallow.splice(result.source.index, 1);
    //     this.setState({ ordered: shallow });
    //     return;
    //   }

    //   const column = this.state.columns[result.source.droppableId];
    //   const withQuoteRemoved = [...column];
    //   withQuoteRemoved.splice(result.source.index, 1);
    //   const columns = {
    //     ...this.state.columns,
    //     [result.source.droppableId]: withQuoteRemoved
    //   };
    //   this.setState({ columns });
    //   return;
    // }

    // // dropped nowhere
    // if (!result.destination) {
    //   return;
    // }

    // const source = result.source;
    // const destination = result.destination;

    // // did not move anywhere - can bail early
    // if (
    //   source.droppableId === destination.droppableId &&
    //   source.index === destination.index
    // ) {
    //   return;
    // }

    // // reordering column
    // if (result.type === "COLUMN") {
    //   const ordered = reorder(
    //     this.state.ordered,
    //     source.index,
    //     destination.index
    //   );

    //   this.setState({
    //     ordered
    //   });

    //   return;
    // }

    // const data = reorderQuoteMap({
    //   quoteMap: this.state.columns,
    //   source,
    //   destination
    // });

    // this.setState({
    //   columns: data.quoteMap
    // });
  };

  render() {
    const ordered = this.props.ordered || [];

    const { containerHeight, data = [], getTicketDetail } = this.props;

    const columns = {
      "backlog": data.filter(obj => obj.status === "backlog").map(obj => ({
        ...obj, colors: {
          soft: "#f0eded",
          hard: "#CCCCCC",
        }
      })),
      "inprogress": data.filter(obj => obj.status === "inprogress").map(obj => ({
        ...obj, colors: {
          soft: "#c2f1ff",
          hard: "#52D3FB"
        }
      })),
      "waiting": data.filter(obj => obj.status === "waiting").map(obj => ({
        ...obj, colors: {
          soft: "#d1e9ff",
          hard: "#1B68AC"
        }
      })),
      "complete": data.filter(obj => obj.status === "complete").map(obj => ({
        ...obj, colors: {
          soft: colors.G50,
          hard: colors.G200
        }
      }))
    }

    const board = (
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={Boolean(containerHeight)}
        isCombineEnabled={this.props.isCombineEnabled}
      >
        {provided => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {ordered.map((key, index) => (
              <Column
                key={key}
                index={index}
                title={key}
                quotes={columns[key]}
                isScrollable={true}
                isCombineEnabled={this.props.isCombineEnabled}
                getTicketDetail={getTicketDetail}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );

    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {containerHeight ? (
            <ParentContainer height={containerHeight}>{board}</ParentContainer>
          ) : (
            board
          )}
        </DragDropContext>
        <Global
          styles={css`
            body {
              background: white;
            }
          `}
        />
      </React.Fragment>
    );
  }
}

