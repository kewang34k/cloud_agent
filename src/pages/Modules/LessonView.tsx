import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, ArrowRight, Check, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

// Mock lesson data
const LESSON_DATA = [
  {
    id: 1,
    type: "vocab",
    question: "How do you say 'Hello'?",
    options: ["Konnichiwa", "Sayonara", "Arigato", "Sumimasen"],
    correct: 0,
  },
  {
    id: 2,
    type: "listening",
    audioUrl: "#", // Mock
    question: "What did you hear?",
    options: ["Good morning", "Good evening", "Good night", "Goodbye"],
    correct: 0,
  },
  {
    id: 3,
    type: "shadowing",
    phrase: "Watashi wa gakusei desu.",
    translation: "I am a student.",
  }
];

export default function LessonView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addXp, completeModule } = useStore();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const lesson = LESSON_DATA[currentStep];
  const isLastStep = currentStep === LESSON_DATA.length - 1;

  const handleCheck = () => {
    if (lesson.type === "shadowing") {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setIsAnswered(true);
      }, 2000);
      return;
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (isLastStep) {
      addXp(50);
      if (id) completeModule(id, "lesson-1", 100);
      navigate("/dashboard");
    } else {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const progressPercentage = ((currentStep + 1) / LESSON_DATA.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Header Progress */}
      <div className="flex items-center justify-between mb-12">
        <button onClick={() => navigate(-1)} className="text-zinc-400 hover:text-zinc-600">
          <X className="h-6 w-6" />
        </button>
        <div className="flex-1 mx-8">
          <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        <div className="text-indigo-600 font-bold">
          {currentStep + 1} / {LESSON_DATA.length}
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-[400px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            {lesson.type === "vocab" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-zinc-900 text-center">{lesson.question}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {lesson.options?.map((opt, i) => {
                    const isSelected = selectedOption === i;
                    const isCorrect = i === lesson.correct;
                    let btnClass = "border-zinc-200 hover:border-indigo-300 hover:bg-indigo-50 text-zinc-700";
                    
                    if (isAnswered) {
                      if (isCorrect) btnClass = "border-emerald-500 bg-emerald-50 text-emerald-700";
                      else if (isSelected && !isCorrect) btnClass = "border-red-500 bg-red-50 text-red-700";
                      else btnClass = "border-zinc-200 opacity-50";
                    } else if (isSelected) {
                      btnClass = "border-indigo-500 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500 ring-offset-2";
                    }

                    return (
                      <button
                        key={i}
                        disabled={isAnswered}
                        onClick={() => setSelectedOption(i)}
                        className={cn("p-6 text-lg font-medium rounded-2xl border-2 transition-all", btnClass)}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {lesson.type === "listening" && (
              <div className="space-y-8 text-center">
                <h2 className="text-3xl font-bold text-zinc-900">{lesson.question}</h2>
                <button className="mx-auto h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors">
                  <Volume2 className="h-10 w-10 text-indigo-600" />
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {lesson.options?.map((opt, i) => {
                    const isSelected = selectedOption === i;
                    return (
                      <button
                        key={i}
                        disabled={isAnswered}
                        onClick={() => setSelectedOption(i)}
                        className={cn(
                          "p-4 text-lg font-medium rounded-2xl border-2 transition-all",
                          isSelected ? "border-indigo-500 bg-indigo-50" : "border-zinc-200 hover:border-indigo-300"
                        )}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {lesson.type === "shadowing" && (
              <div className="space-y-12 text-center">
                <div>
                  <h2 className="text-4xl font-bold text-zinc-900 mb-4">{lesson.phrase}</h2>
                  <p className="text-xl text-zinc-500">{lesson.translation}</p>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={handleCheck}
                    disabled={isRecording || isAnswered}
                    className={cn(
                      "relative h-32 w-32 rounded-full flex items-center justify-center transition-all",
                      isRecording ? "bg-red-100" : isAnswered ? "bg-emerald-100" : "bg-indigo-100 hover:bg-indigo-200",
                      isRecording && "animate-pulse"
                    )}
                  >
                    {isRecording && <span className="absolute inset-0 rounded-full ring-4 ring-red-500 animate-ping"></span>}
                    {isAnswered ? (
                      <Check className="h-12 w-12 text-emerald-600" />
                    ) : (
                      <Mic className={cn("h-12 w-12", isRecording ? "text-red-600" : "text-indigo-600")} />
                    )}
                  </button>
                </div>
                <p className="text-zinc-500">
                  {isRecording ? "Listening..." : isAnswered ? "Great pronunciation!" : "Tap to speak"}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-zinc-200 md:relative md:bg-transparent md:border-t-0 md:mt-12">
        <div className="max-w-3xl mx-auto">
          {!isAnswered ? (
            <button
              onClick={handleCheck}
              disabled={selectedOption === null && lesson.type !== "shadowing"}
              className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Check
            </button>
          ) : (
            <div className={cn(
              "p-4 rounded-2xl flex items-center justify-between",
              (lesson.type === "shadowing" || selectedOption === lesson.correct) 
                ? "bg-emerald-100 text-emerald-800" 
                : "bg-red-100 text-red-800"
            )}>
              <div className="flex flex-col">
                <span className="font-bold text-lg">
                  {(lesson.type === "shadowing" || selectedOption === lesson.correct) ? "Excellent!" : "Not quite right"}
                </span>
              </div>
              <button
                onClick={handleNext}
                className={cn(
                  "px-8 py-3 rounded-xl font-bold text-white transition-colors",
                  (lesson.type === "shadowing" || selectedOption === lesson.correct) 
                    ? "bg-emerald-500 hover:bg-emerald-600" 
                    : "bg-red-500 hover:bg-red-600"
                )}
              >
                {isLastStep ? "Finish" : "Continue"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
