import Box from "./box";

type Props = {
  page: number;
  pageInput: string;
  warning: string;
  onPrev: () => void;
  onNext: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCommit: () => void;
};

const TeletextControls = ({
  page,
  pageInput,
  warning,
  onPrev,
  onNext,
  onInputChange,
  onCommit,
}: Props) => {
  return (
    <>
      <Box gap={10}>
        <button onClick={onPrev}>&lt; {Math.max(page - 1, 100)}</button>

        <input
          type="text"
          value={pageInput}
          onChange={onInputChange}
          onFocus={(e) => e.target.select()}
          onBlur={onCommit}
          onKeyDown={(e) => e.key === "Enter" && onCommit()}
          style={{ width: 60, textAlign: "center" }}
        />

        <button onClick={onNext}>{Math.min(page + 1, 899)} &gt;</button>
      </Box>

      {warning && <div className="input-warning">{warning}</div>}
    </>
  );
};

export default TeletextControls;
