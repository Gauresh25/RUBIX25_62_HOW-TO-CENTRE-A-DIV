import React from "react";
import { QRCodeSVG } from "qrcode.react";

const VRMuseumQRCode = () => {
  const museumUrl = "https://salman.loca.lt/vr.html";

  return (
    <div className="fixed inset-0 top-14 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl text-center transform hover:scale-105 transition-transform duration-300">
        <QRCodeSVG
          value={museumUrl}
          size={250}
          level={"H"}
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Scan to Begin Your VR Museum Journey
        </h1>
        <p className="text-gray-600 mb-4">
          Point your device camera at the QR code
        </p>
      </div>
    </div>
  );
};

export default VRMuseumQRCode;
