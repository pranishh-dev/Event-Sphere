import React, { useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  let makeLoading = () => {
    setIsLoading(true);
  };
  let makeNoLoading = () => {
    setIsLoading(false);
  };
  
  return { isLoading, makeLoading, makeNoLoading };
};
