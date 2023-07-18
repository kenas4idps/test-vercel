import { useEffect, useRef, useState } from "react";

import PageWrapper from "components/layout/pageWrapper";
import CustomButton from "components/common/customButton";
import CustomInputText from "components/common/customInputText";
import CustomUploadFile from "components/common/customUploadFile";

import AwsApi from "api/Aws";

import doubleCircleIcon from "assets/icons/double-circle.svg";

import "./Step3.scss";

interface Step3Type {
  submitForm: (brandName: string, awsFilePath: string) => void;
  externalFormData: any; // since form types might change later
}

const Step3 = ({ submitForm, externalFormData }: Step3Type) => {
  const [file, setFile] = useState<File | null>(null);
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    setBrandName(externalFormData?.organization);
  }, [externalFormData]);

  const formInputRef = useRef<HTMLFormElement>(null);

  const { fileToUploadHandler } = AwsApi();

  const checkFormValid = () => {
    if (brandName === "" || file === null) {
      return false;
    } else {
      return true;
    }
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkFormValid() && file) {
      const awsFilePath = (await fileToUploadHandler(file)) as string;
      submitForm(brandName, awsFilePath);
    }
  };

  return (
    <PageWrapper customStyle="small" className="step-3">
      <div className="title">Create Brand Account</div>

      <div className="form-container">
        <form onSubmit={(event) => onFormSubmit(event)} ref={formInputRef}>
          <CustomInputText
            label="Brand Name"
            placeholder="Your brand"
            className="inpt-brand-name"
            icon={doubleCircleIcon}
            onChange={setBrandName}
            maxLength={20}
            value={brandName}
          />

          <CustomUploadFile
            label="Upload your logo"
            onChange={(img) => setFile(img)}
            maxSize={1}
            isPicture={true}
            cropSize={300}
          />

          <CustomButton className="validation-btn" isActive={checkFormValid()}>
            SEND
          </CustomButton>
        </form>
      </div>
    </PageWrapper>
  );
};

export default Step3;
