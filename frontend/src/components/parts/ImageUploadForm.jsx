
import React,{ useState,useRef } from "react";

const ImageUploadForm = () => {
  const [images, setImages] = useState(new Array(4).fill(null));
  const [previewImages, setPreviewImages] = useState(new Array(4).fill(null));
  const inputRefs = useRef(new Array(4).fill(null).map(() => React.createRef()));

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      // Update state with the selected image
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = file;
        return updatedImages;
      });

      // Update preview images for display
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prevPreviews) => {
          const updatedPreviews = [...prevPreviews];
          updatedPreviews[index] = reader.result;
          return updatedPreviews;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = null;
      return updatedImages;
    });

    setPreviewImages((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews[index] = null;
      return updatedPreviews;
    });

    // Reset the file input to allow selecting the same file again
    if (inputRefs.current && inputRefs.current[index] && inputRefs.current[index].current) {
      inputRefs.current[index].current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your logic to handle the submitted images
    console.log("Submitted Images:", images);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Upload Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                ref={inputRefs.current[index]}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                onChange={(e) => handleImageChange(e, index)}
              />
              <div className="bg-gray-200 h-32 flex items-center justify-center relative">
                {previewImages[index] && (
                  <>
                    <img
                      src={previewImages[index]}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-red-500"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Remove
                    </button>
                  </>
                )}
                {!previewImages[index] && (
                  <span className="text-gray-600">Select Image</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ImageUploadForm;
