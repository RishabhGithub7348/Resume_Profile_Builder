// ImageUpload.tsx
import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  onChange: (imageUrl: string) => void;
}

const uploadPreset = "tffpd7m4";

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const handleUpload = useCallback((result:any) => {
    if (result.info) {
      onChange(result.info.secure_url);
    }
  }, [onChange]);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => (
        <div onClick={() => open?.()}>
          <div className="w-[88] flex items-center justify-center shadow-md border p-4 h-[19px] rounded-[88px] bg-[#F0EFFA]">
            <button>Upload Profile</button>
          </div>
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
