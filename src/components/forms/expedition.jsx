"use client";
import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addExpedition, getLatestReference, listAllExpedition, getFormDataByReference } from "@/utils/blockchain";
import { QrCodeDialog } from "@/components/qrcode-dialog";


const Expedition = () => {
  const [date, setDate] = useState("");
  const [reference, setReference] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [src, setSrc] = useState("");
  const [open, setOpen] = React.useState(false);

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
      const data = await getLatestReference();
      let inputString = "00000";
      if (data[0] !== "null") inputString = data[0];
      var last5Chars = inputString.slice(-5);
      var num = parseInt(last5Chars, 10);
      num++;
      var incrementedId = num.toString().padStart(5, "0");

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
    QRCode.toDataURL(`http://localhost:3000/${data[2]}`).then((val) => setSrc(val));
    setQrcode(data[2]);
    setOpen(true);
  };
  return (
    <div className="w-100">
      <form
        className="max-w-2000 mx-auto bg-white p-20 rounded-lg shadow-md grid grid-cols-3 gap-20"
        action={async (formData) => {
          await handleSubmit(formData);
        }}
      >
        <div>
          <label className="block mb-8 font-bold" htmlFor="Reference">
            Reference :
          </label>
          <Input
            type="text"
            id="Reference"
            value={reference}
            name="Reference"
            disabled
          />
        </div>
        <div>
          <label className="block mb-8 font-bold" htmlFor="DateDemande">
            Date Demande :
          </label>
          <Input
            type="text"
            id="DateDemande"
            value={date}
            name="DateDemande"
            disabled
          />
        </div>
        <fieldset className="border border-gray-300 rounded-md p-4 col-span-3">
          <legend className="font-bold">Client</legend>
          <div className="flex flex-wrap justify-between">
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="Donneur">
                Donneur D'ordre :
              </label>
              <Input type="text" id="Donneur" name="Donneur" />
            </div>
            <div>
              <label className="block mb-8 font-bold" htmlFor="Adresse">
                Adresse :
              </label>
              <Input type="text" id="Adresse" name="Adresse" />
            </div>
            <div>
              <label className="block mb-8 font-bold" htmlFor="Mail">
                Mail :
              </label>
              <Input type="text" id="Mail" name="Mail" />
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="Fax">
                Fax :
              </label>
              <Input type="text" id="Fax" name="Fax" />
            </div>
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="Telepone">
                Telephone :
              </label>
              <Input type="text" id="Telepone" name="Telepone" />
            </div>
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="Contacts">
                Contacts :
              </label>
              <Input type="text" id="Contacts" name="Contacts" />
            </div>
          </div>
        </fieldset>
        <fieldset className="border border-gray-300 rounded-md p-4 col-span-3">
          <legend className="font-bold">Départ</legend>
          <div className="flex flex-wrap justify-between">
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="Adresse1">
                Adresse :
              </label>
              <Input type="text" id="Adresse1" name="Adresse1" />
            </div>
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="Pays">
                Pays :
              </label>
              <Input type="text" id="Pays" name="Pays" />
            </div>
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="CodeP">
                Code Postale :
              </label>
              <Input type="text" id="CodeP" name="CodeP" />
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="Ville">
                Ville :
              </label>
              <Input type="text" id="Ville" name="Ville" />
            </div>
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="Port">
                Port :
              </label>
              <Input type="text" id="Port" name="Port" />
            </div>
          </div>
        </fieldset>
        <fieldset className="border border-gray-300 rounded-md p-4 col-span-3">
          <legend className="font-bold">Arrivée</legend>
          <div className="flex flex-wrap justify-between">
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="Adresse2">
                Adresse :
              </label>
              <Input type="text" id="Adresse2" name="Adresse2" />
            </div>
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="Pays1">
                Pays :
              </label>
              <Input type="text" id="Pays1" name="Pays1" />
            </div>
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="Code2">
                Code Postal :
              </label>
              <Input type="text" id="Code2" name="Code2" />
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="Faxdes">
                Ville :
              </label>
              <Input type="text" id="Faxdes" name="Faxdes" />
            </div>
            <div className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-10 mr-0 sm:mr-10 md:mr-10 lg:mr-10 xl:mr-10">
              <label className="block mb-8 font-bold" htmlFor="Teleponedes">
                Port:
              </label>
              <Input type="text" id="Teleponedes" name="Teleponedes" />
            </div>
          </div>
        </fieldset>
        <div>
          <label className="block mb-8 font-bold" htmlFor="Refachat">
            Incoterm :
          </label>
          <Input type="text" id="Refachat" name="Refachat" />
        </div>
        <div>
          <label className="block mb-8 font-bold" htmlFor="Refclient">
            Remarques :
          </label>
          <Input type="text" id="Refclient" name="Refclient" />
        </div>
        <Button type="submit">Ajouter</Button>
        <QrCodeDialog qrcode={qrcode} open={open} setOpen={setOpen} image={src}/>
      </form>
    </div>
  );
};

export default Expedition;
