import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // Importing Redux actions for member management
  updateMember,
  deleteMember,
  changeMemberTeam,
  promoteToTeamLead,
} from "../store/slices/TreeSlice";

// Modal component for editing member information
function Modal({ reverse, editData }) {
  const dispatch = useDispatch();

  // Retrieving treeData from Redux store
  const treeData = useSelector((state) => state?.TreeData?.treeData);

  // State variables for form inputs
  const [memberName, setMemberName] = useState(editData.name || "");
  const [selectedTeam, setSelectedTeam] = useState(editData.team || "");
  const [email, setEmail] = useState(editData.email || "");
  const [phone, setPhone] = useState(editData.phone || "");

  // Function to handle updating member information
  const handleUpdate = () => {
    if (memberName.trim() !== "") {
      dispatch(
        updateMember({
          departmentName: editData.department,
          teamName: selectedTeam,
          oldMemberName: editData.name,
          newMemberName: memberName,
          email: email,
          phone: phone,
        })
      );
      reverse(false);
    } else {
      console.error("New member name cannot be empty.");
    }
  };

  // Function to handle deleting a member
  const handleDelete = () => {
    dispatch(
      deleteMember({
        departmentName: editData.department,
        teamName: editData.team,
        memberName: editData.name,
      })
    );
  };

  // Function to handle changing a member's team
  const changeTeam = () => {
    if (editData.department && editData.team && selectedTeam && memberName) {
      dispatch(
        changeMemberTeam({
          departmentName: editData.department,
          oldTeamName: editData.team,
          newTeamName: selectedTeam,
          memberName: memberName,
        })
      );
      reverse(false);
    } else {
      console.error("One or more values are missing. Cannot change team.");
    }
  };

  // Function to handle promoting a member to team lead
  const handlePromotion = () => {
    dispatch(
      promoteToTeamLead({
        departmentName: editData.department,
        teamName: editData.team,
        newTeamLeadName: memberName,
      })
    );

    reverse(false);
  };

  // JSX for the Modal component
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md relative">
        {/* Close button */}
        <button
          onClick={() => reverse(false)}
          className="absolute top-2 right-2 text-red-500"
        >
          ❌
        </button>
        {/* Modal Title */}
        <h2 className="text-lg font-semibold mb-4">Modal Title</h2>
        {/* Email input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-indigo-500"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        {/* Phone Number input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-indigo-500"
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        {/* Member Name input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="memberName"
          >
            Member name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-indigo-500"
            type="text"
            id="memberName"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            placeholder="Enter member name"
          />
        </div>
        {/* Change Team select input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="team"
          >
            Change Team
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-indigo-500"
            id="team"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="null">Select</option>
            {/* Mapping teams for selection */}
            {treeData[0]?.children &&
              treeData[0].children
                .find((dept) => dept.text === editData.department)
                ?.children.filter((team) => team.text !== editData.team)
                .map((team) => (
                  <option key={team.text} value={team.text}>
                    {team.text || "No team available"}
                  </option>
                ))}
          </select>
        </div>
        {/* Buttons for actions */}
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Delete
          </button>
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Update
          </button>
          <button
            onClick={changeTeam}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Change Team
          </button>
          <button
            onClick={handlePromotion}
            className="bg-purple-500 text-white px-4 py-2 rounded-md"
          >
            Promote
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
