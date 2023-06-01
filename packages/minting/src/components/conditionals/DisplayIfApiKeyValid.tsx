import React from "react";
import DisplayIf from "src/components/conditionals/DIsplayIf";
import { useApiKey } from "src/providers/useApiKey";

interface DisplayIfApiKeyValidProps {
  children: React.ReactNode | React.ReactNode[];
}

const DisplayIfApiKeyValid: React.FC<DisplayIfApiKeyValidProps> = ({ children }) => {
  const { loading, isValid } = useApiKey();

  console.log("DisplayIfApiKeyValid", { loading, isValid });

  return (
    <DisplayIf condition={() => !loading}>
      <DisplayIf
        condition={() => isValid}
        falsy={
          <div className="w-dull border border-red-500 bg-white p-5">
            <h1 className="text-2xl font-bold text-red-500">API key is not valid</h1>
          </div>
        }
      >
        {children}
      </DisplayIf>
    </DisplayIf>
  );
};

export default DisplayIfApiKeyValid;
