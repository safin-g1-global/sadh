
import React from 'react';
import FormField from '../FormField';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DiabetesData {
  abdominalObesity: string;
  physicalActivity: string;
  familyHistory: string;
}

interface DiabetesStepProps {
  data: DiabetesData;
  updateData: (data: Partial<DiabetesData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const DiabetesStep: React.FC<DiabetesStepProps> = ({ data, updateData, onNext, onPrevious }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormField label="Abdominal Obesity/Waist Circumference" required>
        <Select value={data.abdominalObesity} onValueChange={(value) => updateData({ abdominalObesity: value })}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg">
            <SelectValue placeholder="Select your waist measurement category" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2">
            <SelectItem value="normal">Normal (Men: &lt;37 inches, Women: &lt;31.5 inches)</SelectItem>
            <SelectItem value="elevated">Elevated (Men: 37-40 inches, Women: 31.5-35 inches)</SelectItem>
            <SelectItem value="high">High (Men: &gt;40 inches, Women: &gt;35 inches)</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Physical Activity" required>
        <Select value={data.physicalActivity} onValueChange={(value) => updateData({ physicalActivity: value })}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg">
            <SelectValue placeholder="Select your activity level" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2">
            <SelectItem value="regular">Regular physical activity (≥150 min/week)</SelectItem>
            <SelectItem value="irregular">Irregular physical activity</SelectItem>
            <SelectItem value="sedentary">Sedentary lifestyle</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Family History of Diabetes" required>
        <Select value={data.familyHistory} onValueChange={(value) => updateData({ familyHistory: value })}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg">
            <SelectValue placeholder="Select family history" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2">
            <SelectItem value="none">No known family history</SelectItem>
            <SelectItem value="distant">Distant relatives (grandparents, aunts, uncles, cousins)</SelectItem>
            <SelectItem value="immediate">Immediate family (parents, siblings, children)</SelectItem>
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

export default DiabetesStep;
