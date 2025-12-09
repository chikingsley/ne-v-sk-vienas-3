"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, HelpCircle, X } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Extended date range: Dec 23 - Jan 2
const EXTENDED_DATES = [
  "Dec 23",
  "Dec 24",
  "Dec 25",
  "Dec 26",
  "Dec 27",
  "Dec 28",
  "Dec 29",
  "Dec 30",
  "Dec 31",
  "Jan 1",
  "Jan 2",
] as const;

type IconType = "check" | "question" | "x";
type ColorType = "green" | "amber" | "red";

type PreferenceOption = {
  id: string;
  title: string;
  description: string;
  iconType: IconType;
  colorType: ColorType;
  showDates: boolean;
};

const HOSTING_OPTIONS: PreferenceOption[] = [
  {
    id: "can-host",
    title: "I Can Host",
    description: "I'm eager to welcome guests",
    iconType: "check",
    colorType: "green",
    showDates: true,
  },
  {
    id: "may-host",
    title: "Maybe",
    description: "Depending on circumstances",
    iconType: "question",
    colorType: "amber",
    showDates: true,
  },
  {
    id: "cant-host",
    title: "Not Hosting",
    description: "Not able to host this season",
    iconType: "x",
    colorType: "red",
    showDates: false,
  },
];

const GUEST_OPTIONS: PreferenceOption[] = [
  {
    id: "looking",
    title: "Looking for Host",
    description: "Looking for somewhere to celebrate",
    iconType: "check",
    colorType: "green",
    showDates: true,
  },
  {
    id: "maybe-guest",
    title: "Open to It",
    description: "Might be interested",
    iconType: "question",
    colorType: "amber",
    showDates: true,
  },
  {
    id: "not-looking",
    title: "Not Looking",
    description: "Not looking for a host",
    iconType: "x",
    colorType: "red",
    showDates: false,
  },
];

// Color schemes for each type
const COLOR_SCHEMES = {
  green: {
    border: "border-green-500",
    bg: "bg-green-50",
    iconBg: "bg-green-600",
    title: "text-green-900",
    desc: "text-green-700",
    dateSelected: "bg-green-600 text-white border-green-600",
    dateUnselected:
      "bg-white border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400",
  },
  amber: {
    border: "border-amber-500",
    bg: "bg-amber-50",
    iconBg: "bg-amber-500",
    title: "text-amber-900",
    desc: "text-amber-700",
    dateSelected: "bg-amber-500 text-white border-amber-500",
    dateUnselected:
      "bg-white border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400",
  },
  red: {
    border: "border-red-500",
    bg: "bg-red-50",
    iconBg: "bg-red-600",
    title: "text-red-900",
    desc: "text-red-700",
    dateSelected: "bg-red-600 text-white border-red-600",
    dateUnselected:
      "bg-white border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400",
  },
} as const;

// Memoized icon component to prevent re-renders
const IconBadge = memo(function IconBadgeInner({
  type,
  colorType,
  isSelected,
}: {
  type: IconType;
  colorType: ColorType;
  isSelected: boolean;
}) {
  const bgColor = isSelected ? COLOR_SCHEMES[colorType].iconBg : "bg-gray-400";

  return (
    <div className={`rounded-full p-2.5 ${bgColor} transition-colors`}>
      {type === "check" && (
        <Check className="h-5 w-5 text-white" strokeWidth={3} />
      )}
      {type === "question" && (
        <HelpCircle className="h-5 w-5 text-white" strokeWidth={3} />
      )}
      {type === "x" && <X className="h-5 w-5 text-white" strokeWidth={3} />}
    </div>
  );
});

// Memoized date button to prevent re-renders
const DateButton = memo(function DateButtonInner({
  date,
  isSelected,
  colorType,
  onToggle,
}: {
  date: string;
  isSelected: boolean;
  colorType: ColorType;
  onToggle: (date: string) => void;
}) {
  const c = COLOR_SCHEMES[colorType];

  return (
    <motion.button
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-md border px-2 py-1 font-medium text-xs transition-colors ${
        isSelected ? c.dateSelected : c.dateUnselected
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(date);
      }}
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {date}
    </motion.button>
  );
});

