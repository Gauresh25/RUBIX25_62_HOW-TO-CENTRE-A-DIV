import React from "react";
import { QRCodeSVG } from "qrcode.react";

const VRMuseumQRCode = () => {
  const vrMuseumUrl = "https://1bdc-110-226-183-3.ngrok-free.app/dummy.html";
  const historyMuseumUrl = "https://1bdc-110-226-183-3.ngrok-free.app/vr.html";

  return (
    <div className="fixed inset-0 top-14 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* VR Museum QR */}
        <div className="bg-white p-6 rounded-xl shadow-2xl text-center transform hover:scale-105 transition-transform duration-300">
          <QRCodeSVG
            value={vrMuseumUrl}
            size={250}
            level={"H"}
            className="mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Virtual Time Travel
          </h1>
          <p className="text-gray-600 mb-4">
            Scan to begin your VR journey back in time, go back to meet Rani Lakshmibai
          </p>
          <span className="text-sm text-gray-500">Experience history in VR</span>
        </div>

        {/* History Museum QR */}
        <div className="bg-white p-6 rounded-xl shadow-2xl text-center transform hover:scale-105 transition-transform duration-300">
          <QRCodeSVG
            value={historyMuseumUrl}
            size={250}
            level={"H"}
            className="mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            History Museum Tour
          </h1>
          <p className="text-gray-600 mb-4">
            Explore our virtual history museum
          </p>
          <span className="text-sm text-gray-500">Discover artifacts and stories</span>
        </div>
      </div>
    </div>
  );
};

export default VRMuseumQRCode;