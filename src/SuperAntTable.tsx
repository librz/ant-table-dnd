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
import arrayMove from "array-move"; //源代码非常简单, 不可变性的实现是浅拷贝, 但如果能保证不修改数组中的元素的话
import ColumnFilter from "./ColumnFilter";

function getDndColumns(plainCols: any[]) {
  //转换columns使得每个column都是Droppable和Draggable
  const cols = clonedeep(plainCols);
  cols.forEach((ele: any) => {
    const { title, dataIndex } = ele;
    ele.title = (
      <Droppable droppableId={dataIndex} direction="horizontal">
        {(dropProvided, dropSnapshot) => (
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
                      padding: "5px 10px",
                      margin: "0 5px",
                      backgroundColor: dragSnapshot.isDragging
                        ? "lightgreen"
                        : "inherit",
                      border: dragSnapshot.isDragging
                        ? "2px dotted cyan"
                        : "0px",
                      ...dragProvided.draggableProps.style,
                      // opacity,
                      flex: 1,
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

const SuperAntTable: React.FC<TableProps<any>> = ({
  columns = [],
  ...restProps
}) => {
  const originalCols = useMemo(() => clonedeep(columns), [columns]);

  const [columnsToShow, setColumnsToShow] = useState(() =>
    getDndColumns(columns)
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
    const dndCols = getDndColumns(plainCols);
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
