import React from "react";
import { Box } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  const accessedInvalidUrl = isRouteErrorResponse(error);
  return (
    <>
      <Box>{accessedInvalidUrl ? "Invalid Url" : "Something failed"}</Box>
    </>
  );
};

export default ErrorPage;
