import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { getRandomTimeout } from "../../utilities/getRandomTimeout";
import { CircularProgress } from "@nextui-org/react";
import { getAllUsers } from "../../api/auth";
import { stringAvatar } from "../../utilities/AvatarIcon";

const Rankings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMinTimeElapsed, setLoadingMinTimeElapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const timer = setTimeout(() => {
      setLoadingMinTimeElapsed(true);
    }, getRandomTimeout());

    return () => clearTimeout(timer);
  }, []);



  // Sort users by profit in descending order
  const sortedUsers = users.sort((a, b) => b.profit - a.profit);

  return (
    <>
      {loading || !loadingMinTimeElapsed ? (
        <div className="w-full h-screen flex items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Rankings</th>
                <th>Name</th>
                <th>Job</th>
                <th>Profit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr key={user.id}>
                  <th>{index + 1}.</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <Stack direction="row" spacing={2}>
                          <Avatar {...stringAvatar(user.username)} />
                        </Stack>
                      </div>
                      <div>
                        <div className="font-bold">{user.username}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="badge badge-ghost badge-md">
                      {/* Placeholder for jobTitle if available */}
                      Trader
                    </div>
                  </td>
                  <td>{user.profit}</td>
                  <th>
                    <button className="btn btn-ghost btn-sm">Details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default Rankings;
