import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const DraggableTable: React.FC<TableProps<any>> = ({
  columns = [],
  ...restProps
}) => {
  const [columnsToShow, setColumnsToShow] = useState(() => {
    //转换columns使得每个column都是Droppable和Draggable
    const cols = JSON.parse(JSON.stringify(columns)) as Array<any>;
    cols.forEach((ele, index) => {
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
  });

  useEffect(() => {
    console.log("place holder");
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result?.destination) return;

    const { droppableId: srcDroppableId } = result.source;
    const { droppableId: destDroppableId } = result.destination;
    if (srcDroppableId === destDroppableId) return;

    // 交换列顺序
    const cols = [...columnsToShow];
    let srcIndex = NaN;
    let destIndex = NaN;
    let srcCol = null;
    let destCol = null;
    cols.forEach((ele, index) => {
        if (ele.dataIndex === srcDroppableId) {
            srcIndex = index
            srcCol = {...ele}
        }
        else if (ele.dataIndex === destDroppableId) {
            destIndex = index
            destCol = {...ele}
        }
    })
    cols.splice(destIndex, 1, srcCol);
    cols.splice(srcIndex, 1, destCol);
    setColumnsToShow(cols);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Table columns={columnsToShow} {...restProps} />
    </DragDropContext>
  );
};

export default DraggableTable;
