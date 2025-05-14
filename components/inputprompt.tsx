"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { FiCpu, FiLayers, FiUser, FiBriefcase, FiList } from "react-icons/fi";

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface FormData {
  role: string;
  type: string;
  level: string;
  techstack: string;
  amount: number;
  userid: string;
  username: string;
}

interface ApiStatusMessage {
  text: string;
  type: 'success' | 'error';
}

interface InterviewConfigFormProps {
  isLoadingExternal?: boolean;
  initialData?: Partial<Omit<FormData, 'techstack' | 'amount'> & { techstack: string, amount: string | number }>;
  username: string;
  id: string;
}

const INTERVIEW_TYPES = ["Mixed", "Technical", "Behavioral", "System Design", "Coding"];
const EXPERIENCE_LEVELS = ["Intern", "Junior", "Mid-level", "Senior", "Staff/Principal"];
const COMMON_ROLES = ["Frontend Developer", "Backend Developer", "Fullstack Developer", "Data Scientist", "DevOps Engineer", "Product Manager", "UX Designer"];

export default function InterviewConfigForm({
  isLoadingExternal = false,
  initialData,
  username,
  id,
}: InterviewConfigFormProps) {
  const router = useRouter();

  const [role, setRole] = useState<string>(initialData?.role || "");
  const [level, setLevel] = useState<string>(initialData?.level || EXPERIENCE_LEVELS[2]);
  const [techStackInput, setTechStackInput] = useState<string>(initialData?.techstack || "");
  const [interviewType, setInterviewType] = useState<string>(initialData?.type || INTERVIEW_TYPES[0]);
  const [amount, setAmount] = useState<string>(initialData?.amount?.toString() || "5");

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Internal loading state for API call
  const [apiStatusMessage, setApiStatusMessage] = useState<ApiStatusMessage | null>(null);

  const handleTechStackChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTechStackInput(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
        const numVal = parseInt(val, 10);
        if (numVal > 20) setAmount("20");
        else if (val === "" || numVal >= 1) setAmount(val);
        else if (numVal < 1 && val !== "") setAmount("1");
    } else if (val === "") setAmount("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!role.trim()) {
        alert("Please specify a role.");
        return;
    }
    if (!amount || parseInt(amount) < 1) {
        alert("Please specify a valid number of questions (at least 1).");
        return;
    }

    setIsLoading(true);
    setApiStatusMessage(null); // Clear previous messages

    const techstackArray = techStackInput
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech !== "");

    const payload: FormData = {
      role: role.trim(),
      type: interviewType,
      level: level,
      techstack: techStackInput,
      amount: parseInt(amount, 10),
      userid: id,
      username: username,
    };

    // --- API Call ---
    const apiEndpoint = "/api/vapi/generate"; // Use relative path for internal API

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok) {
        setApiStatusMessage({
          text: responseData.message || 'Interview questions generated successfully!',
          type: 'success'
        });
        setTimeout(() => {
          router.push('/');
        }, 2000); // Redirect after 2 seconds
      } else {
        setApiStatusMessage({
          text: responseData.error || 'Failed to generate interview questions.',
          type: 'error'
        });
        // As per requirement, redirect even on failure
        setTimeout(() => {
          router.push('/');
        }, 3000); // Longer delay for error message
      }
    } catch (error) {
      console.error('API request failed:', error);
      setApiStatusMessage({
        text: 'An unexpected network error occurred. Please try again.',
        type: 'error'
      });
      // As per requirement, redirect even on failure
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } finally {
      // We set isLoading to false here so the UI updates to show the message
      // before the redirect timeout completes.
      setIsLoading(false);
    }
  };

  const currentIsLoading = isLoading || isLoadingExternal; // Combine internal and external loading

  const formSectionClass = "bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-700/50";
  const labelClass = "block text-sm font-medium text-slate-300 mb-2 flex items-center";
  const inputBaseClass = "w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-slate-100 placeholder-slate-400";
  const buttonGroupContainerClass = "grid grid-cols-2 sm:grid-cols-3 gap-3";
  const buttonGroupItemClass = (isSelected: boolean) => cn(
    "px-3 py-3 text-sm font-medium rounded-lg border transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 text-center",
    isSelected
      ? "bg-indigo-600 border-indigo-500 text-white shadow-md"
      : "bg-slate-700/50 border-slate-600/50 hover:bg-slate-600/50 hover:border-slate-500 text-slate-300 hover:text-slate-100",
    currentIsLoading && "opacity-60 cursor-not-allowed"
  );

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-3">
          Interview Setup
        </h1>
        <p className="text-slate-400 text-lg">
          Configure your mock interview or question generation criteria.
        </p>
      </div>

      {/* API Status Message Display */}
      {apiStatusMessage && (
        <div
          className={cn(
            "p-4 rounded-md text-sm shadow-md backdrop-blur-sm",
            apiStatusMessage.type === 'success'
              ? "bg-green-600/80 border border-green-500/50 text-white"
              : "bg-red-600/80 border border-red-500/50 text-white"
          )}
          role="alert"
        >
          {apiStatusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Role */}
        <div className={formSectionClass}>
          <label htmlFor="role" className={labelClass}>
            <FiBriefcase className="mr-2 text-indigo-400" /> Target Role
          </label>
          <div className="relative">
            <input
              type="text" id="role" value={role}
              onChange={(e) => { setRole(e.target.value); setShowRoleDropdown(true); }}
              onFocus={() => setShowRoleDropdown(true)}
              placeholder="e.g., Frontend Developer" className={inputBaseClass}
              required disabled={currentIsLoading}
            />
            {showRoleDropdown && role.length < 25 && (
              <div className="absolute z-10 w-full mt-1 bg-slate-700/90 border border-slate-600/50 rounded-md shadow-lg max-h-48 overflow-y-auto backdrop-blur-sm">
                {COMMON_ROLES.filter(r => r.toLowerCase().includes(role.toLowerCase())).map(r => (
                  <div key={r} className="px-4 py-2 text-slate-200 hover:bg-indigo-600/70 cursor-pointer"
                    onClick={() => { setRole(r); setShowRoleDropdown(false); }}>{r}</div>
                ))}
                {COMMON_ROLES.filter(r => r.toLowerCase().includes(role.toLowerCase())).length === 0 && role.length > 0 && (
                  <div className="px-4 py-2 text-slate-400">No suggestions, type your custom role.</div>
                )}
              </div>
            )}
          </div>
          <button type="button" onClick={() => setShowRoleDropdown(false)} className={cn("fixed inset-0 z-0", !showRoleDropdown && "hidden")}></button>
        </div>

        {/* Interview Type */}
        <div className={formSectionClass}>
          <label className={labelClass}><FiLayers className="mr-2 text-indigo-400" /> Interview Type</label>
          <div className={buttonGroupContainerClass}>
            {INTERVIEW_TYPES.map((typeOption) => (
              <button type="button" key={typeOption}
                onClick={() => !currentIsLoading && setInterviewType(typeOption)}
                className={buttonGroupItemClass(interviewType === typeOption)}
                disabled={currentIsLoading}>
                {typeOption}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className={formSectionClass}>
          <label className={labelClass}><FiUser className="mr-2 text-indigo-400" /> Experience Level</label>
          <div className={buttonGroupContainerClass}>
            {EXPERIENCE_LEVELS.map((levelOption) => (
              <button type="button" key={levelOption}
                onClick={() => !currentIsLoading && setLevel(levelOption)}
                className={buttonGroupItemClass(level === levelOption)}
                disabled={currentIsLoading}>
                {levelOption}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className={formSectionClass}>
          <label htmlFor="techstack" className={labelClass}><FiCpu className="mr-2 text-indigo-400" /> Tech Stack / Keywords</label>
          <input type="text" id="techstack" value={techStackInput}
            onChange={handleTechStackChange}
            placeholder="e.g., Next.js, React, TypeScript, Python"
            className={inputBaseClass} disabled={currentIsLoading}
          />
          <p className="mt-2 text-xs text-slate-500">Comma-separated (e.g., react, node, aws).</p>
        </div>

        {/* Amount of Questions */}
        <div className={formSectionClass}>
          <label htmlFor="amount" className={labelClass}><FiList className="mr-2 text-indigo-400" /> Number of Questions</label>
          <input type="text" inputMode="numeric" id="amount" value={amount}
            onChange={handleAmountChange} placeholder="e.g., 5"
            className={`${inputBaseClass} w-full sm:w-1/2`}
            min="1" max="20" required disabled={currentIsLoading}
          />
          <p className="mt-2 text-xs text-slate-500">How many questions (1-20).</p>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button type="submit"
            disabled={currentIsLoading || !role.trim() || !amount || parseInt(amount) < 1}
            className={cn(
              "w-full flex items-center justify-center px-6 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition duration-150 ease-in-out backdrop-blur-sm",
              (currentIsLoading || !role.trim() || !amount || parseInt(amount) < 1) && "opacity-50 cursor-not-allowed"
            )}>
            {currentIsLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : "Generate Scenario"}
          </button>
        </div>
      </form>
    </div>
  );
}