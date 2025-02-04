
import React from "react";
import { useFormContext } from "@/context/FormContext";

const Sidebar = () => {
  const { currentStep, setCurrentStep, formData } = useFormContext();

  const steps = [
    {
      number: 1,
      title: "Activity Details",
      completed:
        !!formData.step1?.activityName && !!formData.step1?.activityDescription,
    },
    {
      number: 2,
      title: "Location Details",
      completed: !!formData.step2?.addressLine1 && !!formData.step2?.zipCode,
    },
  ];

  return (
    <aside className="w-64 ml-12 h-[calc(100vh-64px)] p-4 text-black">
      <nav>
        <h2 className="text-2xl font-bold mb-6">Create new Activity</h2>
        <ul className="space-y-4">
          {steps.map((step) => (
            <li key={step.number}>
              <button
                onClick={() => setCurrentStep(step.number)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  currentStep === step.number
                    ? "bg-[#F7F7F7] text-black"
                    : "hover:bg-gray-100 text-[#6B6B6B] hover:text-[#2E2B2B] font-semibold"
                }`}>
                <div className="flex items-center gap-4">
                  <div>
                    <img
                      src={step.completed ? "/flag.png" : step.number === 1 ? "/flag.png" : "/location.png"}
                      alt={step.completed ? "check" : step.number === 1 ? "flag" : "location"}
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className={`text-base ${
                    currentStep === step.number || step.completed ? "font-semibold" : "font-normal"
                  }`}>
                    {step.title}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
