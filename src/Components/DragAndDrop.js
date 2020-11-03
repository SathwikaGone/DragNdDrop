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
    setTimeout(() => {
      setdragging(true);
    }, 0);
  };

  const dragEnter = (e, params) => {
    console.log("drag enter", params);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      console.log("diff");
      setlist((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
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
        <div
          key={grp.title}
          className="dnd-group"
          onDragEnter={
            dragging && !grp.items.length
              ? (e) => dragEnter(e, { grpI, itemI: 0 })
              : null
          }
        >
          <div className="group-title">{grp.title}</div>
          {grp.items.map((item, itemI) => (
            <div
              draggable
              key={item}
              onDragStart={(e) => dragStart(e, { grpI, itemI })}
              onDragEnter={
                dragging ? (e) => dragEnter(e, { grpI, itemI }) : null
              }
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
