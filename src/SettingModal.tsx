import React, { useState } from "react";
import { Modal } from "antd";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import "./SettingModal.scss";

interface SettingModalProps {
  columnsToShow: any[];
  columnsToHide: any[];
  onCancel: Function;
  onOK: (columnsToDisplay: any[]) => void;
}

const gap = 8;
enum Position {
  Left = "left",
  Right = "right",
}

const SettingModal: React.FC<SettingModalProps> = ({
  columnsToShow,
  columnsToHide,
  onCancel,
  onOK,
}) => {
  const [leftColumns, setLeftColumns] = useState(columnsToShow);
  const [rightColumns, setRightColumns] = useState(columnsToHide);

  const handleDragEnd = (result: DropResult) => {
    if (!result?.destination) return;

    const { index: srcIndex, droppableId: srcDroppableId } = result.source;
    const {
      index: destIndex,
      droppableId: destDroppableId,
    } = result.destination;

    if (srcDroppableId === destDroppableId) {
      //vertical drag
      const resultCols =
        srcDroppableId === Position.Left ? [...leftColumns] : [...rightColumns];
      const [removedCol] = resultCols.splice(srcIndex, 1);
      resultCols.splice(destIndex, 0, removedCol);
      if (srcDroppableId === Position.Left) {
        setLeftColumns(resultCols);
      } else {
        setRightColumns(resultCols);
      }
    } else {
      //horizontal drag
      if (srcDroppableId === Position.Left) {
        //from left to right
        const resultLeftCols = [...leftColumns];
        const [removedCol] = resultLeftCols.splice(srcIndex, 1);
        setLeftColumns(resultLeftCols);
        const resultRightCols = [...rightColumns];
        resultRightCols.splice(destIndex, 0, removedCol);
        setRightColumns(resultRightCols);
      } else {
        //from right to left
        const resultRightCols = [...rightColumns];
        const [removedCol] = resultRightCols.splice(srcIndex, 1);
        setRightColumns(resultRightCols);
        const resultLeftCols = [...leftColumns];
        resultLeftCols.splice(destIndex, 0, removedCol);
        setLeftColumns(resultLeftCols);
      }
    }
  };

  return (
    <Modal
      visible
      width={700}
      onCancel={() => {
        onCancel();
      }}
      onOk={() => {
        onOK(leftColumns);
      }}
    >
      <div className="modal-content">
        <div className="drag-and-drop">
          <DragDropContext onDragEnd={handleDragEnd}>
            {[
              {
                position: Position.Left,
                cols: leftColumns,
              },
              {
                position: Position.Right,
                cols: rightColumns,
              },
            ].map(({ position, cols }) => (
              <div key={position} className={position}>
                <h3>{position === Position.Left ? "显示" : "隐藏"}列</h3>
                <Droppable droppableId={position}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "royalblue"
                          : "lightblue",
                        minHeight: 100,
                        maxHeight: 400,
                        overflowY: "auto",
                      }}
                    >
                      {cols.map((col, index) => (
                        <Draggable
                          key={col.key}
                          draggableId={col.key}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                padding: gap,
                                margin: gap,
                                backgroundColor: snapshot.isDragging
                                  ? "lightgreen"
                                  : "#fff",
                                fontSize: "1rem",
                              }}
                            >
                              {col.title}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </DragDropContext>
        </div>
      </div>
    </Modal>
  );
};

export default SettingModal;
