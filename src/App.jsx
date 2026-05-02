import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function App() {
  const [data, setData] = useState(null);

useEffect(() => {
  fetch("https://hqgutwd2r3.execute-api.eu-north-1.amazonaws.com/prod/costs")
    .then((res) => res.json())
    .then((data) => {
      console.log("API data:", data);
      setData(data);
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);

  if (!data) return <p>Loading...</p>;

  const budget = data.budget;
  const currentSpend = data.currentSpend;
  const budgetUsed = (currentSpend / budget) * 100;
  const isBudgetWarning = budgetUsed >= 80;

  const savingsOpportunities = [
    { service: "EC2", issue: "Underutilized instance", potentialSaving: 25 },
    { service: "S3", issue: "Unused storage bucket", potentialSaving: 8 },
    { service: "RDS", issue: "Idle database", potentialSaving: 15 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Cloud Cost Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-sm text-gray-500">Current Spend</p>
          <h2 className="text-2xl font-bold mt-2">
            ${currentSpend}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-sm text-gray-500">Last Month</p>
          <h2 className="text-2xl font-bold mt-2">
            ${data.lastMonth}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-sm text-gray-500">Budget Remaining</p>
          <h2 className="text-2xl font-bold mt-2">
            ${budget - currentSpend}
          </h2>
        </div>
      </div>

      {/* Budget Alert */}
      {isBudgetWarning && (
        <div className="bg-white rounded-2xl shadow p-5 mb-6">
          <p className="font-medium text-red-600">
            Warning: Budget usage has exceeded 80%
          </p>
        </div>
      )}

      {/* Budget Tracker */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl font-semibold">Budget Usage</h2>
          <span className="font-medium">
            ${currentSpend} / ${budget}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-black h-4 rounded-full"
            style={{ width: `${budgetUsed}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {budgetUsed.toFixed(1)}% of monthly budget used
        </p>
      </div>

      {/* Savings */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Potential Savings
        </h2>

        {savingsOpportunities.map((item, index) => (
          <div key={index} className="border rounded-xl p-4 mb-2">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{item.service}</p>
                <p className="text-sm text-gray-500">
                  {item.issue}
                </p>
              </div>

              <p className="font-semibold">
                ${item.potentialSaving}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Daily Spend Trend
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.daily}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cost" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4">
          Cost by Service
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.services}>
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cost" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;