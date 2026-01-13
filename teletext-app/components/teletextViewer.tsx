import Image from "next/image";
import Box from "./box";

type Props = {
  page: number;
  subpage: number;
  onPrev: () => void;
  onNext: () => void;
};

const TeletextViewer = ({ page, subpage, onPrev, onNext }: Props) => {
  return (
    <Box gap={10}>
      <button onClick={onPrev}>&lt;</button>

      <Image
        src={`/api/image/${page}/${subpage}`}
        alt={`Teletext ${page}/${subpage}`}
        width={520}
        height={400}
        unoptimized
      />

      <button onClick={onNext}>&gt;</button>
    </Box>
  );
};

export default TeletextViewer;
