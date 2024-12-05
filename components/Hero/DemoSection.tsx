import React from "react";

const DemoSection: React.FC = () => {
  // Array of demo videos with original and reel YouTube links
  const demoVideos = [
    { original: "https://www.youtube.com/embed/K6xWx2Uy5mw", reel: "https://www.youtube.com/embed/cCR7Z6GaO0g" },
    { original: "https://www.youtube.com/embed/ISIBRtNCaZw?si=ZNQUxuw_YnVEwGZ_", reel: "https://youtube.com/embed/ZZGD9cKXKFI" },
    { original: "https://www.youtube.com/embed/CSZ7GQ5zxQU?si=QIGyh7zuwNIPM9gW", reel: "https://www.youtube.com/embed/eArpCLECwOU" },
    { original: "https://www.youtube.com/embed/DTYhTJowQBA?si=nOhJdwLNiFLiAR3T", reel: "https://www.youtube.com/embed/zcXXjmCvjj8" },
  ];

  return (
    <section className="py-12 mt-22 px-6">
    <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">
          Demo Videos
        </h2>
        <div className="space-y-8">
          {demoVideos.map((video, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
            >
              {/* Original Video */}
              <div className="w-full">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Original Video
                </h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-full rounded-lg shadow-md"
                    src={video.original}
                    title={`Original Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Arrow Column */}
              <div className="flex md:justify-center items-center">
              <div className="text-gray-700 dark:text-gray-300 text-8xl font-bold transform rotate-90 md:rotate-0">
              →
                </div>
              </div>

              {/* Reel Video */}
              <div className="w-full">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reel Video
                </h3>
                <div className="relative w-full">
                
                  {/* Reel Video Container */}
                  <div className="w-40 h-72 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                    <iframe
                      className="w-full h-full "
                      src={video.reel}
                      title={`Reel Video ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
