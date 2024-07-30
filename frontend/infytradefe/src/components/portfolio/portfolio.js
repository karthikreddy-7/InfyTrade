import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import {
  fetchPortfolioData,
  fetchUserHoldings,
} from "../../api/portfolioHoldings";

function Portfolio() {
  const user = useSelector((state) => state.auth.user);
  const [portfolioData, setPortfolioData] = useState([]);
  const [holdingsData, setHoldingsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let portfolio = user.portfolios || [];
        let holdings = user.holdings || [];

        if (portfolio.length === 0) {
          const portfolioResponse = await fetchPortfolioData(user.id);
          portfolio = portfolioResponse || [];
        }
        if (holdings.length === 0) {
          const holdingsResponse = await fetchUserHoldings(user.id);
          holdings = holdingsResponse || [];
        }

        setHoldingsData(holdings);
        setPortfolioData(portfolio);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const Portfoliocolumns = [
    { key: "stock", label: "Stock" },
    { key: "type", label: "Type" },
    { key: "quantity", label: "Quantity" },
    { key: "price", label: "Price" },
    { key: "transactionDate", label: "Date" },
  ];

  const Holdingscolumns = [
    { key: "stock", label: "Stock" },
    { key: "quantity", label: "Quantity" },
    { key: "averagePrice", label: "Average Price" },
  ];

  const Portfoliorows = portfolioData?.map((item) => ({
    key: item.id,
    stock: item.stock,
    type: item.type,
    quantity: item.quantity,
    price: item.price,
    transactionDate: new Date(item.transactionDate).toLocaleDateString(),
  }));

  const Holdingsrows = holdingsData?.map((item) => ({
    key: item.id,
    stock: item.stock,
    quantity: item.quantity,
    averagePrice: item.averagePrice,
  }));

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex flex-row">
            <div>
              <h2 className="text-left text-2xl font-semibold ml-4 mb-2">
                Portfolio
              </h2>
              <div className="overflow-x-auto">
                <Table
                  aria-label="Portfolio table"
                  className="w-[40vw] h-[40vh]"
                >
                  <TableHeader columns={Portfoliocolumns}>
                    {(Portfoliocolumns) => (
                      <TableColumn
                        key={Portfoliocolumns.key}
                        className="font-bold text-sm"
                      >
                        {Portfoliocolumns.label}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    items={Portfoliorows}
                    emptyContent="No rows to display."
                  >
                    {(item) => (
                      <TableRow key={item.key}>
                        {(columnKey) => (
                          <TableCell>{item[columnKey]}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div>
              <h2 className="text-left text-2xl font-semibold ml-4 mb-2">
                Holdings
              </h2>
              <div className="overflow-x-auto">
                <Table
                  aria-label="Portfolio table"
                  className="w-[40vw] h-[40vh]"
                >
                  <TableHeader columns={Holdingscolumns}>
                    {(Holdingscolumns) => (
                      <TableColumn
                        key={Holdingscolumns.key}
                        className="font-bold text-sm"
                      >
                        {Holdingscolumns.label}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    items={Holdingsrows}
                    emptyContent="No rows to display."
                  >
                    {(item) => (
                      <TableRow key={item.key}>
                        {(columnKey) => (
                          <TableCell>{item[columnKey]}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Portfolio;
