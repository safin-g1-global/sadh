import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Activity, AlertTriangle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ResultsStepProps {
  demographicData: any;
  diabetesData: any;
  heartHealthData: any;
  onReset: () => void;
}

const ResultsStep: React.FC<ResultsStepProps> = ({
  demographicData,
  diabetesData,
  heartHealthData,
  onReset,
}) => {
  const navigate = useNavigate();

  // Calculate diabetes risk score using the new formula
  const calculateDiabetesScore = () => {
    let score = 0;
    // Age
    if (demographicData.age === "<33") score += 0;
    else if (demographicData.age === "35-49") score += 20;
    else if (demographicData.age === ">=50") score += 30;

    // Waist (gender-specific)
    if (demographicData.gender === "male") {
      if (diabetesData.waist === "<90") score += 0;
      else if (diabetesData.waist === "90-99") score += 10;
      else if (diabetesData.waist === ">=100") score += 20;
    } else {
      // Female or other: use stricter cutoffs
      if (diabetesData.waist === "<80") score += 0;
      else if (diabetesData.waist === "80-89") score += 10;
      else if (diabetesData.waist === ">=90") score += 20;
    }

    // Activity Type
    if (diabetesData.activityType === "vigorous") score += 0;
    else if (diabetesData.activityType === "moderate") score += 10;
    else if (diabetesData.activityType === "mild") score += 20;
    else if (diabetesData.activityType === "none") score += 30;

    // Family history
    if (diabetesData.familyDiabetesHistory === "none") score += 0;
    else if (diabetesData.familyDiabetesHistory === "one") score += 10;
    else if (diabetesData.familyDiabetesHistory === "both") score += 20;

    return score;
  };

  // Calculate heart health risk using the new formula
  const calculateHeartRisk = () => {
    let yesCount = 0;
    if (heartHealthData.hypertension === "yes") yesCount++;
    if (heartHealthData.cholesterol === "yes") yesCount++;
    if (heartHealthData.diabetes === "yes") yesCount++;
    if (
      heartHealthData.smoking === "current" ||
      heartHealthData.smoking === "past"
    )
      yesCount++;
    if (heartHealthData.activity === "yes") yesCount++;
    if (heartHealthData.familyHeartDiseaseHistory === "yes") yesCount++;
    return yesCount;
  };

  const diabetesScore = calculateDiabetesScore();
  const heartRiskScore = calculateHeartRisk();

  const getDiabetesRiskCategory = (score: number) => {
    if (score >= 60) return "High Risk";
    if (score >= 30) return "Moderate Risk";
    return "Low Risk";
  };

  const getHeartRiskCategory = (score: number) => {
    if (score >= 2) return "Elevated Risk (Poor or Fair)";
    return "Low Risk (Good)";
  };

  const getDiabetesRiskColor = (score: number) => {
    if (score >= 60) return "from-red-500 to-pink-600";
    if (score >= 30) return "from-yellow-500 to-orange-500";
    return "from-green-500 to-emerald-600";
  };

  const getHeartRiskColor = (score: number) => {
    if (score >= 2) return "from-yellow-500 to-orange-500";
    return "from-green-500 to-emerald-600";
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent text-center md:text-left">
          Risk Assessment Results
        </h2>
        <div className="flex justify-center md:justify-end gap-4">
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 md:px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Home
          </Button>
          <Button
            onClick={onReset}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 md:px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Over
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-10 border border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-semibold text-gray-700 mb-3 text-lg">
              Participant Name
            </h3>
            <p className="text-blue-600 font-bold text-xl">
              {demographicData.firstName} {demographicData.lastName}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-semibold text-gray-700 mb-3 text-lg">Gender</h3>
            <p className="text-blue-600 font-bold text-xl capitalize">
              {demographicData.gender}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-semibold text-gray-700 mb-3 text-lg">
              Assessment Date
            </h3>
            <p className="text-gray-600 font-semibold text-lg">{currentDate}</p>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <div className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-blue-500">
          <div className="flex items-center mb-6">
            <Activity className="w-8 h-8 text-blue-600 mr-4" />
            <h3 className="text-3xl font-bold text-gray-900">
              Indian Diabetes Risk Score (IDRS)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-xl font-semibold text-gray-700">
                  Total Score:
                </span>
                <span
                  className={`text-4xl font-bold bg-gradient-to-r ${getDiabetesRiskColor(
                    diabetesScore
                  )} bg-clip-text text-transparent`}
                >
                  {diabetesScore}
                </span>
              </div>
              <div
                className={`inline-block px-6 py-3 rounded-full text-white font-semibold text-lg bg-gradient-to-r ${getDiabetesRiskColor(
                  diabetesScore
                )}`}
              >
                {getDiabetesRiskCategory(diabetesScore)}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div
                className={`w-32 h-32 rounded-full bg-gradient-to-r ${getDiabetesRiskColor(
                  diabetesScore
                )} flex items-center justify-center shadow-xl`}
              >
                <span className="text-white text-3xl font-bold">
                  {diabetesScore}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-red-500">
          <div className="flex items-center mb-6">
            <Heart className="w-8 h-8 text-red-600 mr-4" />
            <h3 className="text-3xl font-bold text-gray-900">
              Heart Health Risk Score
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-xl font-semibold text-gray-700">
                  Risk Factors:
                </span>
                <span
                  className={`text-4xl font-bold bg-gradient-to-r ${getHeartRiskColor(
                    heartRiskScore
                  )} bg-clip-text text-transparent`}
                >
                  {heartRiskScore}
                </span>
              </div>
              <div
                className={`inline-block px-6 py-3 rounded-full text-white font-semibold text-lg bg-gradient-to-r ${getHeartRiskColor(
                  heartRiskScore
                )}`}
              >
                {getHeartRiskCategory(heartRiskScore)}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div
                className={`w-32 h-32 rounded-full bg-gradient-to-r ${getHeartRiskColor(
                  heartRiskScore
                )} flex items-center justify-center shadow-xl`}
              >
                <span className="text-white text-3xl font-bold">
                  {heartRiskScore}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-8 h-8 text-amber-600 mr-4" />
            <h3 className="text-2xl font-bold text-gray-900">Please note</h3>
          </div>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li className="flex items-start">
              <span className="text-amber-600 mr-3 text-xl">•</span>
              These are preliminary screening test scores, not a diagnosis.
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-3 text-xl">•</span>
              Results should be reviewed and confirmed by your Primary Care
              Physician.
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-3 text-xl">•</span>
              For follow-up and additional guidance, contact the South Asian
              Center for Diabetes & Heart Health:
            </li>
          </ul>
          <div className="mt-6 text-center bg-white rounded-xl p-6 shadow-md">
            <p className="text-blue-600 font-bold text-2xl mb-2">
              +1 732-947-4383
            </p>
            <p className="text-blue-600 font-bold text-xl sm:text-xl">
              diabetes@sknfoundation.org
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsStep;
