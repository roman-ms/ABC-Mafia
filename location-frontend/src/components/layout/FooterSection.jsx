import React from "react";
import rulesByType from "../../data/rulesByType";

const FooterSection = () => {
  return (
    <footer className="mb-8 rounded-3xl bg-green-700 px-4 py-8 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="text-sunshine font-display mb-2 text-xl font-bold">
          CareCubby™
        </p>
        <p className="mb-2 text-sm">Developed by the Artistic Alphabet Mafia</p>
        <p className="mb-4 text-sm">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
