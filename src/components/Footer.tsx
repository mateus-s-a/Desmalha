import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-300 mt-12 px-6 py-6 text-center">
      <p className="text-gray-700 text-sm">
        © 2025 Desmalha — Desenvolvido com React + TypeScript
      </p>

      <div className="flex justify-center gap-6 mt-2 text-sm text-blue-600">
        <a href="#" className="hover:underline">📚 Documentação</a>
        <a href="#" className="hover:underline">🐙 GitHub</a>
      </div>
    </footer>
  );
}
