import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import authService from "../api/authService";
import groupsService from "../api/groupsService";
import GroupTripComponent from "../components/GroupTripComponent";
import { useAppStore, useGroupStore } from "../store/useAppStore";

export const Route = createLazyFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: () => {
    const user = useAppStore.getState().user;
    if (!user) {
      window.location.href = "/login";
    }
  },
});

function RouteComponent() {
  const [loading, setLoading] = useState(true);
  const setGroup = useGroupStore((state) => state.setGroup);
  const groups = useGroupStore((state) => state.groups);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await groupsService.getGroups();
        setGroup(res.data.groups);
      } catch (err) {
        console.error("Failed to load groups:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [setGroup]);

  const handleLogout = (event) => {
    event.preventDefault();
    authService.logout();
    window.location.href = "/";
  };

  const handleGroupCreation = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Dashboard</h1>
      <h2 className="font-bold mt-4">Groups</h2>

      {loading ? (
        <p>Loading groups...</p>
      ) : groups && groups.length > 0 ? (
        groups.map((group, index) => (
          <div id={group._id} key={index}>
            {group.name}
          </div>
        ))
      ) : (
        <p>No groups found.</p>
      )}

      <br />
      <GroupTripComponent />
      <br />
      <button
        onClick={handleLogout}
        className="mt-2 btn bg-red-800 text-white p-2"
      >
        Logout
      </button>
    </div>
  );
}
