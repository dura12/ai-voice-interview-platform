import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { Clock, Target, BookOpen } from "lucide-react";

import { Button } from "./ui/button";
import DisplayTechIcons from "./displaytechicons";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/auth.actions";

interface InterviewCardProps {
  id: string;
  userId: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt: string;
  currentUserId: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  duration?: number; // in minutes
  category?: string;
}

const InterviewCard = async ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
  currentUserId,
  difficulty = "Intermediate",
  duration = 30,
  category = "General",
}: InterviewCardProps) => {
  const feedback =
    userId === currentUserId && id
      ? await getFeedbackByInterviewId({
          interviewId: id,
          userId
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-light-400",
      Mixed: "bg-light-600",
      Technical: "bg-light-800",
    }[normalizedType] || "bg-light-600";

  const difficultyColor = {
    Beginner: "bg-green-500",
    Intermediate: "bg-yellow-500",
    Advanced: "bg-red-500",
  }[difficulty];

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
              badgeColor
            )}
          >
            <p className="badge-text">{normalizedType}</p>
          </div>

          {/* Cover Image */}
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          {/* Interview Role */}
          <h3 className="mt-5 capitalize">{role} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{formattedDate}</p>
            </div>

            {userId === currentUserId && (
              <div className="flex flex-row gap-2 items-center">
                <Image src="/star.svg" width={22} height={22} alt="star" />
                <p>{feedback?.totalScore || "---"}/100</p>
              </div>
            )}
          </div>

          {/* New Features Section */}
          <div className="mt-4 space-y-2">
            {/* Difficulty Level */}
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Difficulty:</span>
              <span className={cn("px-2 py-1 rounded text-xs text-white", difficultyColor)}>
                {difficulty}
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Duration:</span>
              <span className="text-sm">{duration} minutes</span>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Category:</span>
              <span className="text-sm">{category}</span>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5">
            {userId === currentUserId 
              ? (feedback?.finalAssessment || "You haven't taken this interview yet. Take it now to improve your skills.")
              : "Take this interview to test your skills."}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />

          <Button className="btn-primary">
            <Link
              href={userId === currentUserId && feedback 
                ? `/interview/${id}/feedback`
                : `/interview/${id}`}
            >
              {userId === currentUserId && feedback 
                ? "Check Feedback" 
                : "Take Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;