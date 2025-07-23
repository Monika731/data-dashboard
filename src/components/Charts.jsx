import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Charts = ({ books }) => {
  // 1. Bar Chart: Count of books by decade
  const booksByDecade = {};
  books.forEach((book) => {
    const year = book.first_publish_year;
    if (year) {
      const decade = Math.floor(year / 10) * 10;
      booksByDecade[decade] = (booksByDecade[decade] || 0) + 1;
    }
  });

  const decadeLabels = Object.keys(booksByDecade).sort();
  const decadeData = decadeLabels.map((decade) => booksByDecade[decade]);

  const barData = {
    labels: decadeLabels,
    datasets: [
      {
        label: "Books Published per Decade",
        data: decadeData,
        backgroundColor: "#4a90e2",
      },
    ],
  };

  // 2. Pie Chart: Top 5 most common subjects
  const subjectCount = {};
  books.forEach((book) => {
    book.subject?.forEach((subject) => {
      subjectCount[subject] = (subjectCount[subject] || 0) + 1;
    });
  });

  const sortedSubjects = Object.entries(subjectCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const pieData = {
    labels: sortedSubjects.map(([subject]) => subject),
    datasets: [
      {
        data: sortedSubjects.map(([_, count]) => count),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#7ac36a", "#aa64e2"],
      },
    ],
  };

  return (
    <div className="charts">
      <div style={{ maxWidth: 600, margin: "2rem auto" }}>
        <Bar data={barData} />
      </div>

      <div style={{ maxWidth: 400, margin: "2rem auto" }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Charts;
