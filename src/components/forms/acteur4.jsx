"use client";
import React, { useState, useEffect, createContext } from "react";
import { listAllExpedition } from "@/utils/blockchain";
import { DataTable } from "@/components/ui/datatable";
import PageActeur2 from "./acteur2.2";
import {Acteur2Context} from "./acteur2";

const Acteur4 = ({acteur}) => {
  const [expeditions, SetExpeditions] = useState([]);
  const [submitted, SetSubmitted] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await listAllExpedition();

      const newItemText = "Confirmer la reception";

      const updatedExpeditions = data.map((obj) => {
        console.log(obj)
        const newObj = { ...obj };
        newObj["text"] = newItemText;
        newObj.text = newItemText;
        return newObj;
      });

      SetExpeditions(updatedExpeditions);
    }
    fetchData();
  }, []);

  if (submitted) {
    alert("Success");
    SetSubmitted(false);
  }

  return (
    <Acteur2Context.Provider value={{ SetSubmitted, setCode }}>
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Expeditions
            </h2>
            <p className="text-gray-500 mb-6">{`Bonjour ${acteur}...`}</p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Expeditions</p>
                  <p>Gérer les Expeditions.</p>
                </div>
                <div className="lg:col-span-2">
                  <DataTable data={expeditions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Acteur2Context.Provider>
  );
};

export default Acteur4;
