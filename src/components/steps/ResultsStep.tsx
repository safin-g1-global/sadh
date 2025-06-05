import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Activity, AlertTriangle } from 'lucide-react';

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
  onReset 
}) => {
  // Calculate diabetes risk score (simplified)
  const calculateDiabetesScore = () => {
    let score = 0;
    if (diabetesData.abdominalObesity === 'high') score += 4;
    else if (diabetesData.abdominalObesity === 'elevated') score += 2;
    
    if (diabetesData.physicalActivity === 'sedentary') score += 2;
    else if (diabetesData.physicalActivity === 'irregular') score += 1;
    
    if (diabetesData.familyHistory === 'immediate') score += 5;
    else if (diabetesData.familyHistory === 'distant') score += 2;
    
    return score;
  };

  // Calculate heart health risk (simplified)
  const calculateHeartRisk = () => {
    let yesCount = 0;
    if (heartHealthData.highBloodPressure === 'Yes') yesCount++;
    if (heartHealthData.cholesterol === 'Yes') yesCount++;
    if (heartHealthData.diabetes === 'Yes') yesCount++;
    if (heartHealthData.smoking === 'Yes currently' || heartHealthData.smoking === 'Yes in the past') yesCount++;
    if (heartHealthData.physicalActivity === 'No') yesCount++;
    if (heartHealthData.familyHeartHistory === 'Yes') yesCount++;
    
    return yesCount;
  };

  const diabetesScore = calculateDiabetesScore();
  const heartRiskScore = calculateHeartRisk();

  const getDiabetesRiskCategory = (score: number) => {
    if (score <= 3) return 'Low Risk';
    if (score <= 6) return 'Moderate Risk';
    return 'High Risk';
  };

  const getHeartRiskCategory = (score: number) => {
    if (score <= 1) return 'Low Risk';
    if (score <= 3) return 'Elevated Risk (Poor or Fair)';
    return 'High Risk';
  };

  const getDiabetesRiskColor = (score: number) => {
    if (score <= 3) return 'from-[#285D3C] to-[#C7D33C]';
    if (score <= 6) return 'from-[#E68137] to-[#CA4F38]';
    return 'from-[#C0363A] to-[#90292A]';
  };

  const getHeartRiskColor = (score: number) => {
    if (score <= 1) return 'from-[#285D3C] to-[#C7D33C]';
    if (score <= 3) return 'from-[#E68137] to-[#CA4F38]';
    return 'from-[#C0363A] to-[#90292A]';
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-10">
      <div className="flex justify-between items-start mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#1A6A87] via-[#11A8DF] to-[#3B4295] bg-clip-text text-transparent">
          Risk Assessment Results
        </h2>
        <Button 
          onClick={onReset}
          className="bg-gradient-to-r from-[#1A6A87] to-[#11A8DF] hover:from-[#11A8DF] hover:to-[#3B4295] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Start Over
        </Button>
      </div>

      <div className="bg-gradient-to-r from-[#1A6A87]/10 to-[#11A8DF]/10 rounded-2xl p-8 mb-10 border border-[#1A6A87]/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-semibold text-gray-700 mb-3 text-lg">Participant Name</h3>
            <p className="text-[#1A6A87] font-bold text-xl">
              {demographicData.firstName} {demographicData.lastName}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-semibold text-gray-700 mb-3 text-lg">Gender</h3>
            <p className="text-[#1A6A87] font-bold text-xl capitalize">
              {demographicData.gender}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-semibold text-gray-700 mb-3 text-lg">Assessment Date</h3>
            <p className="text-gray-600 font-semibold text-lg">{currentDate}</p>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <div className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-[#3B4295]">
          <div className="flex items-center mb-6">
            <Activity className="w-8 h-8 text-[#3B4295] mr-4" />
            <h3 className="text-3xl font-bold text-gray-900">
              Indian Diabetes Risk Score (IDRS)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-xl font-semibold text-gray-700">Total Score:</span>
                <span className={`text-4xl font-bold bg-gradient-to-r ${getDiabetesRiskColor(diabetesScore)} bg-clip-text text-transparent`}>
                  {diabetesScore}
                </span>
              </div>
              <div className={`inline-block px-6 py-3 rounded-full text-white font-semibold text-lg bg-gradient-to-r ${getDiabetesRiskColor(diabetesScore)}`}>
                {getDiabetesRiskCategory(diabetesScore)}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${getDiabetesRiskColor(diabetesScore)} flex items-center justify-center shadow-xl`}>
                <span className="text-white text-3xl font-bold">{diabetesScore}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-[#C0363A]">
          <div className="flex items-center mb-6">
            <Heart className="w-8 h-8 text-[#C0363A] mr-4" />
            <h3 className="text-3xl font-bold text-gray-900">
              Heart Health Risk Assessment
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-xl font-semibold text-gray-700">Risk Factors:</span>
                <span className={`text-4xl font-bold bg-gradient-to-r ${getHeartRiskColor(heartRiskScore)} bg-clip-text text-transparent`}>
                  {heartRiskScore}
                </span>
              </div>
              <div className={`inline-block px-6 py-3 rounded-full text-white font-semibold text-lg bg-gradient-to-r ${getHeartRiskColor(heartRiskScore)}`}>
                {getHeartRiskCategory(heartRiskScore)}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${getHeartRiskColor(heartRiskScore)} flex items-center justify-center shadow-xl`}>
                <span className="text-white text-3xl font-bold">{heartRiskScore}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#E68137]/10 to-[#CA4F38]/10 border-2 border-[#E68137]/20 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-8 h-8 text-[#CA4F38] mr-4" />
            <h3 className="text-2xl font-bold text-gray-900">Important Notice</h3>
          </div>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li className="flex items-start">
              <span className="text-[#CA4F38] mr-3 text-xl">•</span>
              These are preliminary screening test scores, not a diagnosis.
            </li>
            <li className="flex items-start">
              <span className="text-[#CA4F38] mr-3 text-xl">•</span>
              Results should be reviewed and confirmed by your Primary Care Physician.
            </li>
            <li className="flex items-start">
              <span className="text-[#CA4F38] mr-3 text-xl">•</span>
              For follow-up and additional guidance, contact the South Asian Center for Diabetes & Heart Health:
            </li>
          </ul>
          <div className="mt-6 text-center bg-white rounded-xl p-6 shadow-md">
            <p className="text-[#1A6A87] font-bold text-2xl mb-2">+1732-947-4383</p>
            <p className="text-[#1A6A87] font-bold text-xl">diabetes@sknfoundation.org</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsStep;
