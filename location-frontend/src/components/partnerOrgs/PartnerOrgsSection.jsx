import React from "react";
import PartnerOrgCard from "./PartnerOrgCard.jsx";

const PartnerOrgsSection = ({ partnerOrgs, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      {/* Content */}
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
        style={{ backgroundColor: "#FFEFDC" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#339cc3] p-6 text-white">
          <h2 className="text-2xl font-bold">Partner Organizations</h2>
          <button
            onClick={onClose}
            className="text-3xl font-bold text-white transition-colors duration-200 hover:text-gray-200"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto p-6">
          <p className="mb-6 text-center text-gray-600">
            Discover our network of partner organizations working to strengthen
            communities across Chicago.
          </p>

          <div className="flex flex-col gap-6">
            {partnerOrgs.map((org) => (
              <PartnerOrgCard key={org.id} org={org} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerOrgsSection;
