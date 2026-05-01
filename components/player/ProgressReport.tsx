"use client";

import { useState, useRef } from "react";

type SubmitType = "coach" | "online";
type SubmitState = "idle" | "submitting" | "success";

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function ProgressReport() {
  const [report, setReport] = useState("");
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitType, setSubmitType] = useState<SubmitType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVideoFile(file.name);
  };

  const handleSubmit = (type: SubmitType) => {
    if (!report.trim()) return;
    setSubmitType(type);
    setSubmitState("submitting");
    setTimeout(() => {
      setSubmitState("success");
    }, 1200);
  };

  const handleReset = () => {
    setReport("");
    setVideoFile(null);
    setSubmitState("idle");
    setSubmitType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (submitState === "success") {
    const isOnline = submitType === "online";
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-green-950 mb-2">
          {isOnline ? "Request Sent!" : "Report Sent!"}
        </h3>
        <p className="text-sm text-gray-600 max-w-sm mx-auto mb-5">
          {isOnline
            ? "A Tennis Sprouts online coach will review your report and video and send feedback within 48 hours."
            : "Your coach has received your progress update and will respond at your next session or sooner."}
        </p>
        <button
          onClick={handleReset}
          className="text-sm font-semibold text-green-700 hover:text-green-900 transition-colors"
        >
          Submit another report
        </button>
      </div>
    );
  }

  const canSubmit = report.trim().length > 0;
  const isSubmitting = submitState === "submitting";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-green-950">Report Progress</h2>
          <p className="text-xs text-gray-500">Log an update and optionally attach a training video</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Text report */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            How&apos;s it going?
          </label>
          <textarea
            value={report}
            onChange={(e) => setReport(e.target.value)}
            rows={4}
            placeholder="What have you been working on? Any wins, challenges, or questions? The more detail the better..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1.5 text-right">{report.length} characters</p>
        </div>

        {/* Video upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Training Video <span className="font-normal text-gray-400">(optional)</span>
          </label>

          {videoFile ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-200">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-800 truncate">{videoFile}</p>
                <p className="text-xs text-green-600">Ready to attach</p>
              </div>
              <button
                onClick={() => { setVideoFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center gap-2 hover:border-green-400 hover:bg-green-50 transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-green-100 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-500 group-hover:text-green-700 transition-colors">Click to attach a video</p>
              <p className="text-xs text-gray-400">MP4, MOV, AVI — up to 500 MB</p>
            </button>
          )}

          <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
        </div>

        {/* ── Two action buttons ── */}
        <div className="pt-1 space-y-3">

          {/* Send to My Coach */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleSubmit("coach")}
              disabled={!canSubmit || isSubmitting}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0 ${
                canSubmit && !isSubmitting
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-sm"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting && submitType === "coach" ? <Spinner /> : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              Send to My Coach
            </button>
            <p className="text-xs text-gray-400 leading-tight">
              Your assigned coach sees this automatically — no email needed.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Request Online Coaching */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleSubmit("online")}
              disabled={!canSubmit || isSubmitting}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all shrink-0 ${
                canSubmit && !isSubmitting
                  ? "border-green-600 text-green-700 hover:bg-green-50"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting && submitType === "online" ? <Spinner /> : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
              )}
              Request Online Coaching
            </button>
            <p className="text-xs text-gray-400 leading-tight">
              Training independently? Get expert feedback from a Tennis Sprouts online coach.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
