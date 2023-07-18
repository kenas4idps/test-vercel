import { useContext, useEffect, useState } from "react";

import Cookie from "js-cookie";
import Nav from "components/layout/nav";
import StepTracker from "components/common/stepTracker";

import BrandApi from "api/Brand";

import { NotificationContext } from "providers/notificationProvider";

import LandingStep from "./landingStep";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import FinalStep from "./finalStep";

enum RegistrationCommunityStep {
  landing,
  step1,
  step2,
  step3,
  end,
}

const Homepage = () => {
  const { setBrandApi, getPreviousBrandDataApi } = BrandApi();
  const { displayNotification } = useContext(NotificationContext);

  const [currentStep, setCurrentStep] = useState(
    RegistrationCommunityStep.step3
  );

  const [externalFormData, setExternalFormData] = useState(null);

  // get external form data from cookie
  useEffect(() => {
    // get form cookie
    const formData = Cookie.get("nuvo_form_data");
    if (formData !== undefined) {
      const objFormData = JSON.parse(formData);
      setExternalFormData(objFormData);
    }
  }, []);

  console.log(externalFormData);

  console.log("pourt");

  const goToNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep <= Object.keys(RegistrationCommunityStep).length) {
      setCurrentStep(nextStep);
    }
  };

  const submitForm = async (brandName: string, awsFilePath: string) => {
    try {
      const previousData = await getPreviousBrandDataApi();
      console.log(previousData);
      if (previousData) {
        const data = await setBrandApi(
          brandName,
          awsFilePath,
          previousData?.contactName,
          previousData?.email,
          previousData?.website
        );
        if (data.code === 200) {
          goToNextStep();
        } else {
          displayNotification(data.msg, "error");
        }
      }
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case RegistrationCommunityStep.landing:
        return <LandingStep goToNextStep={goToNextStep} />;
      case RegistrationCommunityStep.step1:
        return (
          <Step1 goToNextStep={goToNextStep}>
            <StepTracker stepNumber={3} currentStep={currentStep - 1} />
          </Step1>
        );
      case RegistrationCommunityStep.step2:
        return (
          <Step2 goToNextStep={goToNextStep}>
            <StepTracker stepNumber={3} currentStep={currentStep - 1} />
          </Step2>
        );
      case RegistrationCommunityStep.step3:
        return (
          <Step3 submitForm={submitForm} externalFormData={externalFormData} />
        );
      case RegistrationCommunityStep.end:
        return <FinalStep />;
      default:
        return <LandingStep goToNextStep={goToNextStep} />;
    }
  };

  return (
    <>
      <Nav />
      {renderStepContent()}
    </>
  );
};

export default Homepage;
