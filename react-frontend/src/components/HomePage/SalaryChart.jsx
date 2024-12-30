import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const SalaryChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Salary per Employee",
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
        const employeesResponse = await axios.get("http://127.0.0.1:8000/api/employees");
        const employees = employeesResponse.data;
        
        const sortedEmployees = employees.sort((a, b) => b.salary - a.salary); 
        const labels = sortedEmployees.map((emp) => emp.first_name);
        const data = sortedEmployees.map((emp) => emp.salary);

        setChartData({
          labels,
          datasets: [
            {
              label: "Salary of Employees",
              data,
              backgroundColor: "rgba(27, 163, 156) ",
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
      <h2 className="text-2xl text-center font-bold text-gray-700 mb-4">Ranking of Salary's</h2>
      <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "Salary's per Employee's" } } }} />
    </div>
  );
};