import { useEffect, useState } from "react";
import groupsService from "../api/groupsService";
import { useGroupStore } from "../store/useAppStore";

const GroupManagementComponent = () => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const setGroup = useGroupStore((state) => state.setGroup);
  const groupList = useGroupStore((state) => state.groups);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [newMemberId, setNewMemberId] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroupId) {
      fetchGroupMembers(selectedGroupId);
    }
  }, [selectedGroupId]);

  const fetchGroups = async () => {
    try {
      const res = await groupsService.getGroups();
      setGroups(res.data.groups);
      setGroup(res.data.groups);
    } catch (err) {
      console.error("Failed to load groups:", err);
    }
  };

  const handleCreateGroup = async () => {
    try {
      await groupsService.createGroup({ name: newGroupName });
      setNewGroupName("");
      fetchGroups(); // Refresh group list
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const handleViewGroup = (groupId) => {
    setSelectedGroupId(groupId);
  };

  const fetchGroupMembers = async (groupId) => {
    try {
      // Assuming you have an endpoint to fetch group members
      // const res = await groupsService.getGroupMembers(groupId);
      // setGroupMembers(res.data);
      setGroupMembers([
        { name: "Aman", id: 1 },
        { name: "Vivek", id: 2 },
      ]);
    } catch (error) {
      console.error("Error fetching group members:", error);
    }
  };

  const handleAddMember = async () => {
    try {
      await groupsService.addMemberToGroup({
        groupId: selectedGroupId,
        userId: newMemberId,
      });
      setNewMemberId("");
      fetchGroupMembers(selectedGroupId); // Refresh members list
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg text-gray-700 mb-2">Manage Groups</h2>

      {/* Create Group Section */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="New group name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button
          onClick={handleCreateGroup}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow text-sm"
        >
          Create Group
        </button>
      </div>

      {/* List Groups Section */}
      {groupList && groupList.length > 0 ? (
        <ul className="space-y-2">
          {groupList.map((group) => (
            <li
              key={group._id}
              className="bg-gray-100 rounded px-4 py-2 text-gray-800 shadow-sm flex justify-between items-center"
            >
              <span>{group.name}</span>
              <button
                onClick={() => handleViewGroup(group._id)}
                className="text-blue-600 hover:underline text-sm"
              >
                View
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No groups found.</p>
      )}

      {/* Group Details Section (WhatsApp-like) */}
      {selectedGroupId && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Group Members</h3>
          <ul className="space-y-2">
            {groupMembers.map((member) => (
              <li
                key={member.id}
                className="bg-gray-50 rounded px-4 py-2 text-gray-800 shadow-sm"
              >
                {member.name}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <input
              type="text"
              placeholder="User ID to add"
              value={newMemberId}
              onChange={(e) => setNewMemberId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <button
              onClick={handleAddMember}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow text-sm"
            >
              Add Member
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupManagementComponent;
