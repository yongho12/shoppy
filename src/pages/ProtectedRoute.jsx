import React from "react";
import { Navigate } from "react-router-dom"
import { useAuthContext } from "../components/context/AuthContext";

export default function ProtectedRoute({children, requireAdmin }){
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />
  }

  return children;
}