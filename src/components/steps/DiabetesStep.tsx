
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
    <form onSubmit={handleSubmit} className="space-y-10">
      <FormField label="Abdominal Obesity/Waist Circumference" required>
        <Select value={data.abdominalObesity} onValueChange={(value) => updateData({ abdominalObesity: value })}>
          <SelectTrigger className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl">
            <SelectValue placeholder="Select your waist measurement category" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-2">
            <SelectItem value="normal">Normal (Men: &lt;37 inches, Women: &lt;31.5 inches)</SelectItem>
            <SelectItem value="elevated">Elevated (Men: 37-40 inches, Women: 31.5-35 inches)</SelectItem>
            <SelectItem value="high">High (Men: &gt;40 inches, Women: &gt;35 inches)</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Physical Activity" required>
        <Select value={data.physicalActivity} onValueChange={(value) => updateData({ physicalActivity: value })}>
          <SelectTrigger className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl">
            <SelectValue placeholder="Select your activity level" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-2">
            <SelectItem value="regular">Regular physical activity (≥150 min/week)</SelectItem>
            <SelectItem value="irregular">Irregular physical activity</SelectItem>
            <SelectItem value="sedentary">Sedentary lifestyle</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Family History of Diabetes" required>
        <Select value={data.familyHistory} onValueChange={(value) => updateData({ familyHistory: value })}>
          <SelectTrigger className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl">
            <SelectValue placeholder="Select family history" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-2">
            <SelectItem value="none">No known family history</SelectItem>
            <SelectItem value="distant">Distant relatives (grandparents, aunts, uncles, cousins)</SelectItem>
            <SelectItem value="immediate">Immediate family (parents, siblings, children)</SelectItem>
          </SelectContent>
        </Select>
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
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Next Step →
        </Button>
      </div>
    </form>
  );
};

export default DiabetesStep;
