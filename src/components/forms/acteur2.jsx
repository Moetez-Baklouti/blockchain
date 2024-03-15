"use client";
import React, { useState, useEffect } from "react";
import { listAllExpedition } from "@/utils/blockchain";
import { DataTable } from "@/components/ui/datatable";


const Acteur2 = () => {
    const [expeditions, SetExpeditions] = useState([]);
    useEffect(() => {
        async function fetchData() {
          const data = await listAllExpedition();
          SetExpeditions(data);
        }
        fetchData();
      }, []);
  return (
    <div className="container mx-auto py-10">
      <DataTable data={expeditions} />
    </div>
  );
};

export default Acteur2;
