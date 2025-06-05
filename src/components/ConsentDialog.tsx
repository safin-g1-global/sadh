import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConsentDialogProps {
  isOpen: boolean;
  onAccept: () => void;
  onDeny: () => void;
}

const ConsentDialog: React.FC<ConsentDialogProps> = ({
  isOpen,
  onAccept,
  onDeny,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[600px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 border-0">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
            Welcome to SADH Rapid Risk Testing Services
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-white/90 space-y-3 sm:space-y-4 text-sm sm:text-base">
          <p>
            By clicking Accept button below I consent to participate in the
            Rapid Risk Testing Service, including collecting basic demographics
            and my health information and assessing my risk factors through
            biometrics and a blood test.
          </p>
          <p>
            I understand that my results will be kept confidential. I understand
            that these results are not a diagnosis and that I am encouraged to
            confirm their implications with my primary care physician.
          </p>
        </DialogDescription>
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-4 sm:mt-6">
          <Button
            variant="outline"
            onClick={onDeny}
            className="w-full sm:w-auto px-6 bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            Deny
          </Button>
          <Button
            onClick={onAccept}
            className="w-full sm:w-auto px-6 bg-white text-gray-900 hover:bg-white/90"
          >
            Accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentDialog;
