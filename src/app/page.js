import ReelViewer from "@/components/ReelViewer";
import { sampleReels } from "@/data/reels";

export default function Home() {
  return (
    <main className="relative h-screen w-full">
      <ReelViewer initialReels={sampleReels} />
    </main>
  );
}
