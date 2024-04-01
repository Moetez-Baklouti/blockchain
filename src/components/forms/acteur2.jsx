"use client";
import React, { useState, useEffect, createContext } from "react";
import { listAllExpedition } from "@/utils/blockchain";
import { DataTable } from "@/components/ui/datatable";
import PageActeur2 from "./acteur2.2";

const Acteur2Context = createContext();

const Acteur2 = () => {
  const [expeditions, SetExpeditions] = useState([]);
  const [submitted, SetSubmitted] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await listAllExpedition();
      SetExpeditions(data);
    }
    fetchData();
  }, []);

  if (submitted) {
    return <PageActeur2 qrcode={code} />;
  }

  return (
    <Acteur2Context.Provider
      value={{ SetSubmitted, setCode }}
    >
      <div className="container mx-auto py-10">
        <DataTable data={expeditions} />
      </div>
    </Acteur2Context.Provider>
  );
};

export default Acteur2;
export { Acteur2Context };