// Memoized preference card component
const PreferenceCardWithDates = memo(function PreferenceCardInner({
  option,
  isSelected,
  onSelect,
  selectedDates,
  onToggleDate,
}: {
  option: PreferenceOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  selectedDates: string[];
  onToggleDate: (date: string) => void;
}) {
  const c = COLOR_SCHEMES[option.colorType];
  const showDates = isSelected && option.showDates;

  const handleSelect = useCallback(() => {
    onSelect(option.id);
  }, [onSelect, option.id]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border-2 transition-colors duration-200 ${
        isSelected
          ? `${c.border} ${c.bg} shadow-md`
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      {/* Main card button */}
      <button
        className="flex w-full cursor-pointer flex-col items-center p-5 text-center"
        onClick={handleSelect}
        type="button"
      >
        <div className="mb-3">
          <IconBadge
            colorType={option.colorType}
            isSelected={isSelected}
            type={option.iconType}
          />
        </div>
        <h3
          className={`mb-1 font-bold text-base ${
            isSelected ? c.title : "text-gray-800"
          }`}
        >
          {option.title}
        </h3>
        <p className={`text-xs ${isSelected ? c.desc : "text-gray-500"}`}>
          {option.description}
        </p>
      </button>

      {/* Animated date picker section */}
      <AnimatePresence initial={false}>
        {showDates && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className={`border-t ${c.border} px-4 pb-4`}
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: -10, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <p className={`mb-2 pt-3 font-medium text-xs ${c.title}`}>
                Select dates:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {EXTENDED_DATES.map((date, index) => (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 10 }}
                    key={date}
                    transition={{ delay: 0.05 * index, duration: 0.2 }}
                  >
                    <DateButton
                      colorType={option.colorType}
                      date={date}
                      isSelected={selectedDates.includes(date)}
                      onToggle={onToggleDate}
                    />
                  </motion.div>
                ))}
              </div>
              {selectedDates.length > 0 && (
                <motion.p
                  animate={{ opacity: 1 }}
                  className={`mt-2 text-xs ${c.desc}`}
                  initial={{ opacity: 0 }}
                >
                  {selectedDates.length} date
                  {selectedDates.length !== 1 ? "s" : ""} selected
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default function PreferenceCardsExperiment() {
  const [hostingStatus, setHostingStatus] = useState("cant-host");
  const [guestStatus, setGuestStatus] = useState("not-looking");
  const [hostingDates, setHostingDates] = useState<string[]>([]);
  const [guestDates, setGuestDates] = useState<string[]>([]);

  // Memoized callbacks to prevent re-renders
  const toggleHostingDate = useCallback((date: string) => {
    setHostingDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  }, []);

  const toggleGuestDate = useCallback((date: string) => {
    setGuestDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  }, []);

  const handleHostingSelect = useCallback((id: string) => {
    setHostingStatus(id);
  }, []);

  const handleGuestSelect = useCallback((id: string) => {
    setGuestStatus(id);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Preference Cards Experiment v2</CardTitle>
            <p className="text-muted-foreground text-sm">
              Color-coded cards with Framer Motion animations. Green = yes,
              Amber = maybe, Red = no. Cards expand smoothly when selected.
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Hosting Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">
                Are you open to hosting?
              </h3>
              <div className="grid grid-cols-3 items-start gap-3">
                {HOSTING_OPTIONS.map((option) => (
                  <PreferenceCardWithDates
                    isSelected={hostingStatus === option.id}
                    key={option.id}
                    onSelect={handleHostingSelect}
                    onToggleDate={toggleHostingDate}
                    option={option}
                    selectedDates={hostingDates}
                  />
                ))}
              </div>
            </div>

            {/* Guest Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">
                Are you looking to be a guest?
              </h3>
              <div className="grid grid-cols-3 items-start gap-3">
                {GUEST_OPTIONS.map((option) => (
                  <PreferenceCardWithDates
                    isSelected={guestStatus === option.id}
                    key={option.id}
                    onSelect={handleGuestSelect}
                    onToggleDate={toggleGuestDate}
                    option={option}
                    selectedDates={guestDates}
                  />
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 font-medium">Current Selection:</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Hosting:</span> {hostingStatus}
                  {hostingDates.length > 0 && ` (${hostingDates.join(", ")})`}
                </p>
                <p>
                  <span className="font-medium">Guest:</span> {guestStatus}
                  {guestDates.length > 0 && ` (${guestDates.join(", ")})`}
                </p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Continue
            </Button>
          </CardContent>
        </Card>

        {/* Features note */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">What&apos;s New in v2</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            <ul className="list-inside list-disc space-y-1">
              <li>
                <span className="font-medium text-green-600">Green</span> for
                positive options (Can Host, Looking)
              </li>
              <li>
                <span className="font-medium text-amber-600">Amber/Yellow</span>{" "}
                for maybe options
              </li>
              <li>
                <span className="font-medium text-red-600">Red</span> for
                negative options (Not Hosting, Not Looking)
              </li>
              <li>Framer Motion for smooth expand/collapse animations</li>
              <li>Staggered date button animations</li>
              <li>
                Memoized components with <code>memo()</code> and{" "}
                <code>useCallback()</code> to prevent over-rendering
              </li>
              <li>
                <code>layout</code> prop for smooth card height transitions
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
