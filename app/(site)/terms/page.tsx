import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <section id="pricing" className="overflow-hidden pb-20 pt-15 lg:pb-25 xl:pb-30">
    
   <div className=" text-gray-800 dark:text-gray-200 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Terms and Conditions</h1>
        <p className="text-base leading-relaxed mb-8">
          Welcome to <span className="font-semibold">FiftyFiveSeconds</span>. By accessing or using our website, you agree to comply with the following terms and conditions. Please read them carefully.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">1. Use of the Website</h2>
          <p className="text-base leading-relaxed">
            You agree to use our website only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the website. Unauthorized use or misuse of the website is strictly prohibited.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">2. User Content</h2>
          <p className="text-base leading-relaxed">
            Any content you submit to our platform must not violate intellectual property rights or be offensive, defamatory, or harmful. We reserve the right to remove any content that breaches these terms.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <p className="text-base leading-relaxed">
            All content on this website, including text, graphics, and logos, is the property of <span className="font-semibold">FiftyFiveSeconds</span>. Unauthorized use of this content is prohibited.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">4. Privacy Policy</h2>
          <p className="text-base leading-relaxed">
            Your privacy is important to us. Please refer to our <a href="/privacy-policy" className="text-blue-500 hover:underline dark:text-blue-400">Privacy Policy</a> for details on how we collect, use, and protect your personal information.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p className="text-base leading-relaxed">
            <span className="font-semibold">FiftyFiveSeconds</span> is not liable for any direct, indirect, or consequential damages arising from the use of this website or the services provided.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">6. Changes to the Terms</h2>
          <p className="text-base leading-relaxed">
            We reserve the right to update these terms and conditions at any time. Continued use of the website after changes are posted constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="text-base leading-relaxed">
            If you have any questions about these terms, please contact us at{" "}
            <a href="mailto:[contact@fiftyfiveseconds.com]" className="text-blue-500 hover:underline dark:text-blue-400">
              contact@fiftyfiveseconds.com
            </a>
            .
          </p>
        </section>

        <p className="text-sm text-center mt-8">
          Last updated: 5th Dec 2025
        </p>
      </div>
    </div>
    </section>
  );
};

export default TermsAndConditions;
