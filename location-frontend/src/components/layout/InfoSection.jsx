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

        {/* Donate Button */}
        <div className="mb-12 flex justify-center">
          <a
            href="https://ko-fi.com/carecubby#payment-widget"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-vermilion hover:bg-vermilion/90 inline-block rounded-full px-6 py-2 font-semibold !text-white transition-colors duration-200"
          >
            Donate
          </a>
        </div>

        {/* Rules of Conduct */}
        <div className="mb-12 rounded-xl bg-white/10 p-6">
          <h3 className="text-sunshine font-display mb-4 text-center text-2xl font-bold">
            Rules of Conduct
          </h3>
          <ul className="list-disc space-y-2 pl-4 text-sm">
            <li className="pl-1">
              Be respectful of cubby locations and their hours, codes of
              conduct, and fellow patrons, and support their business or org
              directly if you can do so!
            </li>
            <li className="pl-1">
              If you are in a cubby location, please submit a photo of your
              cubby location every 6 months to ensure that it's still in good
              condition with supplies.
            </li>
            <li className="pl-1">
              Since most locations will have fairly small storage units, larger
              donations should be processed by contacting the admin of the cubby
              by emailing (carecubbychicago@gmail.com).
            </li>
            <li className="pl-1">
              Don't leave a mess when taking or donating things to the cubbies.
            </li>
            <li className="pl-1">
              Do not donate any dangerous (sharp, biohazardous, or
              malfunctioning) materials or items in unusably poor conditions to
              care cubbies. We care about helping find stuff for a new home, but
              some things belong in the trash. Check each individual letter
              category for more specific details on what are acceptable
              donations.
            </li>
            <li className="pl-1">
              Check the location's additional info section to see the location's
              hours, accessibility, and if they are trading any other items.
            </li>
          </ul>
        </div>

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
                    <h4 className="font-medium text-green-700">Accepted:</h4>
                    <ul className="list-inside list-disc text-gray-700">
                      {rules.accepted.map((item, i) => (
                        <li key={`accepted-${i}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-700">Not Accepted:</h4>
                    <ul className="list-inside list-disc text-gray-700">
                      {rules.notAccepted.map((item, i) => (
                        <li key={`notAccepted-${i}`}>{item}</li>
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
