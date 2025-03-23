'use client';
import React, { useState } from 'react';

const CertificatePage = () => {
  const [userData] = useState({
    solvedQuestions: 5,  // Default value for questions solved
    name: '',  // Placeholder for name
    githubUsername: '', // Placeholder for GitHub username
  });

  // Function to generate the certificate dynamically
  const generateCertificate = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-indigo-600">Certificate of Completion</h2>
          <p className="text-lg mt-2">This is to certify that</p>
          <h3 className="text-3xl font-bold text-green-500 mt-4">{userData.name || 'User'}</h3>
          <p className="text-lg mt-2">Has solved {userData.solvedQuestions} questions on EduChain</p>
          <p className="text-sm mt-4">Issued on: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="text-right mt-8">
          <p className="text-lg italic text-gray-600">{userData.githubUsername }</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold text-green-500 mb-6">Hello, user!</h1>
      {generateCertificate()}
    </div>
  );
};

export default CertificatePage;
