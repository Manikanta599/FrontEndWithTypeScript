import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import './CSS/loading.css'
export const Loading: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('Setting up Axios interceptors');

    const requestInterceptor = axios.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        console.log('Request started');
        setIsLoading(true);
        return request;
      },
      (error: AxiosError) => {
        console.log('Request error');
        setIsLoading(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('Response received');
        setIsLoading(false);
        return response;
      },
      (error: AxiosError) => {
        console.log('Response error');
        setIsLoading(false);
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on component unmount
    return () => {
      console.log('Cleaning up Axios interceptors');
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);
            console.log(isLoading)
  return (
    <>
      {isLoading && <div className="loading">Loading...</div>}
    </>
  );
};
