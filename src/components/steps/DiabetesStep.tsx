
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
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal (Men: &lt;37 inches, Women: &lt;31.5 inches)</SelectItem>
            <SelectItem value="elevated">Elevated (Men: 37-40 inches, Women: 31.5-35 inches)</SelectItem>
            <SelectItem value="high">High (Men: &gt;40 inches, Women: &gt;35 inches)</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Physical Activity" required>
        <Select value={data.physicalActivity} onValueChange={(value) => updateData({ physicalActivity: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regular">Regular physical activity (≥150 min/week)</SelectItem>
            <SelectItem value="irregular">Irregular physical activity</SelectItem>
            <SelectItem value="sedentary">Sedentary lifestyle</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Family History of Diabetes" required>
        <Select value={data.familyHistory} onValueChange={(value) => updateData({ familyHistory: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
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
          className="px-8 py-3"
        >
          Previous
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
          Next →
        </Button>
      </div>
    </form>
  );
};

export default DiabetesStep;
