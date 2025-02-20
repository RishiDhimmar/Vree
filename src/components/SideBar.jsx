import { useState } from "react";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { selectionStore } from "../store/UISelectionStore";
import TempleLensLayout from "./TempleLensLayout";

function SideBar() {
  // const [selectedTab, setSelectedTab] = useState("Frame");
  const [tabs, setTabs] = useState(["Temple", "Frame", "Lenses"]);

  // Handle left arrow click
  const handleRightClick = () => {
    selectionStore.setSelectedPart(tabs[tabs.length - 1]);
    const newTabs = [...tabs]; 
    newTabs.push(newTabs.shift()); 
    setTabs(newTabs); 
  };
  
  // Handle right arrow click
  const handleLeftClick = () => {
    selectionStore.setSelectedPart(tabs[0]);
    const newTabs = [...tabs]; 
    newTabs.unshift(newTabs.pop()); 
    setTabs(newTabs);
  };

  return (
    <div className="w-full h-[500px] bg-[url('/assets/background/sidebarbg.png')] mx-5 bg-cover bg-center bg-no-repeat overflow-hidden border-1 border-gray-200 rounded-[10px] ">
      <div className="w-full px-6 mt-6">
        {console.log(selectionStore.selectedPart)}
        <div className="flex mb-4 justify-between text-[18px] text-white">
          <div
            className="left-tab opacity-50 flex items-center gap-2 cursor-pointer hover:opacity-100 hover:scale-103 duration-200"
            onClick={handleLeftClick}
          >
            <div className="icon-con">
              <HiArrowLongLeft />
            </div>
            <div className="label">{tabs[0]}</div>
          </div>

          <div className="center-tab font-bold flex items-center gap-2 cursor-pointer hover:opacity-100 hover:scale-103 duration-200">
            <div className="label ml-1 text-purple-300">{tabs[1]}</div>
          </div>

          <div
            className="right-tab opacity-50 flex items-center gap-2 cursor-pointer hover:opacity-100 hover:scale-103 duration-200"
            onClick={handleRightClick}
          >
            <div className="label">{tabs[2]}</div>
            <div className="icon-con">
              <HiArrowLongRight />
            </div>
          </div>
        </div>

        {/* Triangle under the selected tab */}
        <div className="line flex items-center justify-center">
          <div className="triangle w-1 h-1 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-purple-300"></div>
        </div>

        <div className="border-t border-purple-300 w-full"></div>

        <div className="last overflow-y-scroll h-100">
          {(selectionStore.selectedPart === 'Temple' || selectionStore.selectedPart === 'Frame')  ? (
            <TempleLensLayout />
          ): <>
          {console.log(selectionStore.selectedPart)}
          </>}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
