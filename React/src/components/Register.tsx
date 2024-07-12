import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './CSS/register.css'

interface FormData {
  name: string;
  village: string;
  pincode: string;
  email: string;
  phno: string;
  gender: string;
  dob: string;
}

const Rform: React.FC = () => {
  const [data, setData] = useState<FormData>({
    name: '',
    village: '',
    pincode: '',
    email: '',
    phno: '',
    gender: '',
    dob: ''
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log("Form data:", data);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    axios.post('http://localhost:3000/population/save', data)
      .then(response => {
        if (response.status === 201) {
          let responsedata = response.data;
          console.log(responsedata + " saved names..");
          console.log("success");

          if (responsedata && responsedata.length > 0) {
            document.getElementById("msg")!.innerHTML = "<center><h3>Updation Success</h3></center>";
          } else {
            document.getElementById("msg")!.innerHTML = "<center><h3>Updation Failed</h3></center><br><span>Gmail must be unique</span>";
          }
        } else {
          console.log("Failed..");
          document.getElementById("msg")!.innerHTML = "<center><h3>Updation Failed</h3></center>";
        }
      })
      .catch(error => {
        console.error("Failed..", error);
        document.getElementById("msg")!.innerHTML = "<center><h3>Updation Failed</h3></center><br><span>Network Issue</span>";
      });
  };

  return (
    <div className="App">
      <div id="container">
        <div id="form">
          <form onSubmit={submitHandler}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" placeholder="Enter name" id="name" className="inp" required onChange={changeHandler} />
            <label htmlFor="village">Village:</label>
            <input type="text" name="village" id="village" placeholder="Enter village" className="inp" required onChange={changeHandler} />
            <label htmlFor="pincode">Pincode:</label>
            <input type="text" id="pincode" name="pincode" placeholder="Enter pincode" className="inp" required onChange={changeHandler} />
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="Enter email" className="inp" required onChange={changeHandler} />
            <label htmlFor="phno">Phone No:</label>
            <input type="text" name="phno" id="phno" placeholder="Enter phone number" className="inp" onChange={changeHandler} />
            <div id="gen">
              <span>Gender:</span>
              <label htmlFor="m" className="labs">Male</label>
              <input type="radio" name="gender" id="m" value="Male" onChange={changeHandler} />
              <label htmlFor="f" className="labs">Female</label>
              <input type="radio" name="gender" id="f" value="Female" onChange={changeHandler} />
            </div>
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" name="dob" id="dob" className="inp" onChange={changeHandler} />
            <input type="submit" value="SUBMIT" id="submit" />
          </form>
        </div>
        <div id="msg"></div>
      </div>
    </div>
  );
}

export default Rform;
