import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <section id="pricing" className="overflow-hidden pb-20 pt-15 lg:pb-25 xl:pb-30">
    <div className="text-gray-800 dark:text-gray-200 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>
        <p className="text-base leading-relaxed mb-8">
          At <span className="font-semibold">FiftyFiveSeconds</span>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-base leading-relaxed">
            We collect the following types of information when you use our website:  
          </p>
          <ul className="list-disc list-inside text-base leading-relaxed mt-4">
            <li>Your email address, submitted when you request our services.</li>
            <li>The video link provided for processing.</li>
            <li>Analytics data to improve the performance and user experience of our website.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="text-base leading-relaxed">
            The information we collect is used to:  
          </p>
          <ul className="list-disc list-inside text-base leading-relaxed mt-4">
            <li>Process your video requests and provide the requested services.</li>
            <li>Send notifications and updates about the status of your videos.</li>
            <li>Improve our services and website functionality.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
          <p className="text-base leading-relaxed">
            We do not share your personal information with third parties except:  
          </p>
          <ul className="list-disc list-inside text-base leading-relaxed mt-4">
            <li>When required by law or to comply with legal obligations.</li>
            <li>To protect the rights, property, or safety of our users and business.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="text-base leading-relaxed">
            We implement appropriate technical and organizational measures to safeguard your personal information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="text-base leading-relaxed">
            You have the right to:  
          </p>
          <ul className="list-disc list-inside text-base leading-relaxed mt-4">
            <li>Request access to the personal data we hold about you.</li>
            <li>Request corrections to inaccurate or incomplete data.</li>
            <li>Request deletion of your data, subject to legal obligations.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">6. Changes to This Privacy Policy</h2>
          <p className="text-base leading-relaxed">
            We may update this Privacy Policy from time to time. The latest version will always be available on this page. Continued use of our website indicates acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="text-base leading-relaxed">
            If you have any questions or concerns about this Privacy Policy, feel free to contact us at{" "}
            <a
              href="mailto:[contact@fiftyfiveseconds.com]"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              contact@fiftyfiveseconds.com
            </a>
            .
          </p>
        </section>

        <p className="text-sm text-center mt-8">
          Last updated: 5th Dec 2024
        </p>
      </div>
    </div>
    </section>
  );
};

export default PrivacyPolicy;
