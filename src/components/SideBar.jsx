import { useEffect, useState } from "react";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { selectionStore } from "../store/UISelectionStore"; // Assuming this is Zustand
import TempleLensLayout from "./TempleLensLayout";
import { observer } from "mobx-react";
import { GrPowerReset } from "react-icons/gr";
import { FaSave } from "react-icons/fa";
import sampleData from "../sample.json";

const SideBar = observer(() => {
  const [selectedTab, setSelectedTab] = useState("Frame");
  const tabs = ["Temple", "Frame", "Lenses"];

  const selectedPart = selectionStore.selectedPart;

  useEffect(() => {
    console.log(selectedPart);
    switch (selectedPart) {
      case "Frame":
        setSelectedTab("Frame");
        break;
      case "Temple":
        setSelectedTab("Temple");
        break;
      case "Lenses":
        setSelectedTab("Lenses");
        break;
      default:
        break;
    }
  }, [selectedPart]);

  const rotateTabsLeft = () => {
    const currentIndex = tabs.indexOf(selectedTab);
    const nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    setSelectedTab(tabs[nextIndex]);
    selectionStore.setSelectedPart(tabs[nextIndex]);
  };

  const rotateTabsRight = () => {
    const currentIndex = tabs.indexOf(selectedTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setSelectedTab(tabs[nextIndex]);
    selectionStore.setSelectedPart(tabs[nextIndex]);
  };

  const handleReset = () => {
    selectionStore.reset();
  };

  const handleDownload = () => {
    const data = sampleData;
    data.groups[0].selectedTexture =
      selectionStore.selectedStuff["Frame"].texture;
    data.groups[0].selectedColor = selectionStore.selectedStuff["Frame"].color;
    data.groups[0].roughness = selectionStore.selectedStuff["Frame"].roughness;
    data.groups[0].metalness = selectionStore.selectedStuff["Frame"].metallic;
    data.groups[0].transparency =
      selectionStore.selectedStuff["Frame"].transparency;

    data.groups[1].selectedTexture =
      selectionStore.selectedStuff["Temple"].texture;
    data.groups[1].selectedColor = selectionStore.selectedStuff["Temple"].color;
    data.groups[1].roughness = selectionStore.selectedStuff["Temple"].roughness;
    data.groups[1].metalness = selectionStore.selectedStuff["Temple"].metallic;
    data.groups[1].transparency =
      selectionStore.selectedStuff["Temple"].transparency;

    data.groups[2].color = selectionStore.selectedStuff["Lenses"].color;
    data.groups[2].transparency =
      selectionStore.selectedStuff["Lenses"].transparency;

    const fileName = "modelData.json";
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL object after download
  };

  return (
    <div
      className={`py-3 mx-5 bg-cover bg-center bg-no-repeat overflow-hidden border-1 border-gray-200 rounded-[10px] ${
        selectionStore.isDarkTheme
          ? "bg-[url('/assets/background/sidebarbg.png')]"
          : "bgc-white"
      }`}
    >
      <div className="w-full px-6 mt-6">
        <div className={`flex mb-2 justify-between text-[18px] text-white`}>
          <div
            className={`left-tab flex items-center gap-2 cursor-pointer hover:opacity-100 hover:scale-103 duration-200 ${
              selectionStore.isDarkTheme
                ? "text-white opacity-50"
                : "text-black opacity-100"
            }`}
            onClick={rotateTabsLeft}
          >
            <div className="icon-con">
              <HiArrowLongLeft />
            </div>
            <div className={`label`}>
              {
                tabs[
                  (tabs.indexOf(selectedTab) - 1 + tabs.length) % tabs.length
                ]
              }
            </div>
          </div>

          <div className="center-tab font-bold flex items-center gap-2 cursor-pointer opacity-100 hover:scale-103 duration-200">
            <div className="label ml-1 text-purple-400">{selectedTab}</div>
          </div>

          <div
            className={`right-tab opacity-50 flex items-center gap-2 cursor-pointer hover:opacity-100 hover:scale-103 duration-200 ${
              selectionStore.isDarkTheme
                ? "text-white opacity-50"
                : "text-black opacity-100"
            }`}
            onClick={rotateTabsRight}
          >
            <div className="label">
              {tabs[(tabs.indexOf(selectedTab) + 1) % tabs.length]}
            </div>
            <div className="icon-con">
              <HiArrowLongRight />
            </div>
          </div>
        </div>

        <div className="line flex items-center justify-center">
          <div className="triangle w-1 h-1 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-purple-300"></div>
        </div>

        <div className="border-t border-purple-300 w-full mb-0 rounded-b-[10px]"></div>

        <div className="last overflow-y-scroll max-h-[60vh] scrollbar-thin">
          <TempleLensLayout />
        </div>

        <div className="btn-cover my-2 flex justify-center gap-3">
          <button className="reset-wrap w-100">
            <div
              className={`btn bg-[#5b585f] border border-2 border-gray-400 rounded w-full py-3 text-[#b5b5b5] cursor-pointer flex items-center duration-100 gap-2 justify-center hover:scale-105 hover:border-white hover:text-white ${
                selectionStore.isDarkTheme
                  ? "bg-[#5b585f]"
                  : "bg-gray-300 shadow border-1 text-black hover:bg-black hover:text-white"
              }`}
              onClick={handleReset}
            >
              <div className="icon-con">
                <GrPowerReset />
              </div>
              <div className="label">Reset </div>
            </div>
          </button>

          <button className="save-wrap w-100">
            <div
              className={`btn bg-white dark:bg-transparent border border-1 border-[#a673ff] rounded w-full py-3 text-[#a673ff] cursor-pointer duration-100 flex items-center gap-2 justify-center hover:scale-105 hover:border-white hover:text-white ${
                selectionStore.isDarkTheme
                  ? "bg-[#a673ff]"
                  : " shadow border-1  hover:bg-[#a673ff] hover:text-white"
              }`}
              onClick={handleDownload}
            >
              <div className="icon-con">
                <FaSave />
              </div>
              <div className="label">Save </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
});

export default SideBar;
