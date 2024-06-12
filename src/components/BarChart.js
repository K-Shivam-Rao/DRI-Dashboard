import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./BarChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const PillarVsBudgetChart = ({ pillarValues }) => {
  const categoryNames = [];
  const categoryValues = [];

  pillarValues.forEach((pillar) => {
    pillar.categories.forEach((category) => {
      categoryNames.push(`${category.categoryName}`);
      categoryValues.push(category.value);
    });
  });
  console.log(categoryNames, categoryValues);

  const data = {
    labels: categoryNames,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: [
          "rgb(0, 124, 82)",
          "rgb(51, 109, 255)",
          "rgb(255, 176, 57)",
          "rgb(235, 47, 46)",
        ],
        borderColor: [
          "rgb(0, 124, 82)",
          "rgb(51, 109, 255)",
          "rgb(255, 176, 57)",
          "rgb(235, 47, 46)",
        ],
        borderWidth: 1,
        barThickness: 60,
        maxBarThickness: 80,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    display: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Pillar Values Chart",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bar-chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

const DRIEqualWeightageChart = ({ averages }) => {
  const equalValue = averages.averageValue;
  console.log(equalValue);
  const chartData = {
    labels: ["Year : 2024"],
    datasets: [
      {
        label: "DRI Equal Weightage",
        data: [equalValue],
        backgroundColor: "rgb(255, 176, 57)",
        barThickness: 60,
        maxBarThickness: 80,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "DRI Equal Weightage",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bar-chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
};

const DRIBudgetWeightageChart = ({ averages }) => {
  const budgetValue = averages.averageCurrentBudget;
  console.log(budgetValue);
  const chartData = {
    labels: ["Year : 2024"],
    datasets: [
      {
        label: "DRI Budget Weightage",
        data: [budgetValue],
        backgroundColor: "rgb(255, 176, 57)",
        barThickness: 60,
        maxBarThickness: 80,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "DRI Budget Weightage",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bar-chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export { PillarVsBudgetChart, DRIEqualWeightageChart, DRIBudgetWeightageChart };
