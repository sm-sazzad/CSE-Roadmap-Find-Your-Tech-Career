import SectorExplorer from "@/components/SectorExplorer";
import { getCatalog } from "@/lib/roadmap";

export default function SectorPage() {
  return <SectorExplorer catalog={getCatalog()} />;
}
