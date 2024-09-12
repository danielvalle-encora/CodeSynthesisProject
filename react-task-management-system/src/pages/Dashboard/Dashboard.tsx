import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {

    // const [tasks, setTasks] = useState([]);

    // useEffect(() => {
    //     fetchTasks();
    // }, []);

    // const fetchTasks = async () => {
    //     try {
    //         const response = await fetch('https://api.example.com/tasks');
    //         const data = await response.json();
    //         setTasks(data);
    //     } catch (error) {
    //         console.error('Error fetching tasks:', error);
    //     }
    // };

    return (
    <>
        <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
        
        {/* Task Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          Task is me
        </ div>
      </main>
    </>
    )
}

export default Dashboard;