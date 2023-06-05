import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { SearchForm } from './search/SearchForm';
import "./KandyKorner.css"

export const KandyKorner = () => {
  const storedUser = localStorage.getItem("kandy_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <>
              <NavBar />
              <ApplicationViews />
            </>
          </Authorized>
        }
      />
    </Routes>
  );
};