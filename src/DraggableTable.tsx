import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import arrayMove from "array-move";

const DraggableTable: React.FC<TableProps<any>> = ({
  columns = [],
  ...restProps
}) => {
  const [columnsToShow, setColumnsToShow] = useState(() => {
    //转换columns使得每个column都是Droppable和Draggable
    const cols = [...columns];
    cols.forEach((ele) => {
      const { title, key } = ele;
      const resultKey = key === undefined ? "" : key.toString();
      ele.title = (
        <Droppable droppableId={resultKey}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Draggable draggableId={resultKey} index={0}>
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
  });

  useEffect(() => {
    console.log("place holder");
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result?.destination) return;

    const { droppableId: srcDroppableId } = result.source;
    const {
      droppableId: destDroppableId,
      index: destIndex,
    } = result.destination;
    if (srcDroppableId === destDroppableId) return;

    console.log({ srcDroppableId, destDroppableId });
    // 插入操作
    let cols: any[] = [];
    let srcColIndex = NaN;
    let destColIndex = NaN;
    columnsToShow.forEach((ele, index) => {
      if (ele.key === srcDroppableId) {
        srcColIndex = index;
      } else if (ele.key === destDroppableId) {
        destColIndex = index;
      }
    });
    if (destIndex > 0) {
      //插入到dest后面
      console.log(`insert ${srcColIndex} after ${destColIndex}`);
      // cols = insertAt(columnsToShow, destColIndex + 1, columnsToShow[srcColIndex]);
      cols = arrayMove(columnsToShow, srcColIndex, destColIndex + 1);
    } else {
      //插入到dest前面
      console.log(`insert ${srcColIndex} before ${destColIndex}`);
      // cols = insertAt(columnsToShow, destColIndex, columnsToShow[srcColIndex])
      cols = arrayMove(columnsToShow, srcColIndex, destColIndex);
    }
    console.log({ cols });
    setColumnsToShow(cols);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Table columns={columnsToShow} {...restProps} />
    </DragDropContext>
  );
};

export default DraggableTable;
