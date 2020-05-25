import React, { useState, useMemo } from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import clonedeep from 'lodash.clonedeep'
import arrayMove from "array-move";
import ColumnFilter from "./ColumnFilter";

function getDndColumns(plainCols: any[]) {
  //转换columns使得每个column都是Droppable和Draggable
  const cols = clonedeep(plainCols)
  cols.forEach((ele: any) => {
    const { title, dataIndex } = ele;
    ele.title = (
      <Droppable droppableId={dataIndex}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Draggable draggableId={dataIndex} index={0}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {title}
                </div>
              )}
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
  const originalCols = useMemo(() => clonedeep(columns), [
    columns,
  ]);

  const [columnsToShow, setColumnsToShow] = useState(() =>
    getDndColumns(columns)
  );

  const handleDragEnd = (result: DropResult) => {
    if (!result?.destination) return;

    const { droppableId: srcDroppableId } = result.source;
    const {
      droppableId: destDroppableId,
      index: destIndex,
    } = result.destination;
    if (srcDroppableId === destDroppableId) return;

    // console.log({ srcDroppableId, destDroppableId });
    // 插入操作
    let cols: any[] = [];
    let srcColIndex = NaN;
    let destColIndex = NaN;
    columnsToShow.forEach((ele: any, index) => {
      if (ele.key === srcDroppableId) {
        srcColIndex = index;
      } else if (ele.key === destDroppableId) {
        destColIndex = index;
      }
    });
    if (destIndex > 0) {
      //插入到dest后面
      // console.log(`insert ${srcColIndex} after ${destColIndex}`);
      cols = arrayMove(columnsToShow, srcColIndex, destColIndex + 1);
    } else {
      //插入到dest前面
      // console.log(`insert ${srcColIndex} before ${destColIndex}`);
      cols = arrayMove(columnsToShow, srcColIndex, destColIndex);
    }
    setColumnsToShow(cols);
  };

  const handleCheck = (cols: any[]) => {
    const plainCols = originalCols.filter((item: any) =>
      cols.some((ele) => item.dataIndex === ele.dataIndex)
    );
    const dndCols = getDndColumns(plainCols);
    setColumnsToShow(dndCols);
    console.log({originalCols})
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
