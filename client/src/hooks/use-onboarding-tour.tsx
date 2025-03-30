import { useState, useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export interface TourStep {
  element: string;
  popover: {
    title: string;
    description: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
  };
}

const defaultBlockchainTourSteps: TourStep[] = [
  {
    element: '#tour-dashboard',
    popover: {
      title: 'Welcome to HeliSync',
      description: 'This is your dashboard where you can monitor and configure your blockchain data indexing. Let\'s learn the basics of blockchain and how HeliSync helps you.',
      side: 'bottom',
    }
  },
  {
    element: '#tour-blockchain-basics',
    popover: {
      title: 'What is Blockchain?',
      description: 'A blockchain is a decentralized database that stores information in blocks that are linked together. Each block contains transaction data, a timestamp, and a cryptographic hash of the previous block.',
      side: 'right',
    }
  },
  {
    element: '#tour-solana',
    popover: {
      title: 'Solana Blockchain',
      description: 'Solana is a high-performance blockchain that can process thousands of transactions per second with low fees. It uses a unique Proof of History (PoH) consensus mechanism combined with Proof of Stake (PoS).',
      side: 'right',
    }
  },
  {
    element: '#tour-indexing',
    popover: {
      title: 'Blockchain Indexing',
      description: 'Indexing blockchain data means organizing and storing on-chain data in a structured database to make it easily searchable and queryable for applications.',
      side: 'right',
    }
  },
  {
    element: '#tour-helius',
    popover: {
      title: 'Helius Webhooks',
      description: 'Helius is a Solana infrastructure provider that offers webhooks to notify your application when specific blockchain events occur, eliminating the need to constantly poll the blockchain.',
      side: 'left',
    }
  },
  {
    element: '#tour-database',
    popover: {
      title: 'Database Configuration',
      description: 'Connect your Neon Postgres database to store and query indexed blockchain data efficiently. HeliSync will automatically create the necessary tables based on your preferences.',
      side: 'top',
    }
  },
  {
    element: '#tour-indexing-options',
    popover: {
      title: 'Indexing Options',
      description: 'Choose which blockchain data to track, including NFT bids, token prices, and lending platform data. This determines what gets stored in your database.',
      side: 'top',
    }
  },
  {
    element: '#tour-analytics',
    popover: {
      title: 'Analytics Dashboard',
      description: 'Monitor your indexed data with visual charts and metrics. This helps you understand trends and patterns in the blockchain data you\'re tracking.',
      side: 'left',
    }
  },
  {
    element: '#tour-logs',
    popover: {
      title: 'Webhook Logs',
      description: 'View and troubleshoot the indexing process with detailed logs of webhook events, errors, and successful operations.',
      side: 'left',
    }
  },
  {
    element: '#tour-finish',
    popover: {
      title: 'Ready to Get Started?',
      description: 'Now that you understand the basics, you can configure your database, select indexing options, and start tracking blockchain data!',
      side: 'bottom',
    }
  },
];

export function useOnboardingTour() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [hasCompletedTour, setHasCompletedTour] = useState(false);
  const [driverObj, setDriverObj] = useState<any>(null);
  
  useEffect(() => {
    // Check if user has completed the tour before
    const tourCompleted = localStorage.getItem('helisync_tour_completed');
    
    if (!tourCompleted) {
      setIsFirstVisit(true);
    } else {
      setHasCompletedTour(true);
    }
    
    // Initialize driver.js
    const driverInstance = driver({
      animate: true,
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      steps: [],
      onDestroyEvent: () => {
        localStorage.setItem('helisync_tour_completed', 'true');
        setHasCompletedTour(true);
      }
    });
    
    setDriverObj(driverInstance);
    
    return () => {
      if (driverInstance) {
        driverInstance.destroy();
      }
    };
  }, []);

  const startTour = (customSteps?: TourStep[]) => {
    if (driverObj) {
      const steps = customSteps || defaultBlockchainTourSteps;
      driverObj.setSteps(steps);
      driverObj.drive();
    }
  };

  const completeTour = () => {
    localStorage.setItem('helisync_tour_completed', 'true');
    setHasCompletedTour(true);
    if (driverObj) {
      driverObj.destroy();
    }
  };

  return {
    isFirstVisit,
    hasCompletedTour,
    startTour,
    completeTour,
    defaultBlockchainTourSteps
  };
}