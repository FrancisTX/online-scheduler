import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import MainPage from './page/MainPage';
import SignUpPage from './page/SignUpPage';
import ProtectedRouteWrapper from "./auth/ProtectedRoute";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<LoginPage />}
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/scheduler"
                    element={<ProtectedRouteWrapper><MainPage /></ProtectedRouteWrapper>}
                />
                <Route
                    path="/signup"
                    element={<SignUpPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
