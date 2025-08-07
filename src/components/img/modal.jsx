import React, { useState } from "react";

export default function ImageWithModal({ src, alt }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Imagen pequeña o thumbnail */}
      <img
        src={src}
        alt={alt}
        style={{ cursor: "pointer", maxWidth: "200px" }}
        onClick={openModal}
      />

      {/* Modal */}
      {isOpen && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              maxHeight: "90%",
              maxWidth: "90%",
              boxShadow: "0 0 10px white",
            }}
            onClick={e => e.stopPropagation()} // Para que no cierre al click dentro de la imagen
          />
        </div>
      )}
    </>
  );
}
