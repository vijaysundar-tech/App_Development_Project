import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  clearAllData,
} from "../store/slices/authSlice";

function NotificationStack() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCacheClear = () => {
      dispatch(clearAllData());
    };

    window.addEventListener(
      "bitbridge-cache-clear",
      handleCacheClear
    );

    return () => {
      window.removeEventListener(
        "bitbridge-cache-clear",
        handleCacheClear
      );
    };
  }, [dispatch]);

  return null;
}

export default NotificationStack;