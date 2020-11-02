import React, { useState, useRef, useEffect } from "react";

function DragAndDrop({ data }) {
  const [list, setlist] = useState(data);
  const [dragging, setdragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  const dragStart = (e, item) => {
    console.log("dragstartingS", item);
    dragItem.current = item;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", dragEnd);
    setdragging(true);
  };

  const dragEnd = () => {
    console.log("ending");
    setdragging(false);
    dragNode.current.removeEventListener("dragend", dragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };
  const getStyles = (params) => {
    const currentItem = dragItem.current;

    if (
      currentItem.grpI === params.grpI &&
      currentItem.itemI === params.itemI
    ) {
      return "current dnd-item";
    }

    return "dnd-item";
  };

  return (
    <div className="drag-n-drop">
      {list.map((grp, grpI) => (
        <div key={grp.title} className="dnd-group">
          <div className="group-title">{grp.title}</div>
          {grp.items.map((item, itemI) => (
            <div
              draggable
              key={item}
              onDragStart={(e) => dragStart(e, { grpI, itemI })}
              className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DragAndDrop;
