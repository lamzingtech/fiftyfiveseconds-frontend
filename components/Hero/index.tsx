"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  const [formData, setFormData] = useState({
    email: '',
    videoFile: null, // Updated for video file upload
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ status: 3, message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "video/mp4") {
      setFormData((prevData) => ({
        ...prevData,
        videoFile: file,
      }));
    } else {
      setResponseMessage({ status: 2, message: "Please upload a valid .mp4 file." });
    }
  };
  /*
    const handleSubmit = async () => {
      if (cooldown > 0) {
        setResponseMessage({ status: 2, message: `Please wait ${cooldown} seconds before submitting again.` });
        return;
      }
      if (!isValidEmail(formData.email)) {
        setResponseMessage({ status: 2, message: "Invalid email format." });
        return;
      }
      if (!formData.videoFile) {
        setResponseMessage({ status: 2, message: "Please upload a video file." });
        return;
      }
  
      setIsSubmitting(true);
      setResponseMessage({ status: 3, message: "" });
  
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("videoFile", formData.videoFile);
  
      try {
        const res = await fetch('/api/send-email', {
          method: 'POST',
          body: formDataToSend,
        });
  
        const data = await res.json();
  
        if (res.ok) {
          setResponseMessage(data);
          setFormData({ email: '', videoFile: null });
          setCooldown(240); // 4 minutes cooldown
        } else {
          setResponseMessage(data);
        }
      } catch (error) {
        console.error('Error:', error);
        setResponseMessage({ status: 2, message: 'There was an error sending your message.' });
      }
  
      setIsSubmitting(false);
    };
    */
  const handleSubmit = async () => {
    if (cooldown > 0) {
      setResponseMessage({ status: 2, message: `Please wait ${cooldown} seconds before submitting again.` });
      return;
    }

    if (!isValidEmail(formData.email)) {
      setResponseMessage({ status: 2, message: "Invalid email format." });
      return;
    }

    if (!formData.videoFile) {
      setResponseMessage({ status: 2, message: "Please upload a video file." });
      return;
    }

    setIsSubmitting(true);
    setResponseMessage({ status: 3, message: "" });

    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("videoFile", formData.videoFile);

    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/api/send-email', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        console.log(`Progress: ${progress}%`);
        setProgress(progress)
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        setResponseMessage(data);
        setFormData({ email: '', videoFile: null });
        setProgress(0)
        setCooldown(240);
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear file input
        }
      } else {
        setResponseMessage({ status: 2, message: 'Failed to upload.' });
      }
      setIsSubmitting(false);
    };

    xhr.onerror = () => {
      setResponseMessage({ status: 2, message: 'There was an error uploading the file.' });
      setIsSubmitting(false);
    };

    xhr.send(formDataToSend);
  };


  const handleConfirmSubmit = () => {
    setIsModalOpen(false);
    handleSubmit();
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 sm:pt-0 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className="md:w-1/2">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                🔥 FiftyFiveSeconds — Your Complete Reel Solution
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Transform Long Video into{" "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  a powerful Clip
                </span>
              </h1>
              <p>
                Share us a video link (10-20 minutes length) and let us create impactful reels. In a few hours, your completed reels will be ready to download or sent directly to your email.
              </p>

              <div className="mt-10">
                <form onSubmit={(e) => e.preventDefault()}>

                  <div className="flex flex-col gap-4 sm:gap-6">
                    <input
                      required
                      value={formData.email}
                      name="email"
                      onChange={handleInputChange}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />
                    <input
                      required
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      name="videoFile"
                      type="file"
                      accept="video/mp4"
                      className="w-full rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"

                    />
                    {progress > 0 && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    )}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      disabled={isSubmitting}
                      aria-label="get started button"
                      className="w-full flex items-center justify-center rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                    >
                      {isSubmitting ? "Please wait ... uploading..." : "Submit"}
                    </button>
                  </div>
                </form>
                {responseMessage.status !== 3 && (
                  <p className={`mt-4 ${responseMessage.status === 1 ? "text-green-600" : "text-red-600"}`}>
                    {responseMessage.message}
                  </p>
                )}
                <p className="mt-5 text-black dark:text-white">
                  Get a free demo reel—no credit card needed.
                </p>
              </div>

            </div>
            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute -left-11.5 top-0"
                />
                <Image
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={36.9}
                  height={36.7}
                  className="absolute bottom-0 right-0 z-10"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className=" relative aspect-[560/504] w-full">
                  <Image
                    className="dark:hidden"
                    src="/images/landing1.png"
                    alt="Hero"
                    fill
                  />
                  <Image
                    className="hidden dark:block"
                    src="/images/landing1.png"
                    alt="Hero"
                    fill
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Submission</h2>
            {/* <p className="mb-4">Once the form is submitted, you need to wait 4 minutes before submitting again.</p> */}
            <p className="mb-4">Please ensure your email and video file (mp4) are valid.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
