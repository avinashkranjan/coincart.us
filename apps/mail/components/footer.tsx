import React from "react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between h-16 px-4 mx-auto sm:px-6 sm:flex-row">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Coincart Email Manager. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
