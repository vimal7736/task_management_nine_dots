import React, { useEffect, useState } from 'react';
import TaskProgressChart from '../components/TaskprogressChart';

const ProfileScreen = () => {
  const [tasks, setTasks] = useState([
    { title: 'Task 1', status: 'Completed' },
    { title: 'Task 2', status: 'In Progress' },
    { title: 'Task 3', status: 'Not Started' },
    { title: 'Task 4', status: 'In Progress' },
  ]); 

  useEffect(() => {
   
  }, []);

  return (
    <div className="profile-container p-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      <TaskProgressChart tasks={tasks} />
    </div>
  );
};

export default ProfileScreen;
