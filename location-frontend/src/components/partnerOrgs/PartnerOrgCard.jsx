import React, { useState } from "react";

const PartnerOrgCard = ({ org }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate description to show only first 150 characters
  const truncatedDescription =
    org.description.length > 150
      ? org.description.substring(0, 150) + "..."
      : org.description;

  const shouldShowExpandButton = org.description.length > 150;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
      <div className="flex h-full space-x-4">
        {/* Image Circle */}
        <div className="flex-shrink-0">
          <div className="h-32 w-32 overflow-hidden rounded-full">
            <img
              src={`/partner-orgs/${org.id}.png`}
              alt={`${org.name} logo`}
              className="h-full w-full object-cover"
              onLoad={() =>
                console.log(`Image loaded: /partner-orgs/${org.id}.png`)
              }
              onError={(e) => {
                console.log(
                  `Image failed to load: /partner-orgs/${org.id}.png`,
                );
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="hidden h-full w-full items-center justify-center bg-gray-100 text-gray-400"
              style={{ display: "none" }}
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col space-y-3">
          <h3 className="text-xl font-semibold text-gray-800">{org.name}</h3>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
              {org.type}
            </span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
              {org.focus}
            </span>
          </div>

          {/* Description with expand/collapse */}
          <div className="flex-1">
            <p className="text-sm leading-relaxed text-gray-600">
              {isExpanded ? org.description : truncatedDescription}
            </p>

            {shouldShowExpandButton && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 flex items-center text-xs text-gray-400 transition-colors duration-200 hover:text-gray-600"
              >
                {isExpanded ? "Less" : "More"}
                <svg
                  className={`ml-1 h-2 w-2 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>

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
    </div>
  );
};

export default PartnerOrgCard;
