import { Mail } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container flex items-center h-16 px-4 mx-auto sm:px-6">
        <h1 className="text-lg font-bold flex items-center space-x-2">
          <Mail className="h-6 w-6 mr-3" />
          Coincart.us: Email Manager
        </h1>
      </div>
    </header>
  );
}
