
import React from 'react';
import FormField from '../FormField';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormField label="High Blood Pressure" required>
        <Select value={data.highBloodPressure} onValueChange={(value) => updateData({ highBloodPressure: value })}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg">
            <SelectValue placeholder="Select your blood pressure status" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2">
            <SelectItem value="normal">Normal (&lt;120/80 mmHg)</SelectItem>
            <SelectItem value="elevated">Elevated (120-129/&lt;80 mmHg)</SelectItem>
            <SelectItem value="high-stage1">High Stage 1 (130-139/80-89 mmHg)</SelectItem>
            <SelectItem value="high-stage2">High Stage 2 (≥140/≥90 mmHg)</SelectItem>
            <SelectItem value="unknown">Unknown/Not measured recently</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Cholesterol Levels" required>
        <Select value={data.cholesterol} onValueChange={(value) => updateData({ cholesterol: value })}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg">
            <SelectValue placeholder="Select your cholesterol status" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2">
            <SelectItem value="normal">Normal (&lt;200 mg/dL)</SelectItem>
            <SelectItem value="borderline">Borderline high (200-239 mg/dL)</SelectItem>
            <SelectItem value="high">High (≥240 mg/dL)</SelectItem>
            <SelectItem value="unknown">Unknown/Not tested recently</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Diabetes Status" required>
        <Select value={data.diabetes} onValueChange={(value) => updateData({ diabetes: value })}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg">
            <SelectValue placeholder="Select your diabetes status" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2">
            <SelectItem value="no">No diabetes</SelectItem>
            <SelectItem value="prediabetes">Prediabetes</SelectItem>
            <SelectItem value="type1">Type 1 diabetes</SelectItem>
            <SelectItem value="type2">Type 2 diabetes</SelectItem>
            <SelectItem value="gestational">Gestational diabetes (current/past)</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Smoking Status" required>
        <Select value={data.smoking} onValueChange={(value) => updateData({ smoking: value })}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg">
            <SelectValue placeholder="Select your smoking status" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2">
            <SelectItem value="never">Never smoked</SelectItem>
            <SelectItem value="former">Former smoker (quit &gt;1 year ago)</SelectItem>
            <SelectItem value="recent-former">Recent former smoker (quit &lt;1 year ago)</SelectItem>
            <SelectItem value="current">Current smoker</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Physical Activity Level" required>
        <Select value={data.physicalActivity} onValueChange={(value) => updateData({ physicalActivity: value })}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg">
            <SelectValue placeholder="Select your activity level" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2">
            <SelectItem value="high">High (≥300 min moderate or ≥150 min vigorous per week)</SelectItem>
            <SelectItem value="moderate">Moderate (150-299 min moderate or 75-149 min vigorous per week)</SelectItem>
            <SelectItem value="low">Low (&lt;150 min moderate or &lt;75 min vigorous per week)</SelectItem>
            <SelectItem value="sedentary">Sedentary (minimal physical activity)</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Family History of Heart Disease" required>
        <Select value={data.familyHeartHistory} onValueChange={(value) => updateData({ familyHeartHistory: value })}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg">
            <SelectValue placeholder="Select family history" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2">
            <SelectItem value="none">No known family history</SelectItem>
            <SelectItem value="distant">Distant relatives only</SelectItem>
            <SelectItem value="immediate-late">Immediate family (after age 60)</SelectItem>
            <SelectItem value="immediate-early">Immediate family (before age 60)</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <div className="flex justify-between pt-6">
        <Button 
          type="button" 
          onClick={onPrevious}
          variant="outline" 
          className="px-6 py-3 text-base font-medium rounded-lg border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
        >
          Previous
        </Button>
        <Button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
        >
          Next Step
        </Button>
      </div>
    </form>
  );
};

export default HeartHealthStep;
