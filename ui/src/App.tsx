import { useState } from "react";
import { HeaderComponent } from "./components/header";
import { SideBarCompoent } from "./components/sidebar";
import { UploadComponent } from "./components/upload";

function App() {
  const [file, setFile] = useState<File | null>(null)

  const handleSubmitForm = async (data: any) => {
    const formData = new FormData();

    formData.append("video", data.video);

    formData.append("grid", data.grid);
    formData.append("spacing", String(data.spacing));
    formData.append("ratio", data.ratio);
    formData.append("backgroundColor", data.backgroundColor);
    formData.append("textColor", data.textColor);
    formData.append("font", data.font);
    formData.append("outputFormat", data.outputFormat);
    formData.append("quality", String(data.quality));
    formData.append("radius", String(data.radius));
    formData.append("timestamps", String(data.timestamps));
    formData.append("metadata", String(data.metadata));

    await fetch("http://localhost:3000/api/video", {
      method: "POST",
      body: formData
    });
  }

  return (
    <div className="bg-black w-screen h-screen px-10">
      <HeaderComponent />
      <div className="w-full flex gap-x-6 h-[830px] py-3">
        <SideBarCompoent submitForm={handleSubmitForm} video={file} />
        <UploadComponent setFile={setFile} />
      </div>
    </div>
  )
}

export default App