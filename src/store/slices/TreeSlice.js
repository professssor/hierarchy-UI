import { createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid"; //

const initialState = {
  treeData: [],
};

export const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    // Action to set the initial tree data
    setTreeData: (state, action) => {
      state.treeData = action.payload;
    },

    // Action to add a new member to a team
    addMemberToTeam: (state, action) => {
      const { departmentName, teamName, newMember } = action.payload;

      // Find the department
      const department = state.treeData[0].children.find(
        (node) => node.text === departmentName
      );

      // Check if department exists
      if (department) {
        // Find the team within the department
        const team = department.children.find((node) => node.text === teamName);
        // Check if team exists
        if (team) {
          if (!team.children) {
            team["children"] = []; // Create children array if it doesn't exist
          }
          // Check if the member is already present in the team
          const isMemberAlreadyPresent = team.children.some(
            (member) => member.id === newMember.id
          );

          if (!isMemberAlreadyPresent) {
            //add children to team if the node doesnt have it

            // Add the new member to the team
            team.children.push(newMember);
          } else {
            console.log(
              `Member ${newMember.text} is already present in the team.`
            );
          }
        }
      }
    },

    // Action to delete a member from a team
    deleteMember: (state, action) => {
      const { departmentName, teamName, memberName } = action.payload;

      // Find the department index
      const departmentIndex = state.treeData[0].children.findIndex(
        (node) => node.text === departmentName
      );

      if (departmentIndex !== -1) {
        // Find the team index within the department
        const teamIndex = state.treeData[0].children[
          departmentIndex
        ].children.findIndex((node) => node.text === teamName);

        if (teamIndex !== -1) {
          // Use filter to remove the member from the team
          state.treeData[0].children[departmentIndex].children[
            teamIndex
          ].children = state.treeData[0].children[departmentIndex].children[
            teamIndex
          ].children.filter((member) => member.name !== memberName);
        } else {
          console.log(`Team ${teamName} not found in the department.`);
        }
      } else {
        console.log(`Department ${departmentName} not found.`);
      }
    },

    // Action to update details of a member in a team
    updateMember: (state, action) => {
      const {
        departmentName,
        teamName,
        oldMemberName,
        newMemberName,
        email,
        phone,
      } = action.payload;

      // Find the department
      const department = state.treeData[0].children.find(
        (node) => node.text === departmentName
      );

      if (department) {
        // Find the team within the department
        const team = department.children.find((node) => node.text === teamName);
        if (team) {
          // Find the member within the team
          const member = team.children.find(
            (member) => member.name === oldMemberName
          );
          if (member) {
            // Update member's details
            member.name = newMemberName;

            if (!member.email && email) {
              member.email = email;
            }

            if (!member.phone && phone) {
              member.phone = phone;
            }
          } else {
            console.log(`Member ${oldMemberName} not found in the team.`);
          }
        } else {
          console.log(`Team ${teamName} not found in the department.`);
        }
      } else {
        console.log(`Department ${departmentName} not found.`);
      }
    },

    // Action to move a member from one team to another within the same department
    changeMemberTeam: (state, action) => {
      const { departmentName, oldTeamName, newTeamName, memberName } =
        action.payload;

      // Find the department
      const department = state.treeData[0].children.find(
        (node) => node.text === departmentName
      );

      if (department) {
        // Find the old team within the department
        const oldTeam = department.children.find(
          (node) => node.text === oldTeamName
        );
        // Find the new team within the department
        const newTeam = department.children.find(
          (node) => node.text === newTeamName
        );

        if (!newTeam.children) {
          newTeam.children = []; // Create children array if it doesn't exist
        }

        if (oldTeam && newTeam) {
          // Find the member within the old team
          const memberIndex = oldTeam.children.findIndex(
            (member) => member.name === memberName
          );

          if (memberIndex !== -1) {
            // Remove the member from the old team and add it to the new team
            const movedMember = oldTeam.children.splice(memberIndex, 1)[0];
            newTeam.children.push(movedMember);
          } else {
            console.log(`Member ${memberName} not found in ${oldTeamName}.`);
          }
        } else {
          console.log(
            `One of the teams (${oldTeamName} or ${newTeamName}) not found in ${departmentName}.`
          );
        }
      } else {
        console.log(`Department ${departmentName} not found.`);
      }
    },

    // Action to promote a member to team lead within the same team
    promoteToTeamLead: (state, action) => {
      const { departmentName, teamName, newTeamLeadName } = action.payload;

      // Find the department
      const department = state.treeData[0].children.find(
        (node) => node.text === departmentName
      );

      if (department) {
        // Find the team within the department
        const team = department.children.find((node) => node.text === teamName);
        if (team) {
          // Find the current team lead within the team
          const currentTeamLead = team.children.find(
            (member) => member.type === "Lead"
          );
          // Revert the previous team lead to a regular member
          if (currentTeamLead) {
            currentTeamLead.type = "member";
            currentTeamLead.text = `${teamName} member`;
          }

          // Find the new team lead within the team
          const newTeamLead = team.children.find(
            (member) => member.name === newTeamLeadName
          );

          if (team.children.length > 1 && newTeamLead) {
            // Remove the new team lead from the team
            team.children = team.children.filter(
              (member) => member.name !== newTeamLeadName
            );
            // Promote the selected member to team lead
            newTeamLead.type = "Lead";
            newTeamLead.text = `${teamName} Lead`;
            team.children.unshift(newTeamLead);
          } else {
            console.log(`Member ${newTeamLeadName} not found in ${teamName}.`);
          }
        } else {
          console.log(`Team ${teamName} not found in the department.`);
        }
      } else {
        console.log(`Department ${departmentName} not found.`);
      }
    },

    // Action to add a new team within a department
    addNewTeam: (state, action) => {
      const { departmentName, newTeam } = action.payload;

      // Find the department
      const department = state.treeData[0].children.find(
        (node) => node.text === departmentName
      );

      if (department) {
        // Check if the team name already exists in the department
        const isTeamNameExist = department.children.some(
          (node) => node.text === newTeam.name
        );

        if (!isTeamNameExist) {
          // Assign a unique ID to the new team
          newTeam.id = uuidv4();
          // Add the new team to the department
          department.children.push(newTeam);
        } else {
          console.log(`Team ${newTeam.name} already exists.`);
        }
      } else {
        console.log(`Department ${departmentName} not found.`);
      }
    },
  },
});

export const {
  setTreeData,
  addMemberToTeam,
  deleteMember,
  updateMember,
  changeMemberTeam,
  promoteToTeamLead,
  addNewTeam,
} = treeSlice.actions;

export default treeSlice.reducer;
