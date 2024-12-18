import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTask } from '../slices/features/tasks/taskSlice';
import { useFetchTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '../slices/features/tasks/taskApiSlice';
import { useNavigate } from 'react-router-dom';


const TaskModal = ({ task, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate__animated animate__fadeIn">
    <div className="bg-gradient-to-r from-pink-950 via-red-950 to-purple-950 p-6 rounded-lg w-full max-w-lg transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl animate__animated animate__zoomIn">
      <h2 className="text-3xl font-semibold text-white mb-4">{task.title}</h2>
      <p className="text-white mb-4">{task.description}</p>
      <p className="text-white">
        Due Date: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <p className="text-white mb-4">Status: {task.status}</p>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-6 py-2 text-sm text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-md hover:bg-gradient-to-r hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);
const TaskScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: fetchedTasks, error: fetchError, isLoading: fetchLoading, refetch } = useFetchTasksQuery(userInfo?.token, {
    skip: !userInfo?.token,
  });

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
  });

  // State to manage the selected task for the modal
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (fetchedTasks) {
      dispatch(setTask(fetchedTasks));
    }
  }, [fetchedTasks, dispatch]);

  const handleCreateTask = async (taskData) => {
    setLoading(true);
    try {
      await createTask({ data: taskData, token: userInfo?.token }).unwrap();
      setLoading(false);
      setTaskData({
        title: '',
        description: '',
        dueDate: '',
        status: 'Pending',
      });
      refetch();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    setLoading(true);
    try {
      await updateTask({ data: taskData, token: userInfo?.token }).unwrap();
      setLoading(false);
      refetch();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!taskId) {
      console.error("Task ID is invalid:", taskId);
      return;
    }
    setLoading(true);
    try {
      await deleteTask({ id: taskId, token: userInfo?.token }).unwrap();
      dispatch(setTask(tasks.filter((task) => task.id !== taskId)));
      setLoading(false);
      refetch();
    } catch (error) {
      setLoading(false);
      console.error('Error deleting task:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const gradients = [
    'bg-gradient-to-r from-indigo-600 via-blue-700 to-purple-800',
    'bg-gradient-to-r from-red-600 via-orange-700 to-yellow-800',
    'bg-gradient-to-r from-teal-600 via-purple-700 to-indigo-800',
  ];

  if (!userInfo) {
    navigate('/login');
    return null;
  }

  return (
    <div className="task-screen relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 min-h-screen p-6">
      <svg
        className="absolute top-0 left-0 z-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="rgba(255, 255, 255, 0.1)"
          d="M0,128L48,138.7C96,149,192,171,288,192C384,213,480,235,576,202.7C672,171,768,85,864,64C960,43,1056,85,1152,128C1248,171,1344,213,1392,234.7L1440,256V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      <div className="relative z-10 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-semibold text-center mb-6 font-poppins">Your Tasks</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-medium mb-4">Create Task</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            ></textarea>
            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              type="submit"
              onClick={() => handleCreateTask(taskData)}
              className="w-full p-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </form>
        </div>

        {fetchError && (
          <p className="text-red-500 text-center mb-4">
            Error fetching tasks: {fetchError.message}
          </p>
        )}

        <div>
          <h2 className="text-xl font-medium mb-4">Your Task List</h2>
          {fetchLoading ? (
            <p className="text-center text-gray-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks available. Please create a task!</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {tasks.map((task, index) => (
                <li
                  key={task.id}
                  onClick={() => setSelectedTask(task)} // Open modal with selected task
                  className={`p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${gradients[index % gradients.length]} hover:opacity-90 cursor-pointer`}
                >
                  <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                  <p className="text-white">{task.description}</p>
                  <p className="text-white">Due Date: {task.dueDate}</p>
                  <p className="text-white">Status: {task.status}</p>
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() =>
                        handleUpdateTask({
                          ...task,
                          status: task.status === 'Completed' ? 'In Progress' : 'Completed',
                        })
                      }
                      className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {task.status === 'Completed' ? 'Reopen' : 'Complete'}
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal for selected task */}
      {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </div>
  );
};

export default TaskScreen;
