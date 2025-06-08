import MobileTabLayout from '@/components/MobileTabLayout';
import { allTasks } from '@/data/tasks';

export default function Home() {
  return <MobileTabLayout tasks={allTasks} />;
}
