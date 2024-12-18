import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskProgressChart = ({ tasks }) => {
  const [taskStatusCounts, setTaskStatusCounts] = useState({
    completed: 0,
    inProgress: 0,
    notStarted: 0,
  });

  useEffect(() => {
    const counts = tasks.reduce(
      (acc, task) => {
        if (task.status === 'Completed') {
          acc.completed += 1;
        } else if (task.status === 'In Progress') {
          acc.inProgress += 1;
        } else {
          acc.notStarted += 1;
        }
        return acc;
      },
      { completed: 0, inProgress: 0, notStarted: 0 }
    );
    setTaskStatusCounts(counts);
  }, [tasks]);

  const data = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [
          taskStatusCounts.completed,
          taskStatusCounts.inProgress,
          taskStatusCounts.notStarted,
        ],
        backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'],
        hoverBackgroundColor: ['#45a049', '#f4c30b', '#e53935'],
      },
    ],
  };

  return (
    <div className="task-progress-chart">
      <h3 className="text-xl font-semibold mb-4">Task Progress</h3>
      <Pie data={data} />
    </div>
  );
};

export default TaskProgressChart;
