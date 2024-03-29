import { useDispatch } from "react-redux";
import {
  changeMemberTeam,
  deleteMember,
  promoteToTeamLead,
  updateMember,
} from "../store/slices/TreeSlice";
const dispatch = useDispatch;
export const handleUpdate = () => {
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

export const handleDelete = () => {
  dispatch(
    deleteMember({
      departmentName: editData.department,
      teamName: editData.team,
      memberName: editData.name,
    })
  );
};

export const changeTeam = () => {
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

export const handlePromotion = () => {
  dispatch(
    promoteToTeamLead({
      departmentName: editData.department,
      teamName: editData.team,
      newTeamLeadName: memberName,
    })
  );

  reverse(false);
};
