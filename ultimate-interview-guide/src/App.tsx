import { useState } from 'react';
import { AppNav } from './layout/AppNav';
import type { TabId } from './layout/AppNav';
import { FrontendTab } from './tabs/FrontendTab';
import { PlaceholderTab } from './tabs/PlaceholderTab';

const TAB_LABELS: Record<TabId, string> = {
  'frontend': 'Frontend',
  'react-native': 'React Native',
  'coding-challenges': 'Coding Challenges',
  'backend': 'Backend',
  'system-design': 'System Design',
  'behavioral': 'Behavioral',
  'ai': 'AI',
  'my-stories': 'My Stories',
};

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('frontend');

  const renderActiveContent = () => {
    if (activeTab === 'frontend') {
      return <FrontendTab />;
    }
    return <PlaceholderTab title={TAB_LABELS[activeTab]} />;
  };

  return (
    <>
      <AppNav activeTab={activeTab} onTabChange={setActiveTab} />
      {renderActiveContent()}
    </>
  );
}

export default App;
