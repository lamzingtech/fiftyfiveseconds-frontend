
import SectionHeader from "@/components/Common/SectionHeader";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Us - FiftyFiveSeconds ",
  description: "About FiftyFiveSeconds",
  // other metadata
};
const AboutUs = () => {
  return (
    <>
      <section id="about-us" className="py-20 lg:py-25 xl:py-30">
        {/* <div className="mx-auto max-w-c-1280 px-4 md:px-8 xl:px-0">
        
          <div className="animate_top mx-auto text-center">
            <SectionHeader
              headerInfo={{
                title: `ABOUT US`,
                subtitle: `Get to Know Us`,
                description: `At FiftyFiveSeconds, we're committed to making knowledge more accessible and saving time for everyone in the digital age. We believe in the power of video, enhanced by AI.`,
              }}
            />
          </div>
        </div> */}

        {/* Content Section */}
        <div className="text-gray-800 dark:text-gray-200 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-lg text-center mb-8">
          Welcome to <span className="font-semibold">FiftyFiveSecs</span>
        </p>
        <section className="mb-10"><p className="text-base leading-relaxed">At FiftyFiveSecs, we help transform long-form videos into short, impactful reels that capture the essence of your content. Our goal is to deliver professionally edited, engaging videos that resonate with your audience and save you time.</p></section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-base leading-relaxed">
            We aim to make video content creation easy and accessible, helping
            creators and businesses effectively communicate their ideas in a
            concise and captivating way.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-base leading-relaxed">
            <li>Engaging Video Summaries: Short, impactful reels.</li>
            <li>Professional Editing: Highlighting your content’s best moments.</li>
            <li>Seamless Delivery: Ready-to-share videos.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-base leading-relaxed">
            <li>Quality First: High-quality, tailored videos.</li>
            <li>Customer-Focused: Personalized support for your needs.</li>
            <li>Time-Saving Solutions: Hassle-free, impactful content creation.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Let’s Work Together</h2>
          <p className="text-base leading-relaxed mb-6">
            Whether you’re a content creator, educator, or professional,{" "}
            <span className="font-semibold">FiftyFiveSecs</span> is here to help you stand out with engaging video summaries.
          </p>
          <p className="text-base leading-relaxed">
            Have questions or need assistance? Reach out to us at{" "}
            <a
              href="mailto:[contact@fiftyfiveseconds.com]"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              contact@fiftyfiveseconds.com
            </a>{" "}
            or visit{" "}
            <a
              href="https://www.fiftyfiveseconds.com"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              www.fiftyfiveseconds.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
      </section>
    </>
  );
};

export default AboutUs;
