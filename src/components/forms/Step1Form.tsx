/** @format */

"use client";

import { useFormContext } from "@/context/FormContext";
import { useState, ChangeEvent, FormEvent } from "react";

const ActivityDetailsForm = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [selectedCategory, setSelectedCategory] = useState(
    formData.step1?.category || ""
  );
  const [selectedActivityType, setSelectedActivityType] = useState(
    formData.step1?.activityType || "Indoor"
  );
  const [selectedLocation, setSelectedLocation] = useState(
    formData.step1?.locationType || ""
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.step1?.activityName) {
      errors.activityName = "Please provide an activity name";
    }
    if (!formData.step1?.category) {
      errors.category = "Please select a category";
    }
    if (!formData.step1?.activityDescription) {
      errors.activityDescription = "Description is required";
    }
    if (!formData.step1?.activityType) {
      errors.activityType = "Please select an activity type";
    }
    if (!formData.step1?.locationType) {
      errors.locationType = "Please select a location type";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setCurrentStep(2);
  };

  const handleInputChange = (key: string, value: string) => {
    updateFormData("step1", { [key]: value });
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === "") {
      updateFormData("step1", { [e.target.name]: value });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-6 max-w-lg space-y-6 bg-white  mt-14 border-l mb-4">
      <h2 className="text-lg font-bold">Activity Details</h2>

      {/* Activity Name */}
      <div className=" ">
        <label className="block font-medium mb-1 text-xs">
          Activity Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Eg: Cooking class in Palo Alto"
          value={formData.step1?.activityName || ""}
          onChange={(e) => handleInputChange("activityName", e.target.value)}
          className="w-full px-4 py-2 border rounded-full text-xs"
          required
        />
        {formErrors.activityName && (
          <p className="text-red-500 text-xs mt-1">{formErrors.activityName}</p>
        )}
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Select the best category to describe your activity{" "}
          <span className="text-red-500">*</span>
        </label>
        {[
          "Adventure & Games",
          "Creative Expression",
          "Food & Drink",
          "Learning & Development",
          "Sports and Fitness",
          "Volunteering",
          "Other",
        ].map((category) => (
          <div
            key={category}
            className="flex items-center space-x-2 mb-2 text-xs">
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={() => {
                setSelectedCategory(category);
                handleInputChange("category", category);
              }}
              className="h-[14px] w-[14px]"
              required
            />
            <span>{category}</span>
          </div>
        ))}
        {selectedCategory === "Other" && (
          <input
            type="text"
            placeholder="Specify the category"
            className="px-4 py-2 border rounded-full text-xs w-full mt-2"
            onChange={(e) => handleInputChange("otherCategory", e.target.value)}
            value={formData.step1?.otherCategory || ""}
          />
        )}
        {formErrors.category && (
          <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>
        )}
      </div>

      {/* About the Activity */}
      <div>
        <label className="block font-medium mb-1 text-sm">
          About the Activity <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Activity Description"
          className="w-full px-4 py-2 border rounded-lg h-36 text-xs"
          value={formData.step1?.activityDescription || ""}
          onChange={(e) =>
            handleInputChange("activityDescription", e.target.value)
          }
          required
        />
        {formErrors.activityDescription && (
          <p className="text-red-500 text-xs mt-1">
            {formErrors.activityDescription}
          </p>
        )}
      </div>

      {/* Activity Type */}
      <div>
        <label className="block font-medium mb-1 text-sm">
          Please select the activity type{" "}
          <span className="text-red-500">*</span>
        </label>
        {["Indoor", "Outdoor", "Virtual"].map((type) => (
          <div key={type} className="flex items-center space-x-2 text-xs mb-2">
            <input
              type="radio"
              name="activityType"
              value={type}
              checked={selectedActivityType === type}
              onChange={() => {
                setSelectedActivityType(type);
                handleInputChange("activityType", type);
              }}
              className="h-4 w-4 text-xs"
              required
            />
            <span>{type}</span>
          </div>
        ))}
        {formErrors.activityType && (
          <p className="text-red-500 text-xs mt-1">{formErrors.activityType}</p>
        )}
      </div>

      {/* Location Type */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Please select the type of location{" "}
          <span className="text-red-500">*</span>
        </label>
        {["Provider Location", "User Location"].map((location) => (
          <div
            key={location}
            className="flex items-center space-x-2 text-xs mb-2">
            <input
              type="radio"
              name="locationType"
              value={location}
              checked={selectedLocation === location}
              onChange={() => {
                setSelectedLocation(location);
                handleInputChange("locationType", location);
              }}
              className="h-4 w-4"
              required
            />
            <span>{location}</span>
          </div>
        ))}
        {formErrors.locationType && (
          <p className="text-red-500 text-xs mt-1">{formErrors.locationType}</p>
        )}
      </div>

      {/* Members Count */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block font-medium mb-1 text-sm">
            How many members can take part in the activity?{" "}
            <span className="text-red-500">*</span>
          </label>
        </div>

        <div>
          <input
            type="number"
            name="minMembers"
            placeholder="Minimum Members"
            className="px-4 py-2 border rounded-full text-xs w-full h-9"
            value={formData.step1?.minMembers || ""}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <input
            type="number"
            name="maxMembers"
            placeholder="Maximum Members"
            className="px-4 py-2 border rounded-full text-xs w-full h-9"
            value={formData.step1?.maxMembers || ""}
            onChange={handleNumberChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-44 bg-[#001D44] text-white py-2 rounded-full text-sm font-semibold hover:bg-[#001D44]/80">
        Save and Continue
      </button>
    </form>
  );
};

export default ActivityDetailsForm;
