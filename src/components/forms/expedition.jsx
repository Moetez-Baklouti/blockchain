"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  addExpedition,
  getLatestReference,
  getFormDataByReference,
} from "@/utils/blockchain";
import { QrCodeDialog } from "@/components/qrcode-dialog";

const Expedition = () => {
  const [date, setDate] = useState("");
  const [reference, setReference] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [src, setSrc] = useState("");
  const [open, setOpen] = React.useState(false);

  async function incrementRef() {
    const data = await getLatestReference();
    let inputString = "00000";
    if (data[0] !== "null") inputString = data[0];
    var last5Chars = inputString.slice(-5);
    var num = parseInt(last5Chars, 10);
    num++;
    var incrementedId = num.toString().padStart(5, "0");
    return incrementedId;
  }

  useEffect(() => {
    var today = new Date();

    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }

    setDate(day + "/" + month + "/" + year);

    async function fetchData() {
      const incrementedId = await incrementRef();
      setReference("CO " + year + "-" + incrementedId);
    }
    fetchData();
  }, []);

  const jsonify = (formdata) => {
    const json = {};
    formdata.forEach((value, key) => {
      if (!json[key]) {
        json[key] = value;
      } else {
        if (!Array.isArray(json[key])) {
          json[key] = [json[key]];
        }
        json[key].push(value);
      }
    });
    return json;
  };
  const handleSubmit = async (formdata) => {
    const json = jsonify(formdata);
    await addExpedition(reference, date);
    const data = await getFormDataByReference(reference);
    console.log(data);
    setQrcode(data[2]);
    setOpen(true);
    const incrementedId = await incrementRef();
    setReference("CO " + new Date().getFullYear() + "-" + incrementedId);
  };
  return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Référence: {reference}
            </h2>
            <p className="text-gray-500 mb-6">Date: {date}</p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Information Générales</p>
                  <p>Veuillez remplir tous les champs.</p>
                </div>

                <div className="lg:col-span-2">
                  <form
                    action={async (formData) => {
                      await handleSubmit(formData);
                    }}
                  >
                    <input type="hidden" id="Reference" name="Reference" value={reference}></input>
                    <input type="hidden" id="DateDemande" name="DateDemande" value={date}></input>
                    <fieldset className="lg:col-span-2 p-6 rounded-lg border">
                      <legend className="text-lg font-medium">Client</legend>
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-3">
                          <label htmlFor="donneur_ordre">Donneur D'ordre:</label>
                          <input
                            type="text"
                            name="donneur_ordre"
                            id="donneur_ordre"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="contact">Contact:</label>
                          <input
                            type="text"
                            name="contact"
                            id="contact"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="adresse">Adresse:</label>
                          <input
                            type="text"
                            name="adresse"
                            id="adresse"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-1">
                          <label htmlFor="telephone">Telephone:</label>
                          <input
                            type="text"
                            name="telephone"
                            id="telephone"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-1">
                          <label htmlFor="fax">Fax:</label>
                          <input
                            type="text"
                            name="fax"
                            id="fax"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label htmlFor="email">Email:</label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>
                      </div>
                    </fieldset>
                    <fieldset className="lg:col-span-2 p-6 rounded-lg border">
                      <legend className="text-lg font-medium">Départ</legend>
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                          <label htmlFor="adresse">Adresse:</label>
                          <input
                            type="text"
                            name="adresse"
                            id="adresse"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label htmlFor="pays">Pays:</label>
                          <input
                            type="text"
                            name="pays"
                            id="pays"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="ville">Ville:</label>
                          <input
                            type="text"
                            name="ville"
                            id="ville"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="code_postal">Code postal:</label>
                          <input
                            type="text"
                            name="code_postal"
                            id="code_postal"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label htmlFor="port">Port:</label>
                          <input
                            type="text"
                            name="port"
                            id="port"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>
                      </div>
                    </fieldset>
                    <fieldset className="lg:col-span-2 p-6 rounded-lg border">
                      <legend className="text-lg font-medium">Arrivée</legend>
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                          <label htmlFor="adresse">Adresse:</label>
                          <input
                            type="text"
                            name="adresse"
                            id="adresse"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label htmlFor="pays">Pays:</label>
                          <input
                            type="text"
                            name="pays"
                            id="pays"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="ville">Ville:</label>
                          <input
                            type="text"
                            name="ville"
                            id="ville"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="code_postal">Code postal:</label>
                          <input
                            type="text"
                            name="code_postal"
                            id="code_postal"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label htmlFor="port">Port:</label>
                          <input
                            type="text"
                            name="port"
                            id="port"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>
                      </div>
                    </fieldset>
                    <br></br>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                      <div className="md:col-span-3">
                        <label htmlFor="incoterm">Incoterm:</label>
                        <input
                          type="text"
                          name="incoterm"
                          id="incoterm"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="remarques">Remarques:</label>
                        <input
                          type="text"
                          name="remarques"
                          id="remarques"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                    </div>
                    <br></br>
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <Button type="submit">Ajouter</Button>
                      </div>
                    </div>
                  </form>
                  <QrCodeDialog qrcode={qrcode} open={open} setOpen={setOpen} image={src}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Expedition;
