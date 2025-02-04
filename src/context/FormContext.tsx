/** @format */

import { createContext, useContext, useState } from "react";

interface FormData {
  step1: {
    activityName?: string;
    category?: string;
    otherCategory?: string;
    activityDescription?: string;
    activityType?: string;
    locationType?: string;
    minMembers?: string;
    maxMembers?: string;
  };
  step2: {
    addressLine1?: string;
    addressLine2?: string;
    zipCode?: string;
    city?: string;
    state?: string;
    contactNumber?: string;
    contactName?: string;
  };
}

interface FormContextType {
  formData: FormData;
  updateFormData: (
    step: keyof FormData,
    data: Partial<FormData[keyof FormData]>
  ) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  resetFormData: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    step1: {},
    step2: {},
  });
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (
    step: keyof FormData,
    data: Partial<FormData[keyof FormData]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        resetFormData: () => {
          setFormData({ step1: {}, step2: {} });
          setCurrentStep(1);
        },
      }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
