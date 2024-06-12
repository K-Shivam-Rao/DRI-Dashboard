import React, { useState, useEffect, useCallback } from "react";
import "./PillarTable.css";
import axios from "axios";

const PillarTable = ({ setAverages, setPillarValues, expandAll }) => {
  const [pillars, setPillars] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/pillars")
      .then((response) => {
        console.log("Pillars data:", response.data);
        setPillars(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pillars:", error);
        setError("Failed to fetch pillars data. Please try again later.");
        setLoading(false);
      });
  }, []);

  const toggleRowExpansion = useCallback((index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  useEffect(() => {
    const pillarValues = pillars.map((pillar) => {
      return {
        pillarName: pillar.name,
        categories: pillar.categories.map((category) => ({
          categoryName: category.name,
          value: category.value,
        })),
      };
    });

    setPillarValues(pillarValues);
  }, [pillars, setPillarValues]);

  useEffect(() => {
    const totalValue = pillars.reduce((sum, pillar) => {
      return (
        sum +
        pillar.categories.reduce((catSum, category) => {
          return catSum + category.value;
        }, 0)
      );
    }, 0);

    const totalCurrentBudget = pillars.reduce((sum, pillar) => {
      return (
        sum +
        pillar.categories.reduce((catSum, category) => {
          return catSum + category.currentBudget;
        }, 0)
      );
    }, 0);

    const totalCategories = pillars.reduce((sum, pillar) => {
      return sum + pillar.categories.length;
    }, 0);

    const averageValue = totalCategories ? totalValue / totalCategories : 0;
    const averageCurrentBudget = totalCategories
      ? totalCurrentBudget / totalCategories
      : 0;

    setAverages({ averageValue, averageCurrentBudget });
  }, [pillars, setAverages]);

  // Expand All Button 
  useEffect(() => {
    if (expandAll) {
      const newExpandedRows = {};
      pillars.forEach((pillar, pillarIndex) => {
        pillar.categories.forEach((_, catIndex) => {
          newExpandedRows[`${pillarIndex}-${catIndex}`] = true;
        });
      });
      setExpandedRows(newExpandedRows);
    } else {
      setExpandedRows({});
    }
  }, [expandAll, pillars]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pillar-table">
      <table>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Category Value</th>
            <th>Current Budget (Rs)</th>
            <th>Additional Budget (Rs)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pillars.map((pillar, pillarIndex) =>
            pillar.categories.map((category, catIndex) => (
              <React.Fragment key={`${pillarIndex}-${catIndex}`}>
                <tr>
                  <td>{category.name}</td>
                  <td>{category.value}</td>
                  <td>{category.currentBudget}</td>
                  <td>{category.additionalBudget}</td>
                  <td
                    className="caret-cell"
                    onClick={() =>
                      toggleRowExpansion(`${pillarIndex}-${catIndex}`)
                    }
                  >
                    <span
                      className={`caret ${
                        expandedRows[`${pillarIndex}-${catIndex}`]
                          ? "caret-expanded"
                          : ""
                      }`}
                    >
                      {expandedRows[`${pillarIndex}-${catIndex}`] ? "▲" : "▼"}
                    </span>
                  </td>
                </tr>
                {expandedRows[`${pillarIndex}-${catIndex}`] &&
                  category.details.map((detail, subIndex) => (
                    <tr key={subIndex} className="sub-row">
                      <td>{`- ${detail.subName}`}</td>
                      <td>{detail.subValue}</td>
                      <td>{detail.subCurrentBudget}</td>
                      <td>{detail.subAdditionalBudget}</td>
                      <td></td>
                    </tr>
                  ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PillarTable;
