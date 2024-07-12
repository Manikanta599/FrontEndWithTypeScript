import React, { useState, ChangeEvent } from 'react';
import './CSS/uploadexcel.css';
import { readExcel, ExcelData } from './readExcel'; 
import axios from 'axios';

interface NameData {
  name: string;
  dob?: string;
  village?: string;
  pincode?: string;
  email?: string;
  phno?: string;
  gender?: string;
}

const UploadExcel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [names, setNames] = useState<string[]>([]);
  const [flag, setFlag] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (file) {
      readExcel(file)
        .then((data: ExcelData[]) => {
          console.log('Data read from Excel:', data);

          // Transform ExcelData to NameData
          const updatedData: NameData[] = data.map(values => ({
            name: values.name,
            dob: '2024/06/14',
            village: values.village,
            pincode: values.pincode,
            email: values.email,
            phno: values.phno,
            gender: values.gender
          }));

          axios.post('http://localhost:3000/population/save', updatedData)
            .then(response => {
              console.log('Response from backend:', response);
              if (response.status === 201 && Array.isArray(response.data)) {
                console.log('Names received from backend:', response.data);
                setNames(response.data);  // Set the names state
                setFlag(1);  // Set the flag state
                setErrorMessage('');
                let rnames = response.data;
                if (rnames.length <= 0) {
                  setErrorMessage('No new names were saved.');
                }
              } else {
                // Backend response is not as expected
                setErrorMessage('No new names were saved.');
                setFlag(0);  // Reset flag state
              }

              // Log the names after setting the state
              console.log("Updated names: ", response.data);
            })
            .catch(error => {
              console.error('Error saving data:', error);
              setErrorMessage('Data already present.');
              setFlag(0);  // Reset flag state
            });
        })
        .catch((error) => {
          console.error('Error reading excel file:', error);
          setErrorMessage('Error reading excel file. Please try again.');
          setFlag(0);  // Reset flag state
        });
    } else {
      console.error('No file selected');
      setErrorMessage('No file selected. Please select a file.');
      setFlag(0);  // Reset flag state
    }
    console.log(errorMessage + " err msg....");
  };

  return (
    <div id="excel_con">
      <h3 id="fileh">Here you can Upload Your Excel File:</h3>
      <div id="file">
        <input type='file' onChange={handleFileChange}></input>
      </div>
      <div id="files">
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {names.length > 0 && (
        <div id="names">
          <h4>Stored Names:</h4>
          <ul>
            {names.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}

      {errorMessage && (
        <div id="errorMessage">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default UploadExcel;
