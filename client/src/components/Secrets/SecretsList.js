import React from "react";

const SecretsList = () => {
  const secrets = [
    { id: 1, content: "This is a secret message 1", user: "User1", userName: "John Doe" },
    { id: 2, content: "This is a secret message 2", user: "User2", userName: "Jane Doe" },
    // ... more secrets
  ];

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Secrets</h2>

      <div className="flex flex-col items-center">
        {secrets.map((secret) => (
          <div key={secret.id} className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mx-auto mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <p className="text-lg font-semibold mb-1">{secret.userName}</p>
            <p className="text-gray-600">{secret.user}</p>
            <p>{secret.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretsList;
