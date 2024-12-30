import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeeDepartmentChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Employees",
        data: [],
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsResponse = await axios.get("http://127.0.0.1:8000/api/countries");
        const departments = departmentsResponse.data;

        const labels = departments.map((dept) => dept.name);
        const data = departments.map((dept) => dept.employees.length);

        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Employees",
              data,
              backgroundColor: "rgba(3, 138, 255) ",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2 className="text-2xl text-center font-bold text-gray-700 mb-4">Employees by Countries</h2>
      <Bar  data={chartData} options={{   responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "Employees per Country" } } }} />
    </div>
  );
};

export default EmployeeDepartmentChart;
