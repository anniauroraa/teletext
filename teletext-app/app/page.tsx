"use client";

import { useState, useEffect } from "react";
import TeletextViewer from "@/components/teletextViewer";
import TeletextControls from "@/components/teletextControls";
import Box from "@/components/box";

const Home = () => {
  // State
  const [page, setPage] = useState(100);
  const [pageInput, setPageInput] = useState("100");
  const [subpage, setSubpage] = useState(1);
  const [subpageCount, setSubpageCount] = useState(1);
  const [warning, setWarning] = useState("");

  // Fetch subpage count when page changes
  useEffect(() => {
    const fetchSubpageCount = async () => {
      try {
        const res = await fetch(`/api/metadata/${page}`);
        if (!res.ok) throw new Error("Failed to fetch metadata");

        const data = await res.json();

        if (data.subpagecount) {
          setSubpageCount(data.subpagecount);
          setSubpage((prev) => Math.min(prev, data.subpagecount));
        } else {
          setSubpageCount(1);
        }
      } catch (err) {
        console.error("Failed to fetch subpagecount", err);
        setSubpageCount(1);
      }
    };

    fetchSubpageCount();
  }, [page]);

  // Subpage navigation
  const nextSubpage = () =>
    setSubpage((prev) => Math.min(prev + 1, subpageCount));
  const prevSubpage = () =>
    setSubpage((prev) => Math.max(prev - 1, 1));

  // Page navigation
  const nextPage = () => setPage((prev) => Math.min(prev + 1, 899));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 100));

  // Input typing
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    // If user types a 4th digit → reset to that digit
    if (value.length > 3) {
      setPageInput(value.slice(-1));
      return;
    }

    setPageInput(value);
  };

  // Commit input
  const commitPageInput = () => {
    const value = Number(pageInput);

    if (value >= 100 && value <= 899) {
      setPage(value);
      setPageInput(String(value));
      setWarning("");
      setSubpage(1);
    } else {
      setWarning("Vain numerot 100–899 hyväksytään");
      setPageInput(String(page));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        marginTop: 50,
        padding: 10,
      }}
    >
      {/* Header */}
      <h1 style={{ fontSize: "3rem" }}>
        {page} {subpage}/{subpageCount}
      </h1>

      {/* Teletext viewer box */}
      <TeletextViewer
        page={page}
        subpage={subpage}
        onPrev={prevSubpage}
        onNext={nextSubpage}
      />

      {/* Page controls box */}
      <TeletextControls
        page={page}
        pageInput={pageInput}
        warning={warning}
        onPrev={prevPage}
        onNext={nextPage}
        onInputChange={handlePageInputChange}
        onCommit={commitPageInput}
      />
    </div>
  );
};

export default Home;
