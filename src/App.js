import { React, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import PillarTable from "./components/PillarTable";
import {
  PillarVsBudgetChart,
  DRIEqualWeightageChart,
  DRIBudgetWeightageChart,
} from "./components/BarChart";
import "./App.css";
import "./components/BarChart.css";

function App() {
  const [averages, setAverages] = useState({
    averageValue: 0,
    averageCurrentBudget: 0,
  });
  const [pillarValues, setPillarValues] = useState([]);
  const [expandAll, setExpandAll] = useState(false);

  const toggleExpandAll = () => {
    setExpandAll((prevExpandAll) => !prevExpandAll);
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Header averages={averages} toggleExpandAll={toggleExpandAll} />
        <PillarTable
          setAverages={setAverages}
          setPillarValues={setPillarValues}
          expandAll={expandAll}
        />
        <div className="chart-wrapper">
          <div className="left-chart">
            <PillarVsBudgetChart pillarValues={pillarValues} />
          </div>
          <div className="right-charts">
            <DRIEqualWeightageChart averages={averages} />
            <DRIBudgetWeightageChart averages={averages} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
