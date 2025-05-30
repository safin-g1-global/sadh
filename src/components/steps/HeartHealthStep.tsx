
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
        <label key={option} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="px-4 py-2 border rounded-full bg-white hover:bg-gray-50 transition-colors">
            {option}
          </span>
        </label>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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

      <div className="flex justify-between pt-6">
        <Button 
          type="button" 
          onClick={onPrevious}
          variant="outline" 
          className="px-8 py-3"
        >
          Previous
        </Button>
        <Button type="submit" className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default HeartHealthStep;
