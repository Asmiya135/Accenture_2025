

import { useEffect } from "react";

const Hatbot = () => {
  useEffect(() => {
    // This will run once when the component mounts
    // No need to check for existing script since React will handle component lifecycle
    const script = document.createElement("script");
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    script.id = "elevenlabs-convai-script";
    document.body.appendChild(script);

    // Clean up function
    return () => {
      const scriptElement = document.getElementById("elevenlabs-convai-script");
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);

  // Use dangerouslySetInnerHTML to bypass TypeScript errors with custom elements
  return (
    <div 
      className="hatbot-container"
      dangerouslySetInnerHTML={{
        __html: '<elevenlabs-convai agent-id="evsyjJwCFxHY15gZA929"></elevenlabs-convai>'
      }}
    />
  );
};

export default Hatbot;