import {
  DialogBackdrop,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import rulesByType from "../data/rulesByType";

export function DialogComponent({
  locations,
  selectedLocationId,
  isOpen,
  setIsOpen,
}) {
  const selectedLocation = locations.find((loc) => loc._id === selectedLocationId);
  const rules = selectedLocation ? rulesByType[selectedLocation.type] : null;

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="border-cerulean text-black bg-cardstock max-w-lg space-y-4 rounded-2xl border-4 p-12">
            <div className="flex flex-col-reverse lg:flex-row items-baseline justify-center gap-4">
              <DialogTitle>
                <h3 className="mb-2 text-xl font-bold text-cerulean">
                  {selectedLocation?.name}
                </h3>
              </DialogTitle>

              <button
                className="!p-2 !bg-transparent underline !font-semibold text-vermilion"
                onClick={() => setIsOpen(false)}
              >
                close
              </button>
            </div>
            <p className="mb-2 ">
              {selectedLocation?.description}
            </p>

            {rules && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">Do's:</h4>
                  <ul className="list-disc list-inside">
                    {rules.dos.map((doItem, index) => (
                      <li key={index}>{doItem}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Don'ts:</h4>
                  <ul className="list-disc list-inside">
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
