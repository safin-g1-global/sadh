import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface EmailCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailCollectionModal: React.FC<EmailCollectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInterested = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // TODO: Save email to database
    navigate("/");
  };

  const handleNotInterested = () => {
    navigate("/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[500px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 border-0">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
            Thank you for your Interest
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm sm:text-base text-white/90">
          Please provide your email if you are interested in receiving education
          material from us
        </DialogDescription>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm sm:text-base text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="text-sm sm:text-base bg-white/20 border-white/30 text-white placeholder:text-white/70 outline-none"
            />
            {error && (
              <p className="text-yellow-200 text-xs sm:text-sm">{error}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <Button
              variant="outline"
              onClick={handleNotInterested}
              className="w-full sm:w-auto px-6 bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              Not Interested
            </Button>
            <Button
              onClick={handleInterested}
              className="w-full sm:w-auto px-6 bg-white text-gray-900 hover:bg-white/90"
            >
              Interested
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCollectionModal;
