import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DailyWorksheetView = () => {
  // Function to open the Google Sheet in a new tab
  const handleOpenGoogleSheet = () => {
    const sheetId = '1rPTzvgLtt6jcWNUFskW0K6IxjfSzF22chsYUlZazPPw'; // Replace with your Google Sheets ID
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=0`;
    window.open(url, '_blank');
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ paddingTop: '50px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h2 className="card-title mb-4">Daily Worksheet Viewer</h2>
                <p className="card-text mb-5">View today's worksheet by clicking the button below:</p>
                <button onClick={handleOpenGoogleSheet} className="btn btn-primary">
                  View Worksheet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWorksheetView;
