import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTask } from '../slices/features/tasks/taskSlice';
import { useFetchTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '../slices/features/tasks/taskApiSlice';
import { useNavigate } from 'react-router-dom';
import {  FaEye, FaSpinner, FaTrashAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskModal = ({ task, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate__animated animate__fadeIn">
    <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-gray-950 p-4 rounded-lg w-full max-w-md transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl animate__animated animate__zoomIn">
      <h2 className="text-xl font-semibold text-white mb-3">{task.title}</h2>
      <p className="text-sm text-white mb-3">{task.description}</p>
      <p className="text-sm text-white mb-3">
        Due Date: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <p className="text-sm text-white mb-4">Status: {task.status}</p>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-1 text-sm font-medium text-white bg-gradient-to-r from-purple-800 via-purple-600 to-gray-600 rounded-md hover:bg-gradient-to-r hover:from-white hover:via-red-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 transform hover:scale-110"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const customToastStyle = (type) => {
  if (type === 'success') {
    return {
      background: 'linear-gradient(to right, #6a1b9a, #4e148c, #212121)', // Purple to black gradient
      color: 'white',
    };
  }
  return {
    background: 'linear-gradient(to right, #e53935, #b71c1c)', // Red gradient for error
    color: 'white',
  };
};

const TaskCardSkeleton = () => (
  <div className="p-6 rounded-lg shadow-lg bg-gray-700 animate-pulse">
    <div className="h-6 bg-gray-600 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-600 rounded w-5/6 mb-4"></div>
    <div className="h-4 bg-gray-600 rounded w-2/3 mb-4"></div>
    <div className="h-4 bg-gray-600 rounded w-1/2 mb-4"></div>
  </div>
);


const TaskScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formVisible, setFormVisible] = useState(false);

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

  const [selectedTask, setSelectedTask] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

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
      toast.success("Task Added", { style: customToastStyle('success') });
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
      toast.error("Error Adding Task", { style: customToastStyle('error') });
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
    'bg-gradient-to-r from-purple-800 via-purple-900 to-gray-950',
    'bg-gradient-to-r from-gray-950 via-purple-900 to-purple-800',
  ];

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!userInfo) {
    navigate('/login');
    return null;
  }

  return (
    <div className="task-screen relative overflow-hidden bg-gradient-to-r from-slate-700 via-purple-500 to-purple-900 min-h-screen p-6">
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
          <div>
            <h2 className="text-xl font-medium mb-4">Your Task List</h2>
            {fetchLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array.from({ length: tasksPerPage }).map((_, index) => (
                  <TaskCardSkeleton key={index} />
                ))}
              </div>
            ) : tasks.length === 0 ? (
              <p className="text-center from-neutral-500  via-purple-950 to-gray-950 text-gray-100 bg-gradient-to-r   p-4 rounded-lg max-w-xs mx-auto">
              No tasks available. Please create a task!
            </p>
            
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentTasks.map((task, index) => (
                  <li
                    key={task.id}
                    className={`p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${gradients[index % gradients.length]} hover:opacity-80 cursor-pointer`}
                  >
                    <h3 className="text-sm font-semibold text-white">{task.title}</h3>
                    <p className="text-xs text-white mt-1">{task.description}</p>
                    <p className="text-xs text-white mt-1">
                      Due Date: {new Date(task.dueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-white mt-1">Status: {task.status}</p>

                    <div className="mt-4 flex justify-between items-center">
                      <div
                        onClick={() =>
                          handleUpdateTask({
                            ...task,
                            status: task.status === 'Completed' ? 'In Progress' : 'Completed',
                          })
                        }
                        className="px-3 py-1 text-xs text-gray-700 bg-white rounded-md hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        {task.status === 'Completed' ? 'Reopen' : 'Complete'}
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaTrashAlt
                          onClick={() => handleDeleteTask(task._id)}
                          color="white"
                          className="text-sm hover:text-red-500"
                        />
                        <FaEye
                          onClick={() => setSelectedTask(task)}
                          color="white"
                          className="text-sm hover:text-blue-500"
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

            )}
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handlePrevPage}
              className="px-4 py-2 mx-2 text-white bg-purple-700 rounded-md hover:bg-purple-800"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 mx-2 text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 mx-2 text-white bg-purple-700 rounded-md hover:bg-purple-800"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />

      {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </div>
  );
};

export default TaskScreen;
