import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addNewTeam } from "../store/slices/TreeSlice";
import { generateRandomName } from "../helper/GenerateRandomNames";

function MemberForm({ treeData, onSubmit }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    dept: "",
    team: "",
    newTeamName: "",
    memberName: "",
  });
  const [isAddingMember, setIsAddingMember] = useState(true);

  const handleAddTeam = () => {
    if (formData.dept && formData.newTeamName && generateRandomName()) {
      dispatch(
        addNewTeam({
          departmentName: formData.dept,
          newTeam: {
            text: formData.newTeamName,
            name: generateRandomName(),
            type: "team",
          },
        })
      );
      setFormData({
        ...formData,
        newTeamName: "",
      });
    } else {
      console.error("Missing required fields for adding a new team.");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { dept, team, memberName } = formData;
    if (dept && team && memberName) {
      onSubmit(e, formData, {
        id: uuidv4(),
        name: memberName,
        type: "member",
        text: `${team} member`,
      });
      setFormData({
        ...formData,
        dept: "",
        team: "",
        memberName: "",
      });
    } else {
      console.error("Missing required fields for adding a member.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">
        Add {isAddingMember ? "Member" : "Team"}
      </h2>
      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded-md focus:outline-none ${
            isAddingMember
              ? "bg-indigo-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => setIsAddingMember(true)}
        >
          Member
        </button>
        <button
          className={`px-4 py-2 rounded-md focus:outline-none ${
            !isAddingMember
              ? "bg-indigo-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => setIsAddingMember(false)}
        >
          Team
        </button>
      </div>
      {/* Render department select always */}
      <div className="mb-4">
        <label htmlFor="department" className="block text-sm font-semibold">
          Department
        </label>
        <select
          id="department"
          className="w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:border-indigo-500"
          value={formData.dept}
          onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
        >
          <option value="">Select Department</option>
          {treeData[0].children.map((node) => (
            <option key={node.id} value={node.text}>
              {node.text}
            </option>
          ))}
        </select>
      </div>
      {/* Render member or team form based on toggle */}
      {isAddingMember ? (
        <form onSubmit={handleFormSubmit}>
          {/* Member Form */}
          {formData.dept && (
            <div className="mb-4">
              <label htmlFor="team" className="block text-sm font-semibold">
                Team
              </label>
              <select
                id="team"
                className="w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:border-indigo-500"
                value={formData.team}
                onChange={(e) =>
                  setFormData({ ...formData, team: e.target.value })
                }
              >
                <option value="">Select Team</option>
                {treeData[0]?.children
                  .find((dept) => dept.text === formData.dept)
                  ?.children.map((team) => (
                    <option key={team.id} value={team.text}>
                      {team.text}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="member" className="block text-sm font-semibold">
              Member Name
            </label>
            <input
              id="member"
              className="w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:border-indigo-500"
              type="text"
              value={formData.memberName}
              onChange={(e) =>
                setFormData({ ...formData, memberName: e.target.value })
              }
              placeholder="Enter member name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-indigo-600"
            disabled={!(formData.dept && formData.team && formData.memberName)}
          >
            Add Member
          </button>
        </form>
      ) : (
        <div className="mt-4">
          {/* Team Form */}
          <label htmlFor="newTeam" className="block text-sm font-semibold">
            Add New Team
          </label>
          <div className="flex">
            <input
              id="newTeam"
              type="text"
              className="w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:border-indigo-500"
              value={formData.newTeamName}
              onChange={(e) =>
                setFormData({ ...formData, newTeamName: e.target.value })
              }
              placeholder="Enter new team name"
            />
            <button
              onClick={handleAddTeam}
              className="ml-2 bg-indigo-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-indigo-600"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberForm;
