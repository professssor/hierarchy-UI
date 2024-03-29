import { useState } from "react";

import DefaultCard from "../components/DisplayCard";
import Modal from "../components/Modal";

function TreeNode({
  node,
  type,
  parent,
  grandparent,
  filteredData,
  highlight,
}) {
  //checks the rendering of modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //local state to manage the update the data
  const [editData, setEditData] = useState({
    name: "",
    team: "",
    email: "",
    phone: "",
  });
  //this set the edit data which is sent over to  modal component rendered below
  function handleEdit(name, team, department) {
    setEditData({
      name,
      team,
      department,
      email: editData.email,
      phone: editData.phone,
    });
    setIsModalOpen(true);
  }

  return (
    <div
      className={`flex flex-col items-center p-1 ${
        highlight ? "bg-yellow-200" : ""
      }`}
    >
      {isModalOpen && (
        <Modal reverse={setIsModalOpen} editData={editData} tree />
      )}

      <div className=" ">
        <DefaultCard designation={node.text} type={type} name={node.name} />
        {/* if node is lead or member we want to render the data t=>b rather than l=>r */}
        {(node.type === "Lead" || node.type === "member") && (
          <div className="flex space-x-6">
            <button onClick={() => handleEdit(node.name, parent, grandparent)}>
              Edit
            </button>
          </div>
        )}
      </div>
      {node.children && node.children.length > 0 && (
        <div
          className={`${type === "team" ? " flex-col" : ""} flex w-full  p-2`}
        >
          {node.children.map((child) => (
            <div key={child.id}>
              {/* tree node is called recursively , until the employee tree is connstructed ,  */}
              <TreeNode
                highlight={filteredData.some((data) => data.id === child.id)} // Check if the child should be highlighted based on filtered data
                parent={node.text} //tells about  one layer above
                grandparent={parent} //tells about 2 layer above
                node={child}
                type={child.type}
                filteredData={filteredData} //filtered data being passed to each node to serve reference for comparison
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default TreeNode;
