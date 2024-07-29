import React, { useState } from "react";
import { NameInitialsAvatar } from "react-name-initials-avatar";

const Rankings = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // mock data
  const rows = [
    {
      rank: 1,
      name: "Hart Hagerty",
      country: "United States",
      company: "Zemlak, Daniel and Leannon",
      jobTitle: "Desktop Support Technician",
      color: "Purple",
    },
    {
      rank: 2,
      name: "Brice Swyre",
      country: "China",
      company: "Carroll Group",
      jobTitle: "Tax Accountant",
      color: "Red",
    },
    {
      rank: 3,
      name: "Marjy Ferencz",
      country: "Russia",
      company: "Rowe-Schoen",
      jobTitle: "Office Assistant I",
      color: "Crimson",
    },
    {
      rank: 4,
      name: "Yancy Tear",
      country: "Brazil",
      company: "Wyman-Ledner",
      jobTitle: "Community Outreach Specialist",
      color: "Indigo",
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
            <th>Favorite Color</th>
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
                    <NameInitialsAvatar name={row.name} />
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
                <span className="badge badge-ghost badge-sm">
                  {row.jobTitle}
                </span>
              </td>
              <td>{row.color}</td>
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
