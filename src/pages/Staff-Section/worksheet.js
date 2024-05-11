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
    <div className="container-fluid d-flex justify-content-center align-items-start vh-100" style={{paddingTop:"50px"}}>
      {/* Using vh-100 to ensure full viewport height */}
      <div className="row justify-content-center align-items-center w-100">
        {/* Using w-100 to ensure full width within the container */}
        <div className="col-md-8">
          <div className="text-center">
            <h2 className="mb-4">Daily Worksheet Viewer</h2>
            <p className="mb-5">View today's worksheet by clicking the button below:</p>
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
