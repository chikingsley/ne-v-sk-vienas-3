import type React from "react";
import type { PreferenceOption } from "../types";
import IconWrapper from "./icon-wrapper";

type PreferenceCardProps = {
  option: PreferenceOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

const PreferenceCard: React.FC<PreferenceCardProps> = ({
  option,
  isSelected,
  onSelect,
}) => (
  <button
    className={`\${isSelected ? "border-teal-500 : "border-gray-200 relative flex h-full min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-md border-2 bg-teal-50 bg-white p-6 text-center shadow-sm" transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"}`}
    onClick={() => onSelect(option.id)}
    type="button"
  >
    <div className="mb-4">
      <IconWrapper isSelected={isSelected} type={option.iconType} />
    </div>

    <h3
      className={`\${isSelected ? "text-teal-900" : "text-gray-800"} mb-2 font-bold text-lg`}
    >
      {option.title}
    </h3>

    <p className={`\${isSelected ? "text-teal-700" : "text-gray-500"} text-sm`}>
      {option.description}
    </p>
  </button>
);

export default PreferenceCard;
