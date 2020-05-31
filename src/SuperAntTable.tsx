import React, { useState, useMemo } from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import clonedeep from "lodash.clonedeep";
import arrayMove from "array-move";
import ColumnFilter from "./ColumnFilter";

function getDndColumns(
  plainCols: any[],
  backgroundColor: string = "lightgreen",
  border: string = "0px"
) {
  //转换columns使得每个column都是Droppable和Draggable
  const cols = clonedeep(plainCols);
  cols.forEach((ele: any) => {
    const { title, dataIndex } = ele;
    ele.title = (
      <Droppable droppableId={dataIndex} direction="horizontal">
        {(dropProvided) => (
          <div
            {...dropProvided.droppableProps}
            ref={dropProvided.innerRef}
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <Draggable draggableId={dataIndex} index={0}>
              {(dragProvided, dragSnapshot) => {
                return (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    style={{
                      ...dragProvided.draggableProps.style,
                      padding: "5px 15px",
                      // margin: "0 5px",
                      backgroundColor: dragSnapshot.isDragging
                        ? backgroundColor
                        : "inherit",
                      border: dragSnapshot.isDragging ? border : "0px",
                      width: "auto",
                      // flex: 1,
                      zIndex: 9,
                    }}
                  >
                    {title}
                  </div>
                );
              }}
            </Draggable>
          </div>
        )}
      </Droppable>
    );
  });
  return cols;
}

interface Props extends TableProps<any> {
  dragggingStyle?: {
    border: string;
    backgroundColor: string;
  };
}

const SuperAntTable: React.FC<Props> = ({
  columns = [],
  dragggingStyle,
  ...restProps
}) => {
  const originalCols = useMemo(() => clonedeep(columns), [columns]);

  const [columnsToShow, setColumnsToShow] = useState(() =>
    getDndColumns(
      columns,
      dragggingStyle?.backgroundColor,
      dragggingStyle?.border
    )
  );

  const handleDragEnd = (result: DropResult) => {
    if (!result?.destination) return;

    const { droppableId: srcDroppableId } = result.source;
    const { droppableId: destDroppableId } = result.destination;
    if (srcDroppableId === destDroppableId) return;

    // console.log({ srcDroppableId, destDroppableId });
    // 插入操作
    let srcColIndex = NaN;
    let destColIndex = NaN;
    columnsToShow.forEach((ele: any, index) => {
      if (ele.key === srcDroppableId) {
        srcColIndex = index;
      } else if (ele.key === destDroppableId) {
        destColIndex = index;
      }
    });

    // console.log({ srcColIndex, destColIndex });

    const cols = arrayMove(columnsToShow, srcColIndex, destColIndex);
    setColumnsToShow(cols);
  };

  const handleCheck = (cols: any[]) => {
    const plainCols = originalCols.filter((item: any) =>
      cols.some((ele) => item.dataIndex === ele.dataIndex)
    );
    const dndCols = getDndColumns(
      plainCols,
      dragggingStyle?.backgroundColor,
      dragggingStyle?.border
    );
    setColumnsToShow(dndCols);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Table
        columns={columnsToShow}
        {...restProps}
        title={() => (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ColumnFilter columns={originalCols} onCheck={handleCheck} />
          </div>
        )}
      />
    </DragDropContext>
  );
};

export default SuperAntTable;
