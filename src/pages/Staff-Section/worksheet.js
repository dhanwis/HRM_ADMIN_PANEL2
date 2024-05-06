import React from 'react';

const DailyWorksheetView = () => {
  const openGoogleSheet = () => {
    const sheetId = '1rPTzvgLtt6jcWNUFskW0K6IxjfSzF22chsYUlZazPPw'; // Replace with your Google Sheets ID

    // Construct the URL to open the Google Sheet
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=0`;

    // Open the Google Sheet in a new tab
    window.open(url, '_blank');
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-8">
          <div className="text-center">
            <h2 class="mb-4">Daily Worksheet Viewer</h2>
            <p class="mb-5">View today's worksheet by clicking the button below:</p>
            <button onClick={openGoogleSheet} className="btn btn-primary">
              View Worksheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWorksheetView;
