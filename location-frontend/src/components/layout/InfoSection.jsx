import rulesByType from "../../data/rulesByType";

const InfoSection = () => {
  return (
    <section className="my-8 rounded-3xl bg-green-700 px-4 py-12 text-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-sunshine font-display mb-6 text-center text-4xl font-bold">
          What is this?
        </h2>
        <p className="mb-12 text-center">
          Care Cubby is a supply-based mutual aid system where each location is
          categorized by a letter, and you can pick/supplies based on the letter
          category for free. The ultimate goal of this project is to create a
          centralized hub for people to find /trade the goods they need to
          survive and thrive, and connect people to community centers and local
          orgs/businesses they may not know about otherwise. This project is run
          primarily by queer run grassroots orgs who are driven to create a
          kinder and more supportive world through the work they do. You can
          support this project by spreading the word, donating, or submitting to
          be a cubby location!
        </p>

        {/* Rules section */}
        <div className="mx-auto max-w-6xl space-y-8">
          {["A", "B", "C"].map((label, index) => {
            const rules = rulesByType[label];
            const word = rules.word;
            return (
              <div
                key={index}
                className="relative flex items-start rounded-xl bg-gray-100 p-6 pl-24 text-green-700 shadow-md"
              >
                {/* Circle with image */}
                <div className="absolute -left-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-blue-500 shadow-lg">
                  <img
                    src={`./${label}.PNG`}
                    alt={`Logo ${label}`}
                    className="h-20 w-20 object-contain"
                  />
                </div>

                {/* Box content */}
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {label} - {word}
                  </h3>
                  <p className="mb-4 text-gray-700">{rules.description}</p>
                  <div className="mb-2">
                    <h4 className="font-medium text-green-700">Do:</h4>
                    <ul className="list-inside list-disc text-gray-700">
                      {rules.dos.map((doItem, i) => (
                        <li key={`do-${i}`}>{doItem}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-700">Don't:</h4>
                    <ul className="list-inside list-disc text-gray-700">
                      {rules.donts.map((dontItem, i) => (
                        <li key={`dont-${i}`}>{dontItem}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
