import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboardingTour } from '@/hooks/use-onboarding-tour';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';

interface OnboardingTourProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function OnboardingTour({ isOpen, setIsOpen }: OnboardingTourProps) {
  const { startTour, isFirstVisit, hasCompletedTour, completeTour } = useOnboardingTour();

  const handleStartTour = () => {
    setIsOpen(false);
    // Short delay to ensure dialog is closed before tour starts
    setTimeout(() => {
      startTour();
    }, 100);
  };

  const handleSkipTour = () => {
    setIsOpen(false);
    completeTour();
  };

  // Auto-open dialog ONLY on very first visit
  useEffect(() => {
    // Only show on first visit, never again after
    if (isFirstVisit && !hasCompletedTour) {
      setIsOpen(true);
      // Mark as completed right away even if user doesn't start tour
      localStorage.setItem('helisync_tour_completed', 'true');
    } else {
      // Make sure dialog is never automatically opened again
      setIsOpen(false);
    }
  }, [isFirstVisit, hasCompletedTour, setIsOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#0a0a0a] border border-[#222] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">Welcome to HeliSync</DialogTitle>
          <DialogDescription className="text-[#aaa]">
            Learn the basics of blockchain and how to use HeliSync to index Solana data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="rounded-lg bg-[#0f0f0f] border border-[#222] p-4 mb-4">
            <h3 className="font-semibold text-lg secondary-gradient-text mb-2">Interactive Tour</h3>
            <p className="text-[#aaa] text-sm">
              Our guided tour will walk you through blockchain basics and how to use HeliSync's features to index Solana data effectively.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-1 h-5 w-5 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-xs text-[#5b7def]">1</div>
              <div>
                <h4 className="font-medium text-[#ddd]">Blockchain Basics</h4>
                <p className="text-xs text-[#aaa]">Learn the fundamentals of blockchain technology and Solana</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-1 h-5 w-5 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-xs text-[#5b7def]">2</div>
              <div>
                <h4 className="font-medium text-[#ddd]">Data Indexing</h4>
                <p className="text-xs text-[#aaa]">Understand how blockchain data is indexed and stored</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-1 h-5 w-5 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-xs text-[#5b7def]">3</div>
              <div>
                <h4 className="font-medium text-[#ddd]">HeliSync Features</h4>
                <p className="text-xs text-[#aaa]">Explore the dashboard, analytics, and configuration options</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="border-[#222] hover:bg-[#151515] text-[#aaa]" 
            onClick={handleSkipTour}
          >
            Skip for now
          </Button>
          <Button 
            className="bg-[#5b7def] hover:bg-[#4a6ade] text-white" 
            onClick={handleStartTour}
          >
            Start Tour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}