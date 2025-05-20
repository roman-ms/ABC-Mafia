import {
  DialogBackdrop,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import rulesByType from "../../data/rulesByType.js";

export function DialogComponent({
  locations,
  selectedLocationId,
  isOpen,
  setIsOpen,
}) {
  const selectedLocation = locations.find(
    (loc) => loc._id === selectedLocationId,
  );
  const rules = selectedLocation ? rulesByType[selectedLocation.type] : null;

  // Get the embed URL for Google Maps
  const getMapEmbedUrl = (location) => {
    if (!location?.latitude || !location?.longitude) return null;
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.latitude},${location.longitude}`;
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="border-cerulean bg-cardstock relative w-full max-w-4xl space-y-4 rounded-2xl border-4 p-12 text-black">
            <button
              className="text-vermilion absolute top-4 right-4 !bg-transparent !p-2 !font-semibold hover:opacity-80"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <div className="flex flex-col-reverse items-baseline justify-center gap-4 lg:flex-row">
              <DialogTitle>
                <h3 className="text-cerulean mb-2 text-xl font-bold">
                  {selectedLocation?.name}
                </h3>
              </DialogTitle>
            </div>
            <p className="mb-2">{selectedLocation?.description}</p>

            {/* Address and Map Section */}
            {selectedLocation?.location_link && (
              <div className="mb-4 space-y-4">
                <div>
                  <h4 className="mb-1 text-lg font-semibold">Address:</h4>
                  <a
                    href={selectedLocation.location_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {selectedLocation.name}
                  </a>
                </div>

                {/* Embedded Map */}
                {selectedLocation.latitude && selectedLocation.longitude && (
                  <div className="h-[250px] w-full overflow-hidden rounded-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={getMapEmbedUrl(selectedLocation)}
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            )}

            {rules && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-green-700">
                    Do's:
                  </h4>
                  <ul className="list-inside list-disc">
                    {rules.dos.map((doItem, index) => (
                      <li key={index}>{doItem}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-red-700">
                    Don'ts:
                  </h4>
                  <ul className="list-inside list-disc">
                    {rules.donts.map((dontItem, index) => (
                      <li key={index}>{dontItem}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
