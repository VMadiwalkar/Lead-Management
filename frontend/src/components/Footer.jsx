import React from 'react';
import { Users, List, Sun } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-md border-t border-gray-200 p-4 flex items-center justify-between text-xs text-gray-500">
      <div className="flex items-center space-x-2">
        <button className="p-1 hover:bg-gray-100 rounded"><Users size={16} /></button>
        <button className="p-1 hover:bg-gray-100 rounded"><List size={16} /></button>
        <button className="p-1 hover:bg-gray-100 rounded"><Sun size={16} /></button>
      </div>
      <span>2025-2026 © Insane Techno Labs.</span>
    </footer>
  );
};

export default Footer;
