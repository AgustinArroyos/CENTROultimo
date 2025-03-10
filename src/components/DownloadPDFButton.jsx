import React from 'react';

const DownloadPDFButton = ({ fileUrl, buttonText }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileUrl.split('/').pop(); // Esto asume que la URL termina en el nombre del archivo
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            className="px-7 py-2 bg-brandPrimary text-white rounded hover:bg-neutralDGrey w-1/2"
            onClick={handleDownload}
        >
            {buttonText}
        </button>
    );
};

export default DownloadPDFButton;
