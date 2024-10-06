"use client";
import { Button } from "../ui/button";

const CheckExpiryButton = () => {
  const checkExpiry = async () => {
    try {
      const response = await fetch("/api/checkExpiry", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.text();
        console.log(result); // Handle success (you can show a message to the user)
      } else {
        console.error("Failed to check expiry:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <Button onClick={checkExpiry}>Check Expiry</Button>;
};

export default CheckExpiryButton;
