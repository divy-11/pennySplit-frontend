import { useState } from "react";
import groupService from "../api/groupsService";

const GroupTripComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");

  const handleAddGroupClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setGroupName("");
  };

  const handleSave = () => {
    groupService
      .createGroup({ name: groupName })
      .then((response) => {
        console.log("Group created successfully:", response);
      })
      .catch((error) => {
        console.error("Error creating group:", error);
      });
    handleClose();
  };

  return (
    <div className="p-4">
      {/* Trigger Button */}
      <button
        onClick={handleAddGroupClick}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        + Create Trip
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000085] bg-opacity-10">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Group Trip</h2>
            </div>

            <input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Save Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupTripComponent;
