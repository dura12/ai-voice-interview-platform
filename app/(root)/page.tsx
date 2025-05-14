import Link from "next/link";
import Image from "next/image";
import { FiInbox } from "react-icons/fi"; // ✅ Importing react-icons

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/interviewcard";

import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/auth.actions";

async function Home() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user.id),
    getLatestInterviews({ userId: user.id }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      {/* Hero Section */}
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/generate">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* Past Interviews Section */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                {...interview}
                currentUserId={user.id}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
              <FiInbox size={48} />
              <p className="mt-4 text-lg font-semibold">No interviews found</p>
              <p className="text-sm text-gray-400">Start an interview to see it here!</p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Interviews Section */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Look for Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                {...interview}
                currentUserId={user.id}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
              <FiInbox size={48} />
              <p className="mt-4 text-lg font-semibold">No available interviews</p>
              <p className="text-sm text-gray-400">New interviews will appear here soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;