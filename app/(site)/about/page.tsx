"use client";
import SectionHeader from "@/components/Common/SectionHeader";

const AboutUs = () => {
  return (
    <>
      <section id="about-us" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1280 px-4 md:px-8 xl:px-0">
          {/* Section Title */}
          <div className="animate_top mx-auto text-center">
            <SectionHeader
              headerInfo={{
                title: `ABOUT US`,
                subtitle: `Get to Know Us`,
                description: `At FiftyFiveSeconds, we're committed to making knowledge more accessible and saving time for everyone in the digital age. We believe in the power of video, enhanced by AI.`,
              }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="relative mx-auto mt-15 max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="rounded-lg bg-white dark:bg-blacksection p-7.5 shadow-solid-10 dark:shadow-none">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-5">
              Welcome to FiftyFiveSeconds – Your Go-To Solution for Video Summarization
            </h3>
            <p className="text-black dark:text-manatee leading-relaxed mb-8">
              We're a team of tech enthusiasts, content curators, and AI innovators dedicated to transforming how people engage with video content. With so much available online, it can be challenging to watch it all and create concise, shareable clips. That's where we come in.
            </p>

            <h4 className="text-xl font-semibold text-primary dark:text-manatee mb-4">
              What We Do
            </h4>
            <p className="text-black dark:text-manatee leading-relaxed mb-8">
              FiftyFiveSeconds’s technology uses advanced AI to create concise, accurate summaries of YouTube videos. Our platform lets users understand complex information quickly and even create short-form content like reels from long videos without hours of editing.
            </p>

            <h4 className="text-xl font-semibold text-primary dark:text-manatee mb-4">
              Our Mission
            </h4>
            <p className="text-black dark:text-manatee leading-relaxed mb-8">
              Our mission is to make knowledge more accessible and save users valuable time. We’re committed to developing tools that help you consume content faster, smarter, and more efficiently.
            </p>

            <h4 className="text-xl font-semibold text-primary dark:text-manatee mb-4">
              Our Values
            </h4>
            <ul className="list-disc list-inside space-y-4 text-black dark:text-manatee">
              <li><strong>Efficiency:</strong> Save time without sacrificing quality.</li>
              <li><strong>Accuracy:</strong> Deliver clear, concise video summaries that capture the essence of each video.</li>
              <li><strong>Accessibility:</strong> Make video insights available to everyone, anytime.</li>
            </ul>

            <div className="mt-10">
              <h4 className="text-xl font-semibold text-primary dark:text-manatee mb-4">
                Join Us on This Journey
              </h4>
              <p className="text-black dark:text-manatee leading-relaxed">
                As we continue to grow, we’re committed to evolving our technology to meet your needs. Thank you for being a part of our journey to make video content easier and more enjoyable to consume.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
