import DisplayIf from "@components/conditionals/DIsplayIf";
import React from "react";
import { useClientId } from "src/providers/useClientId";

interface DisplayIfClientIdValidProps {
  children: React.ReactNode | React.ReactNode[];
}

const DisplayIfClientIdValid: React.FC<DisplayIfClientIdValidProps> = ({ children }) => {
  const { loading, isValid } = useClientId();

  return (
    <DisplayIf condition={() => !loading}>
      <DisplayIf condition={() => isValid}>{children}</DisplayIf>
    </DisplayIf>
  );
};

export default DisplayIfClientIdValid;
