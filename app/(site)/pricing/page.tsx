
import Image from "next/image";
import SectionHeader from "@/components/Common/SectionHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - FiftyFiveSeconds ",
  description: "Pricing - FiftyFiveSeconds",
  // other metadata
};
const Pricing = () => {
  return (
    <>
      {/* <!-- ===== Pricing Table Start ===== --> */}
      <section id="pricing" className="overflow-hidden pb-20 pt-15 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <div className="animate_top mx-auto text-center mt-15">
            <SectionHeader
              headerInfo={{
                title: `PRICING PLANS`,
                subtitle: `Simple Pricing`,
                description: `Choose a plan that fits your needs, whether you're a casual user or a business.`,
              }}
            />
          </div>
          {/* <!-- Section Title End --> */}
        </div>

        <div className="relative mx-auto mt-15 max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="absolute -bottom-15 -z-1 h-full w-full">
            <Image
              fill
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-7.5 lg:flex-nowrap xl:gap-12.5">
            {/* Free Tier */}
            <div className="animate_top group relative rounded-lg border border-stroke bg-white p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none md:w-[45%] lg:w-1/3 xl:p-12.5">
              <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white">Free Plan</h3>
              <h4 className="mb-2.5 font-medium text-black dark:text-white">Free/Demo Video</h4>
              <p>Limited usage per month, access to summaries video only, limited support.</p>
              <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
                <ul className="list-disc">
                  <li>1 video summary (20 to 30 mins full video to 40 secs to 55 secs reels conversion)</li>
                  <li>Access to only demo video</li>
                  {/* <li>Limited support and features</li> */}
                </ul>
              </div>
            </div>

            {/* Basic Plan */}
            <div className="animate_top group relative rounded-lg border border-stroke bg-white p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none md:w-[45%] lg:w-1/3 xl:p-12.5">
              <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white">Basic Plan</h3>
              <h4 className="mb-2.5 font-medium text-black dark:text-white">$177 <span>per 10 videos</span> or $340 <span>per 20 videos</span></h4>
              <p>Ideal for frequent users who need short video summaries with text download support.</p>
              <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
                <ul className="list-disc">
                  
                 
                  <li>User customization in every video</li>
                  <li>Standard support</li>
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            {/* <div className="animate_top group relative rounded-lg border border-stroke bg-white p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none md:w-[45%] lg:w-1/3 xl:p-12.5">
              <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white">$9.99 <span>/month</span> or $99.99 <span>/year</span></h3>
              <h4 className="mb-2.5 font-medium text-black dark:text-white">Pro Plan</h4>
              <p>Perfect for power users needing frequent, longer summaries with advanced features.</p>
              <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
                <ul>
                  <li>Unlimited summaries (up to 2 hours each)</li>
                  <li>Customizable summary detail levels</li>
                  <li>Text and PDF download options</li>
                  <li>Priority support</li>
                  <li>Access to additional languages</li>
                </ul>
              </div>
            </div> */}

            {/* Enterprise Plan */}
            <div className="animate_top group relative rounded-lg border border-stroke bg-white p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none md:w-[45%] lg:w-1/3 xl:p-12.5">
              <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white">Custom Pricing</h3>
              <h4 className="mb-2.5 font-medium text-black dark:text-white">Enterprise Plan</h4>
              <p>Best for businesses requiring large-scale summarization or for any specific requirements</p>
              <div className="mt-2 border-t border-stroke pb-2 pt-2 dark:border-strokedark">
              <p>Email us at contact@fiftyfiveseconds.com</p>
              </div>
              <div className="mt-2 border-t border-stroke pb-2 pt-2 dark:border-strokedark">
                <ul className="list-disc">
                  <li>Will cover all features of Basic plan</li>
                {/* <li>User customization in every video</li> */}
                  {/* <li>Unlimited summaries, any length</li>
                  <li>User customization in every video</li> */}
                  <li>Custom branding and white-label options</li>
                  <li>Dedicated support team and onboarding</li>
                  <li>Many More</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Pricing Table End ===== --> */}
    </>
  );
};

export default Pricing;
