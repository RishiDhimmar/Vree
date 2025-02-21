// import { useEffect, useState } from "react";
// import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
// import { selectionStore } from "../store/UISelectionStore"; // Assuming this is a store like Zustand
// import TempleLensLayout from "./TempleLensLayout";

// function SideBar() {
//   const [selectedTab, setSelectedTab] = useState("Frame");
//   const [tabs, setTabs] = useState(["Temple", "Frame", "Lenses"]);

//   // Watch for changes in selectionStore.selectedPart and update the component's state accordingly
//   useEffect(() => {
//     // Make sure selectionStore.selectedPart is a reactive state or it triggers re-renders
//     const selectedPart = selectionStore.selectedPart;
//     console.log(selectedPart)
//     switch (selectedPart) {
//       case "Frame":
//         setSelectedTab("Frame");
//         break;
//       case "Temple":
//         setSelectedTab("Temple");
//         handleLeftClick();
//         break;
//       case "Lenses":
//         setSelectedTab("Lenses");
//         handleRightClick();
//         break;
//       default:
//         break;
//     }
//   }, [selectionStore.selectedPart]); // Ensure this dependency is correct

//   const handleLeftClick = () => {
//     // Rotate the tabs for right arrow click
//     const newTabs = [...tabs];
//     const newSelectedTab = newTabs.pop(); // Pop the last tab
//     newTabs.unshift(newSelectedTab); // Push it to the beginning
//     setTabs(newTabs);
//     setSelectedTab(newTabs[1]);
//     selectionStore.setSelectedPart(newTabs[1]); // Assuming the store has a method to update the part
//   };

//   const handleRightClick = () => {
//     // Rotate the tabs for left arrow click
//     const newTabs = [...tabs];
//     const newSelectedTab = newTabs.shift(); // Shift the first tab
//     newTabs.push(newSelectedTab); // Push it to the end
//     setTabs(newTabs);
//     setSelectedTab(newTabs[1]);
//     selectionStore.setSelectedPart(newTabs[1]); // Update the store's selected part
//   };

//   return (
//     <div className="w-full h-[500px] bg-[url('/assets/background/sidebarbg.png')] mx-5 bg-cover bg-center bg-no-repeat overflow-hidden border-1 border-gray-200 rounded-[10px]">
//       <div className="w-full px-6 mt-6">
//         {console.log(selectionStore.selectedPart)}
//         <div className="flex mb-4 justify-between text-[18px] text-white">
//           <div
//             className="left-tab opacity-50 flex items-center gap-2 cursor-pointer hover:opacity-100 hover:scale-103 duration-200"
//             onClick={handleLeftClick}
//           >
//             <div className="icon-con">
//               <HiArrowLongLeft />
//             </div>
//             <div className="label">{tabs[0]}</div>
//           </div>

//           <div className="center-tab font-bold flex items-center gap-2 cursor-pointer hover:opacity-100 hover:scale-103 duration-200">
//             <div className="label ml-1 text-purple-300">{tabs[1]}</div>
//           </div>

//           <div
//             className="right-tab opacity-50 flex items-center gap-2 cursor-pointer hover:opacity-100 hover:scale-103 duration-200"
//             onClick={handleRightClick}
//           >
//             <div className="label">{tabs[2]}</div>
//             <div className="icon-con">
//               <HiArrowLongRight />
//             </div>
//           </div>
//         </div>

//         {/* Triangle under the selected tab */}
//         <div className="line flex items-center justify-center">
//           <div className="triangle w-1 h-1 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-purple-300"></div>
//         </div>

//         <div className="border-t border-purple-300 w-full"></div>

//         <div className="last overflow-y-scroll h-100">
//           {/* Render TempleLensLayout here based on the selected part */}
//           <TempleLensLayout />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SideBar;
import { useEffect, useState } from "react";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { selectionStore } from "../store/UISelectionStore"; // Assuming this is Zustand
import TempleLensLayout from "./TempleLensLayout";
import { observer } from "mobx-react";
import { GrPowerReset } from "react-icons/gr";
import { FaSave } from "react-icons/fa";

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

  return (
    <div className="w-full h-[555px] bg-[url('/assets/background/sidebarbg.png')] mx-5 bg-cover bg-center bg-no-repeat overflow-hidden border-1 border-gray-200 rounded-[10px]">
      <div className="w-full px-6 mt-6">
        <div className="flex mb-2 justify-between text-[18px] text-white">
          <div
            className="left-tab opacity-50 flex items-center gap-2 cursor-pointer hover:opacity-100 hover:scale-103 duration-200"
            onClick={rotateTabsLeft}
          >
            <div className="icon-con">
              <HiArrowLongLeft />
            </div>
            <div className="label">
              {
                tabs[
                  (tabs.indexOf(selectedTab) - 1 + tabs.length) % tabs.length
                ]
              }
            </div>
          </div>

          <div
            className="center-tab font-bold flex items-center gap-2 cursor-pointer hover:opacity-100 hover:scale-103 duration-200"
            onClick={() => setSelectedTab(tabs[1])}
          >
            <div className="label ml-1 text-purple-300">{selectedTab}</div>
          </div>

          <div
            className="right-tab opacity-50 flex items-center gap-2 cursor-pointer hover:opacity-100 hover:scale-103 duration-200"
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

        {/* Triangle under the selected tab */}
        <div className="line flex items-center justify-center">
          <div className="triangle w-1 h-1 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-purple-300"></div>
        </div>

        <div className="border-t border-purple-300 w-full mb-2 rounded-b-[10px]"></div>

        <div className="last overflow-y-scroll h-100 scrollbar-thin">
          {/* Render TempleLensLayout here based on the selected part */}
          <TempleLensLayout />
        </div>
        <div className="btn-cover my-4 flex justify-center gap-3">
          <button className="reset-wrap w-100">
            <div className="btn bg-[#5b585f] border border-2 border-gray-400 rounded w-full py-3 text-[#b5b5b5] cursor-pointer flex items-center gap-2 justify-center hover:scale-105 hover:border-white hover:text-white">
              <div className="icon-con">
                <GrPowerReset />
              </div>
              <div className="label">
              Reset{" "}
              </div>
            </div>
          </button>
          <button className="save-wrap w-100">
            <div className="btn bg-transparent border border-1 border-[#a673ff] rounded w-full py-3 text-[#a673ff] cursor-pointer flex items-center gap-2 justify-center hover:scale-105 hover:border-white hover:text-white">
              <div className="icon-con">
                <FaSave />
              </div>
              <div className="label">
              Save{" "}
              </div>
            </div>
</button>
        </div>
      </div>
    </div>
  );
});

export default SideBar;
