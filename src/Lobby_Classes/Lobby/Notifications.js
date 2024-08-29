import React from 'react';
// Component to display notifications

const Notifications = () => {
  return (
    <div className={`p-6 rounded-lg shadow-lg mb-8 w-full max-w-4xl`}>
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <div className="space-y-4">
        <div className="bg-blue-900 text-white p-4 rounded-lg shadow-md max-w-md mr-auto">
          Reminder: Upcoming appointment on August 30.
        </div>
        <div className="bg-blue-900 text-white p-4 rounded-lg shadow-md max-w-md mr-auto">
          New test results are available.
        </div>
        <div className="bg-blue-900 text-white p-4 rounded-lg shadow-md max-w-md mr-auto">
          Feedback request: Please rate your recent visit.
        </div>
      </div>
    </div>
  );
};

export default Notifications;
