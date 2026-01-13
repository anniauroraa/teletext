"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Home = () => {
  // State for page and subpage
  const [page, setPage] = useState(100); // Only when initializing page
  const [pageInput, setPageInput] = useState("100");
  const [subpage, setSubpage] = useState(1);
  const [subpageCount, setSubpageCount] = useState(1);
  const [warning , setWarning] = useState("");

  // Fetch subpage count whenever page changes
  useEffect(() => {
    const fetchSubpageCount = async () => {
      try {
        const res = await fetch(`/api/metadata/${page}`);
        if (!res.ok) throw new Error("Failed to fetch metadata");
        const data = await res.json();      // change to json
        if (data.subpagecount) {
          setSubpageCount(data.subpagecount);
          // Clamp subpage to max if needed
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

  // Handlers for subpage navigation
  const nextSubpage = () => setSubpage((prev) => Math.min(prev + 1, subpageCount));
  const prevSubpage = () => setSubpage((prev) => Math.max(prev - 1, 1));

  // Handlers for page navigation
  const nextPage = () => setPage((prev) => Math.min(prev + 1, 899));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 100));

  // Handler for input change
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    // If user types a 4th digit → reset to that digit
    if (value.length > 3) {
      setPageInput(value.slice(-1));
      return;
    }

    setPageInput(value);
  };

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
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>{page} {subpage}/{subpageCount}</h1>

      {/* Image with subpage navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={prevSubpage}>&lt;</button>
        <Image
          src={`/api/image/${page}/${subpage}`}
          alt={`Teletext ${page}/${subpage}`}
          width={520}
          height={400}
          unoptimized
        />
        <button onClick={nextSubpage}>&gt;</button>
      </div>

      {/* Page input + next/previous page buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={prevPage}>
          &lt; {Math.max(page - 1, 100)}
        </button>
        <input
          type="number"
          value={pageInput}
          onChange={handlePageInputChange}
          onFocus={(e) => e.target.select()}
          onBlur={commitPageInput}
          onKeyDown={(e) => e.key === "Enter" && commitPageInput()}
          maxLength={4}
          style={{ width: 60, textAlign: "center" }}
        />
        <button onClick={nextPage}>
          {Math.min(page + 1, 899)} &gt;
        </button>
        {/* lisää warning */}
      </div>
    </div>
  );
}

export default Home;