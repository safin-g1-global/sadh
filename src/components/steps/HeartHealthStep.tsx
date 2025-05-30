
import React from 'react';
import FormField from '../FormField';
import { Button } from '@/components/ui/button';

interface HeartHealthData {
  highBloodPressure: string;
  cholesterol: string;
  diabetes: string;
  smoking: string;
  physicalActivity: string;
  familyHeartHistory: string;
}

interface HeartHealthStepProps {
  data: HeartHealthData;
  updateData: (data: Partial<HeartHealthData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const HeartHealthStep: React.FC<HeartHealthStepProps> = ({ data, updateData, onNext, onPrevious }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const RadioGroup: React.FC<{ 
    name: string; 
    value: string; 
    onChange: (value: string) => void; 
    options: string[];
  }> = ({ name, value, onChange, options }) => (
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-3 cursor-pointer group">
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <span className={`px-6 py-3 border-2 rounded-xl font-medium transition-all duration-300 ${
            value === option 
              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-500 shadow-lg' 
              : 'bg-white hover:bg-blue-50 border-gray-300 hover:border-blue-300 text-gray-700'
          }`}>
            {option}
          </span>
        </label>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <FormField label="Do you have high blood pressure (hypertension) history?" required>
        <RadioGroup
          name="highBloodPressure"
          value={data.highBloodPressure}
          onChange={(value) => updateData({ highBloodPressure: value })}
          options={['Yes', 'No', 'Not sure']}
        />
      </FormField>

      <FormField label="Have you ever been diagnosed with high cholesterol or been told you have abnormal lipid level?" required>
        <RadioGroup
          name="cholesterol"
          value={data.cholesterol}
          onChange={(value) => updateData({ cholesterol: value })}
          options={['Yes', 'No', 'Not sure']}
        />
      </FormField>

      <FormField label="Do you have diabetes or prediabetes?" required>
        <RadioGroup
          name="diabetes"
          value={data.diabetes}
          onChange={(value) => updateData({ diabetes: value })}
          options={['Yes', 'No', 'Not sure']}
        />
      </FormField>

      <FormField label="Do you currently smoke or have a history of smoking?" required>
        <RadioGroup
          name="smoking"
          value={data.smoking}
          onChange={(value) => updateData({ smoking: value })}
          options={['Yes currently', 'Yes in the past', 'No']}
        />
      </FormField>

      <FormField label="Do you engage in regular physical activity (e.g., at least 150 minutes of moderate activity per week)?" required>
        <RadioGroup
          name="physicalActivity"
          value={data.physicalActivity}
          onChange={(value) => updateData({ physicalActivity: value })}
          options={['Yes', 'No']}
        />
      </FormField>

      <FormField label="Does anyone in your immediate family (parents, siblings) have a history of heart disease or heart attack before age 55 (for men) or 65 (for women)?" required>
        <RadioGroup
          name="familyHeartHistory"
          value={data.familyHeartHistory}
          onChange={(value) => updateData({ familyHeartHistory: value })}
          options={['Yes', 'No', 'Not sure']}
        />
      </FormField>

      <div className="flex justify-between pt-8">
        <Button 
          type="button" 
          onClick={onPrevious}
          variant="outline" 
          className="px-10 py-4 text-lg font-semibold rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
        >
          ← Previous
        </Button>
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Complete Assessment
        </Button>
      </div>
    </form>
  );
};

export default HeartHealthStep;
