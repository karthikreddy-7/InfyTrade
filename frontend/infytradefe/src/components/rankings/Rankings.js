import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";

const Rankings = () => {
  const [currentPage, setCurrentPage] = useState(1);

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  // mock data
  const rows = [
    {
      rank: 1,
      name: "Hart Hagerty",
      country: "United States",
      company: "Zemlak, Daniel and Leannon",
      jobTitle: "Desktop Support Technician",
      TradeAmount: "15,000$",
    },
    {
      rank: 2,
      name: "Brice Swyre",
      country: "China",
      company: "Carroll Group",
      jobTitle: "Tax Accountant",
      TradeAmount: "15,000$",
    },
    {
      rank: 3,
      name: "Marjy Ferencz",
      country: "Russia",
      company: "Rowe-Schoen",
      jobTitle: "Office Assistant I",
      TradeAmount: "15,000$",
    },
    {
      rank: 4,
      name: "Yancy Tear",
      country: "Brazil",
      company: "Wyman-Ledner",
      jobTitle: "Community Outreach Specialist",
      TradeAmount: "15,000$",
    },
  ];

  // Handler for changing pages
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Rankings</th>
            <th>Name</th>
            <th>Job</th>
            <th>TradeAmount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <th>{row.rank}.</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <Stack direction="row" spacing={2}>
                      <Avatar {...stringAvatar(row.name)} />
                    </Stack>
                  </div>
                  <div>
                    <div className="font-bold">{row.name}</div>
                    <div className="text-sm opacity-50">{row.country}</div>
                  </div>
                </div>
              </td>
              <td>
                {row.company}
                <br />
                <span className="badge badge-ghost badge-md">
                  {row.jobTitle}
                </span>
              </td>
              <td>{row.TradeAmount}</td>
              <th>
                <button className="btn btn-ghost btn-sm">details</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Rankings;
