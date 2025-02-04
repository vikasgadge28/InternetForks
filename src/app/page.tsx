/** @format */

"use client";
import Step1Form from "@/components/forms/Step1Form";
import Step2Form from "@/components/forms/Step2Form";
import { useFormContext } from "@/context/FormContext";

export default function Home() {
  const { currentStep } = useFormContext();

  return (
    <div className="min-h-screen">
      <main className="">
        <div className=" mx-auto">
          {currentStep === 1 ?
            <Step1Form />
          : <Step2Form />}
        </div>
      </main>
    </div>
  );
}
