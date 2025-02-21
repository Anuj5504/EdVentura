import { uploadVideo } from "@/firebase/uploadVideo";
import React, { useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformations: React.FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setCourseInfo({ ...courseInfo, thumbnail: file });
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    const uploadedUrl=await uploadVideo(file);
    setCourseInfo({ ...courseInfo, videoUrl: uploadedUrl });
    console.log(uploadedUrl)
  };

  return (
    <div className=" p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl dark:text-white font-semibold text-gray-800 mb-4">Course Information</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block dark:text-white text-gray-700 font-medium">Course Name</label>
          <input
            type="text"
            name="name"
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="Enter course name"
            required
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block dark:text-white text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            placeholder="Write a short course description..."
            required
            rows={3}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block dark:text-white text-gray-700 font-medium">Price ($)</label>
            <input
              type="number"
              name="price"
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="e.g., 49.99"
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block dark:text-white text-gray-700 font-medium">
              Estimated Price ($)
            </label>
            <input
              type="number"
              name="estimatedPrice"
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="e.g., 59.99"
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block dark:text-white text-gray-700 font-medium">Tags</label>
            <input
              type="text"
              name="tags"
              value={courseInfo.tags}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              placeholder="e.g., Web Dev, JavaScript"
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block dark:text-white text-gray-700 font-medium">Level</label>
            <select
              name="level"
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-gray-700 font-medium">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block dark:text-white text-gray-700 font-medium">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {thumbnailPreview && (
            <div className="mt-3">
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="w-full h-[50vh] object-cover rounded-md border"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Next Step
        </button>
      </form>
    </div>
  );
};

export default CourseInformations;
