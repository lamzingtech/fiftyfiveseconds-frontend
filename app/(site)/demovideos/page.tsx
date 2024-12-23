"use client"
import React, { useState } from "react";
import Image from "next/image";

const DemoSection: React.FC = () => {
    // State to control visibility of extra demoShorts
  const [showMore, setShowMore] = useState(false);

  // Toggle Show More / Show Less
  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  // Array of demo videos with original and reel YouTube links
  const demoVideos = [
    { original: "https://www.youtube.com/embed/K6xWx2Uy5mw", reel: "https://www.youtube.com/embed/cCR7Z6GaO0g" },
    ];
  const demoShorts = [
    {  reel: "https://www.youtube.com/embed/cCR7Z6GaO0g", isReel: true },
    {  reel: "https://youtube.com/embed/ZZGD9cKXKFI", isReel: true },
    {reel: "https://www.youtube.com/embed/K6xWx2Uy5mw", isReel: false},
    { reel: "https://www.youtube.com/embed/eArpCLECwOU", isReel: true },
    {  reel: "https://www.youtube.com/embed/zcXXjmCvjj8", isReel: true },
    {reel: "https://www.youtube.com/embed/K6xWx2Uy5mw", isReel: false}
  ];

  const dummyImages = [
    { src: 'https://picsum.photos/id/237/200/300', width: 300, height: 400 },
    { src: 'https://picsum.photos/seed/picsum/200/200', width: 400, height: 300 },
    { src: 'https://picsum.photos/seed/picsum/200/300', width: 300, height: 500 },
    { src: 'https://picsum.photos/seed/picsum/200/600', width: 400, height: 600 },
    { src: 'https://picsum.photos/seed/picsum/200/300', width: 500, height: 400 },
    { src: 'https://picsum.photos/seed/picsum/200/300', width: 350, height: 450 },
  ];

  const dummyVideos = [
    { id: 'cCR7Z6GaO0g', width: 300, height: 550 },
    { id: 'ZZGD9cKXKFI', width: 300, height: 300 },
    { id: 'K6xWx2Uy5mw', width: 300, height: 300 },
    { id: 'eArpCLECwOU', width: 400, height: 600 },
    { id: 'zcXXjmCvjj8', width: 200, height: 400 },
    { id: 'K6xWx2Uy5mw', width: 350, height: 350 },
  ];

  return (
    <section id="pricing" className="overflow-hidden pb-20 pt-35 lg:pb-25 xl:pb-30 px-4 sm:px-6 md:px-8">

   <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">
          Demo Videos
        </h2>
        <div className="space-y-8">
          {demoVideos.map((video, index) => (
           <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
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
           <div className="flex justify-center items-center md:col-span-1 flex-col space-y-2">
             <div className="text-gray-700 dark:text-gray-300 text-6xl font-bold transform rotate-90 md:rotate-0">
               →
             </div>
           </div>
         
           {/* Reel Video */}
           <div className="w-full flex justify-center">
             <div className="w-40 h-72 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
               <iframe
                 className="w-full h-full"
                 src={video.reel}
                 title={`Reel Video ${index + 1}`}
                 frameBorder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               ></iframe>
             </div>
           </div>
         </div>
         
          ))}
        </div>
      


          {/* Show More Button */}
          {!showMore && (
            <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">

            <div className="animate_top mx-auto text-center mt-15 flex justify-center items-center">
              <button onClick={handleShowMore} className="flex items-center rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                Show More
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                  <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          )}

        
          {/* Show More Videos in Grid (Pinterest Style) */}
          {showMore && (
            <>
           

            {/* <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Pinterest Style Gallery</h1>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {dummyImages.map((image, index) => (
          <div key={index} className="break-inside-avoid">
            <Image
              src={image.src}
              alt={`Dummy Image ${index + 1}`}
              width={image.width}
              height={image.height}
              className="rounded-lg w-full object-cover"
              style={{ aspectRatio: `${image.width} / ${image.height}` }}
            />
          </div>
        ))}
      </div>
    </div> */}

    <div className="min-h-screen p-4 mt-20">
      {/* <h1 className="text-3xl font-bold text-center mb-8">Video Gallery</h1> */}
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">
      Video Gallery
        </h2>
      <div className="sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-20">
        {dummyVideos.map((video, index) => (
          <div key={index} className="break-inside-avoid">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}`}
              title={`YouTube Video ${index + 1}`}
              width={video.width}
              height={video.height}
              style={{ aspectRatio: '16/9' }}
              className="rounded-lg w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
            </>
          )}

      </div>
    </section>
  );
};

export default DemoSection;
