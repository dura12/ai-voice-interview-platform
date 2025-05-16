import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ArrowLeft, Star, Calendar, TrendingUp, TrendingDown, Target } from "lucide-react";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.actions";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Interview Feedback
          </h1>
          <p className="text-xl text-slate-300 mt-2 capitalize">
            {interview.role} Interview
          </p>
        </div>

        {/* Score Overview Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700/50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-500/20 p-3 rounded-lg">
                <Star className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-slate-400">Overall Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(feedback?.totalScore || 0)}`}>
                  {feedback?.totalScore || 0}/100
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-400">Interview Date</p>
                <p className="text-lg text-slate-200">
                  {feedback?.createdAt
                    ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Assessment */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700/50">
          <h2 className="text-2xl font-semibold text-white mb-4">Final Assessment</h2>
          <p className="text-slate-300 leading-relaxed">{feedback?.finalAssessment}</p>
        </div>

        {/* Category Scores */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700/50">
          <h2 className="text-2xl font-semibold text-white mb-6">Performance Breakdown</h2>
          <div className="space-y-6">
            {feedback?.categoryScores?.map((category, index) => (
              <div key={index} className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-white">{category.name}</h3>
                  <span className={`text-lg font-bold ${getScoreColor(category.score)}`}>
                    {category.score}/100
                  </span>
                </div>
                <p className="text-slate-300">{category.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths and Areas for Improvement */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Strengths</h2>
            </div>
            <ul className="space-y-3">
              {feedback?.strengths?.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-400 mt-1">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-500/20 p-2 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Areas for Improvement</h2>
            </div>
            <ul className="space-y-3">
              {feedback?.areasForImprovement?.map((area, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <span className="text-red-400 mt-1">•</span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="btn-secondary flex-1 group">
            <Link href="/" className="flex items-center justify-center gap-2 w-full">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </Link>
          </Button>

          <Button className="btn-primary flex-1 group">
            <Link
              href={`/interview/${id}`}
              className="flex items-center justify-center gap-2 w-full"
            >
              <Target className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Retake Interview</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Feedback;