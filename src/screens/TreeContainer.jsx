import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setTreeData, addMemberToTeam } from "../store/slices/TreeSlice";

import { initialTreeData } from "../data/Data";
import MemberForm from "../components/MemberForm";

import { filterEmployees } from "../helper/filterEmployees";
import TreeNode from "./TreeNode";

function TreeContainer() {
  const dispatch = useDispatch();
  const treeData = useSelector((state) => state?.TreeData?.treeData);

  const [filteredData, setFilteredData] = useState([]);
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);
  const [zoomedIn, setZoomedIn] = useState(true); // Start with zoomed in

  //to get an array of filtered data to get filered results
  const handleFilter = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredData([]);
    } else {
      const filteredEmployees = filterEmployees(treeData, searchTerm);
      setFilteredData(filteredEmployees);
    }
  };
  // to add a new member to a team
  const handleSubmit = (e, node, member) => {
    e.preventDefault();
    dispatch(
      addMemberToTeam({
        departmentName: node.dept,
        teamName: node.team,
        newMember: member,
      })
    );
  };

  //if persisted tree data exist , uses that , if not then uses initial tree data from "data.js"
  useEffect(() => {
    if (treeData.length > 0) {
      dispatch(setTreeData(treeData));
    } else {
      dispatch(setTreeData(initialTreeData));
    }
  }, [dispatch]);

  return (
    <div className="bg-green-100 w-max p-4 flex flex-col items-center justify-center">
      {/* Input Field */}
      <div className="border-[1px] border-black p-2 rounded-2xl">
        <div className="flex items-center mb-4 ">
          <input
            type="text"
            placeholder="name email phone"
            onChange={(e) => handleFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <div
            className="cursor-pointer"
            onClick={() => setIsMemberFormOpen(!isMemberFormOpen)}
          >
            ➕ADD
          </div>
        </div>

        {/* Member/Team adding form  */}
        {isMemberFormOpen && (
          <MemberForm treeData={treeData} onSubmit={handleSubmit} />
        )}
      </div>

      {/* zooms out if the tree overflows  */}
      <div
        onClick={() => {
          setZoomedIn(!zoomedIn);
          const zoomLevel = zoomedIn ? "60%" : "90%";
          document.body.style.zoom = zoomLevel;
        }}
        className="mt-4 cursor-pointer text-blue-500"
      >
        {zoomedIn ? "Zoom out" : "Zoom in"}
      </div>

      {/* Tree Nodes */}
      {treeData.map((node, i) => (
        <div key={node.id} className="flex justify-center mt-4">
          <TreeNode
            node={node}
            type={node.type}
            parent={node.text}
            grandparent={parent}
            filteredData={filteredData}
          />
        </div>
      ))}
    </div>
  );
}

export default TreeContainer;
