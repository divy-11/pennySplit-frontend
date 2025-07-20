import { useEffect, useState } from "react";
import contactService from "../api/contactService";

const FriendManagementComponent = () => {
  const [searchId, setSearchId] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    fetchFriendList();
    fetchFriendRequests();
  }, []);

  const fetchFriendList = async () => {
    try {
      const res = await contactService.getContactList();
      setFriends(res.contacts);
    } catch (error) {
      console.error("Error fetching friend list:", error);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const res = await contactService.getFriendRequests();
      setFriendRequests(res);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  const handleSendFriendRequest = async () => {
    try {
      await contactService.sendFriendRequest({ toUserId: searchId });
      setSearchId("");
      // Optionally, provide user feedback (e.g., a success message)
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleAcceptFriendRequest = async (senderId) => {
    try {
      await contactService.acceptFriendRequest({ senderId });
      fetchFriendList(); // Refresh friend list
      fetchFriendRequests(); // Refresh friend requests
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg text-gray-700 mb-2">Manage Friends</h2>

      {/* Search and Add Friend Section */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter User ID to send friend request"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button
          onClick={handleSendFriendRequest}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow text-sm"
        >
          Send Friend Request
        </button>
      </div>

      {/* Friend Requests Section */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Friend Requests</h3>
        {friendRequests.length > 0 ? (
          <ul className="space-y-2">
            {friendRequests.map((request) => (
              <li
                key={request.id}
                className="bg-gray-100 rounded px-4 py-2 text-gray-800 shadow-sm flex justify-between items-center"
              >
                <span>{request.name}</span>
                <button
                  onClick={() => handleAcceptFriendRequest(request.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow text-sm"
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No friend requests.</p>
        )}
      </div>

      {/* Friend List Section */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 mb-2">Friends</h3>
        {friends.length > 0 ? (
          <ul className="space-y-2">
            {friends.map((friend) => (
              <li
                key={friend.id}
                className="bg-gray-50 rounded px-4 py-2 text-gray-800 shadow-sm"
              >
                {friend.name}
                <span>{` (${friend.id})`}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No friends.</p>
        )}
      </div>
    </div>
  );
};

export default FriendManagementComponent;
