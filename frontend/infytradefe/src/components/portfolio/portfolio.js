import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Progress,
  CircularProgress,
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
        <div className="w-full h-screen flex items-center justify-center">
          <CircularProgress size="lg" isIndeterminate aria-label="Loading..." />
        </div>
      ) : (
        <>
          <div className="bg-gray-200 h-screen">
            <div>
              <h1 className="text-2xl p-6 font-bold">Welcome Karthik !</h1>
              <p className="font-semibold ml-8">
                Your personalised Portfolio is here:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* Profit/Loss Card */}
              <div className="p-4  bg-white shadow-lg rounded-lg m-4">
                <h3 h4 className="font-semibold mb-2">
                  Profit/Loss
                </h3>
                <p className="text-lg">$5000</p>
                {/* You can add a chart or additional details here */}
              </div>

              {/* Total Balance Card */}
              <div className="p-4 bg-white shadow-lg rounded-lg m-4">
                <h3 h4 className="font-semibold mb-2">
                  Total Balance
                </h3>
                <p className="text-lg">$25000</p>
                {/* You can add a chart or additional details here */}
              </div>

              {/* Charts Card */}
              <div className="p-4 bg-white rounded-lg m-4">
                <h3 h4 className="font-semibold mb-2">
                  Charts
                </h3>
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  {/* Placeholder for chart */}
                  <p className="text-gray-500">Chart here</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
              {/* Portfolio Table */}
              <div className="p-2">
                <h2 className="text-left text-2xl font-semibold mb-2">
                  Portfolio
                </h2>
                <Table
                  aria-label="Portfolio table"
                  className="w-full min-h-[35vh] max-h-[35vh]"
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

              {/* Holdings Table */}
              <div className=" p-2">
                <h2 className="text-left text-2xl font-semibold mb-2">
                  Holdings
                </h2>
                <div className="overflow-x-auto">
                  <Table
                    aria-label="Holdings table"
                    className="w-full min-h-[35vh] max-h-[35vh]"
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
          </div>
        </>
      )}
    </>
  );
}

export default Portfolio;
