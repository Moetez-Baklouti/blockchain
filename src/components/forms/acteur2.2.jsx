"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getFormDataByQrCode } from "@/utils/blockchain";
import { QrCodeDialog } from "@/components/qrcode-dialog";
import { addExpedition, getFormDataByReference } from "@/utils/blockchain";

export default function PageActeur2({ acteur, qrcode }) {
  const [formData, setFormData] = useState([]);
  const [src, setSrc] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (formAct) => {
    console.log(formData);
    await addExpedition(formData[0] + Math.random(), formData[1]);
    setOpen(true);
  };

  useEffect(() => {
    async function fetchData() {
      const formdata = await getFormDataByQrCode(qrcode);
      setFormData(formdata);
    }
    fetchData();
  }, []);

  if (
    typeof formData === "undefined" ||
    typeof formData[0] == "undefined" ||
    formData[0] === ""
  ) {
    return <div></div>;
  }

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            Référence: {formData[0]}
          </h2>
          <p className="text-gray-500 mb-6">Date: {formData[1]}</p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Valider Expedition</p>
                <p>Veuillez remplir tous les champs.</p>
              </div>

              <div className="lg:col-span-2">
                {acteur === "Acteur2" ? (
                  <form
                    action={async (formData) => {
                      await handleSubmit(formData);
                    }}
                  >
                    <fieldset className="lg:col-span-2 p-6 rounded-lg border">
                      <legend className="text-lg font-medium">
                        Fourniture
                      </legend>
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-3">
                          <label htmlFor="fournissuer">Fournisseur:</label>
                          <input
                            type="text"
                            name="fournissuer"
                            id="fournissuer"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="contact">Personne à contacter:</label>
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
                      <legend className="text-lg font-medium">
                        Enlèvement
                      </legend>
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-3">
                          <label htmlFor="lieu">Lieu d'enlèvement:</label>
                          <input
                            type="text"
                            name="lieu"
                            id="lieu"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="contact">Personne à contacter:</label>
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
                      <legend className="text-lg font-medium">
                        Destination
                      </legend>
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-3">
                          <label htmlFor="destinataire">Destinataire:</label>
                          <input
                            type="text"
                            name="destinataire"
                            id="destinataire"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="contact">Personne à contacter:</label>
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
                      <legend className="text-lg font-medium">Livraison</legend>
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-3">
                          <label htmlFor="lieu_livraison">
                            Lieu De Livraison:
                          </label>
                          <input
                            type="text"
                            name="lieu_livraison"
                            id="lieu_livraison"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="contact">Personne à contacter:</label>
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

                    <br></br>

                    <fieldset className="lg:col-span-2 p-6 rounded-lg border">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                        <div className="md:col-span-3">
                          <label htmlFor="ref_achat">Réf.Achat Fret:</label>
                          <input
                            type="text"
                            name="ref_achat"
                            id="ref_achat"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label htmlFor="ref_client">Réf.Client:</label>
                          <input
                            type="text"
                            name="ref_client"
                            id="ref_client"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-6">
                          <label htmlFor="note">Note:</label>
                          <input
                            type="text"
                            name="note"
                            id="note"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-6">
                          <label htmlFor="email_ro">Email RO:</label>
                          <input
                            type="text"
                            name="email_ro"
                            id="email_ro"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>
                      </div>
                    </fieldset>

                    <br></br>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <Button type="submit">Ajouter</Button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <form
                    action={async (formData) => {
                      await handleSubmit(formData);
                    }}
                  >
                    <fieldset className="lg:col-span-2 p-6 rounded-lg border">
                      <legend className="text-lg font-medium">
                        Fourniture
                      </legend>
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-3">
                          <label htmlFor="fournissuer">Fournisseur:</label>
                          <input
                            type="text"
                            name="fournissuer"
                            id="fournissuer"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="contact">Personne à contacter:</label>
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
                      <legend className="text-lg font-medium">
                        Enlèvement
                      </legend>
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-3">
                          <label htmlFor="lieu">Lieu d'enlèvement:</label>
                          <input
                            type="text"
                            name="lieu"
                            id="lieu"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="contact">Personne à contacter:</label>
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

                    

                    <br></br>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <Button type="submit">Ajouter</Button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <QrCodeDialog qrcode={qrcode} open={open} setOpen={setOpen} image={""} />
    </div>
  );
}
