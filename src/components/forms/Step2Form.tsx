/** @format */

"use client";
import { useFormContext } from "@/context/FormContext";
import { ChangeEvent, useState } from "react";

const LocationContactForm = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    updateFormData("step2", { [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    // Step 1 validation
    const step1Valid =
      formData.step1?.activityName &&
      formData.step1?.category &&
      formData.step1?.activityDescription &&
      formData.step1?.activityType &&
      formData.step1?.locationType;

    // Step 2 validation
    if (!formData.step2?.addressLine1) {
      errors.addressLine1 = "Street address is required";
    }
    if (!formData.step2?.zipCode) {
      errors.zipCode = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.step2.zipCode)) {
      errors.zipCode = "Invalid ZIP code format";
    }
    if (!formData.step2?.city) {
      errors.city = "City is required";
    }
    if (!formData.step2?.state) {
      errors.state = "Please select a state";
    }
    if (!formData.step2?.contactNumber) {
      errors.contactNumber = "Phone number is required";
    } else if (formData.step2.contactNumber.replace(/\D/g, "").length < 10) {
      errors.contactNumber = "Invalid phone number (10 digits required)";
    }

    if (!step1Valid) {
      setCurrentStep(1);
    } else if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="px-6 max-w-lg bg-white  border-l  flex flex-col items-center justify-center  mt-20">
        <div className="flex items-center justify-center rounded-full bg-[#DCE2FF] p-1 mb-4">
          <img src="/submitted.png" alt="check" className="w-16 h-16" />
        </div>

        <h2 className="text-lg font-semibold">Form Submitted</h2>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="px-6 max-w-lg space-y-6 bg-white mt-14 border-l mb-4">
      <div>
        <h2 className="text-lg font-semibold">Location Details</h2>
        <p className="text-gray-600 text-sm">
          Specify the address where the activity takes place.
        </p>
      </div>

      <div>
        <label className="block font-medium mb-1 text-xs">
          Address Line 1 <span className="text-red-500">*</span>
        </label>
        {formErrors.addressLine1 && (
          <p className="text-red-500 text-xs mt-1">{formErrors.addressLine1}</p>
        )}
        <input
          type="text"
          name="addressLine1"
          value={formData.step2?.addressLine1 || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-full text-xs"
          placeholder="House number and street name"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1 text-xs">Address Line 2</label>
        <input
          type="text"
          name="addressLine2"
          value={formData.step2?.addressLine2 || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-full text-xs"
          placeholder="Building name, landmark, etc."
        />
      </div>

      <div>
        <label className="block font-medium mb-1 text-xs">
          ZIP Code <span className="text-red-500">*</span>
        </label>
        {formErrors.zipCode && (
          <p className="text-red-500 text-xs mt-1">{formErrors.zipCode}</p>
        )}
        <input
          type="text"
          name="zipCode"
          value={formData.step2?.zipCode || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-full text-xs"
          placeholder="eg: 123 467"
          required
          pattern="\d{5}(-\d{4})?"
          title="ZIP code should be 5 or 9 digits (e.g., 12345 or 12345-6789)"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1 text-xs">City *</label>
          {formErrors.city && (
            <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
          )}
          <input
            type="text"
            name="city"
            value={formData.step2?.city || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full text-xs"
            placeholder="Your City"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-xs">State *</label>
          {formErrors.state && (
            <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>
          )}
          <select
            name="state"
            value={formData.step2?.state || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full text-xs"
            required>
            <option value="">Your State</option>
            <option value="State 1">State 1</option>
            <option value="State 2">State 2</option>
          </select>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mt-6">Contact Details</h2>
        <p className="text-gray-600 text-sm">
          Provide contact information for this activity.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center border rounded-full px-4 py-2">
          {formErrors.contactNumber && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.contactNumber}
            </p>
          )}
          <span className="mr-2">🇺🇸</span>
          <input
            type="tel"
            name="contactNumber"
            value={formData.step2?.contactNumber || ""}
            onChange={handleChange}
            className="w-full text-xs"
            placeholder="Contact Number"
            pattern="[0-9]{10}"
            required
          />
        </div>
        <input
          type="text"
          name="contactName"
          value={formData.step2?.contactName || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-full text-xs"
          placeholder="Contact Name"
        />
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep((prev: number) => prev - 1)}
          className="w-44 bg-gray-300 py-2 rounded-full text-sm font-semibold hover:bg-gray-400">
          Previous
        </button>
        <button
          type="submit"
          className="w-44 bg-[#001D44] text-white py-2 rounded-full text-sm font-semibold hover:bg-[#001D44]/80">
          Submit
        </button>
      </div>
    </form>
  );
};

export default LocationContactForm;
