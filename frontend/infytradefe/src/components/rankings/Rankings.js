import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { getRandomTimeout } from "../../utilities/getRandomTimeout";
import { CircularProgress } from "@nextui-org/react";
import { getAllUsers } from "../../api/auth";

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

  function stringAvatar(name) {
    // Check if name is defined and has at least two words
    if (name && name.split(" ").length > 1) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      };
    }

    // Handle cases where name is not valid
    return {
      sx: {
        bgcolor: stringToColor(name || "Default Name"),
      },
      children: `${(name || "N").charAt(0)}`,
    };
  }

  function stringToColor(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

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
