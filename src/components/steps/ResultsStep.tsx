
import React from 'react';
import { Button } from '@/components/ui/button';

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

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-3xl font-bold text-blue-900">Risk Test Results</h2>
        <Button 
          onClick={onReset}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          Go to Home
        </Button>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Participant Name:</h3>
            <p className="text-blue-600 font-semibold text-lg">
              {demographicData.firstName} {demographicData.lastName}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Gender:</h3>
            <p className="text-blue-600 font-semibold text-lg capitalize">
              {demographicData.gender}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Date:</h3>
            <p className="text-gray-600">{currentDate}</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="border-l-4 border-blue-600 pl-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Indian Diabetes Risk Score (IDRS)
          </h3>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Total Score: </span>
              <span className="text-blue-600 font-bold text-xl">{diabetesScore}</span>
            </p>
            <p className="text-lg">
              Your score places you in the{' '}
              <span className="font-semibold underline">
                {getDiabetesRiskCategory(diabetesScore)}
              </span>{' '}
              category for diabetes risk.
            </p>
          </div>
        </div>

        <div className="border-l-4 border-blue-600 pl-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Heart Health Risk Questionnaire
          </h3>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Number of "Yes" answers: </span>
              <span className="text-blue-600 font-bold text-xl">{heartRiskScore}</span>
            </p>
            <p className="text-lg">
              Your score places you in the{' '}
              <span className="font-semibold underline">
                {getHeartRiskCategory(heartRiskScore)}
              </span>{' '}
              category for Heart Health Risk.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Please note</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• These are preliminary screening test scores, not a diagnosis.</li>
            <li>• Results should be reviewed and confirmed by your Primary Care Physician.</li>
            <li>• For follow-up and additional guidance, contact the South Asian Center for Diabetes & Heart Health:</li>
          </ul>
          <div className="mt-4 text-center">
            <p className="text-blue-600 font-semibold text-lg">+1732-947-4383</p>
            <p className="text-blue-600 font-semibold">diabetes@sknfoundation.org</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsStep;
