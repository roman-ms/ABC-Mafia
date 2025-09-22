import React from "react";

const PartnerOrgCard = ({ org }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
      <div className="flex flex-col space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">{org.name}</h3>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
            {org.type}
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
            {org.focus}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-gray-600">
          {org.description}
        </p>

        <a
          href={org.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
        >
          Visit Website
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default PartnerOrgCard;
