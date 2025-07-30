import React, { useState } from "react";

const GallerySection = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const photos = Array.from({ length: 23 }, (_, i) => `/gallery/photo${i + 1}.jpg`);
  const videos = Array.from({ length: 10 }, (_, i) => `/gallery/video${i + 1}.mp4`);

  const closeOverlay = () => setSelectedMedia(null);

  return (
    <section className="min-h-screen bg-white py-16 px-4" id="galerie">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">Galerie</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Photo ${index + 1}`}
              className="rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300 w-full h-60 object-cover"
              onClick={() => setSelectedMedia({ type: "image", src })}
            />
          ))}
          {videos.map((src, index) => (
            <video
              key={index}
              src={src}
              className="rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300 w-full h-60 object-cover"
              onClick={() => setSelectedMedia({ type: "video", src })}
              muted
              autoPlay
              loop
            />
          ))}
        </div>
      </div>

      {/* Overlay (lightbox) */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4"
          onClick={closeOverlay}
        >
          {selectedMedia.type === "image" ? (
            <img src={selectedMedia.src} alt="Media" className="max-h-[90vh] max-w-[90vw]" />
          ) : (
            <video
              src={selectedMedia.src}
              controls
              autoPlay
              className="max-h-[90vh] max-w-[90vw]"
            />
          )}
        </div>
      )}
    </section>
  );
};

export default GallerySection;
