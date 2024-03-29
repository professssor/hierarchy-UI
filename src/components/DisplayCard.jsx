import React from "react";
import happyImg from "../../public/happy.png";

const DefaultCard = ({ designation, type, name }) => {
  function spitColor(type) {
    if (type === "CEO") {
      return "#F4A09C";
    } else if (type === "Department") {
      return "#B0E57C";
    } else if (type === "team") {
      return "#FFD8B1";
    } else if (type === "member") {
      return "#9AC9FF";
    } else if (type === "Lead") {
      return "#b39ddb";
    }
  }

  return (
    <div className="rounded-lg border-gray-200 shadow-md overflow-hidden flex flex-col bg-blue-100 bg-opacity-50 h-fit w-52 ">
      {type !== "team" && (
        <div className="flex items-center mb-1 w-full h-full">
          <div className="mr-2 p-2">
            {/* fix the image src to dynamic later */}
            {type !== "team" && (
              <img
                src={happyImg}
                alt="random"
                className="h-8 w-8 rounded-full"
              />
            )}
          </div>
          <div className="text-left">
            {type !== "team" && (
              <p className="font-medium capitalize text-sm">{name}</p>
            )}

            <p className="text-gray-600 capitalize text-xs"> {designation}</p>
          </div>
        </div>
      )}

      <div
        className="flex justify-center items-center rounded-b-lg text-white font-medium text-sm p-1"
        style={{ backgroundColor: spitColor(type) }}
      >
        {designation}
      </div>
    </div>
  );
};

export default DefaultCard;
