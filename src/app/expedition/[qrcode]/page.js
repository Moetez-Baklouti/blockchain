"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { getFormDataByQrCode } from "@/utils/blockchain";

export default function Page({ params }) {
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const formdata = await getFormDataByQrCode(params.qrcode);
      console.log(formData);
      setFormData(formdata);
    }
    fetchData();
    
  }, []);

  if (typeof formData === 'undefined' || typeof formData[0] == 'undefined' || formData[0] === '') {
    return <div></div>;
  }
  
  
  return (
    <div>
      <h3><b>Reference: {formData[0]}</b></h3>
      <form className="max-w-2xl bg-white p-4 rounded-lg shadow-md grid grid-cols-3 gap-4">
        <fieldset className="border border-gray-300 rounded-md p-4 col-span-3">
          <legend>Fourniture</legend>
          <div className="flex flex-wrap justify-between">
            <div>
              <Label for="Fournisseur">Fournisseur :</Label>
              <Input type="text" id="Fournisseur" name="Fournisseur" />
            </div>
            <div>
              <Label for="Adresse">Adresse :</Label>
              <Input type="text" id="Adresse" name="Adresse" />
            </div>
            <div>
              <Label for="Mail">Mail :</Label>
              <Input type="text" id="Mail" name="Mail" />
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div>
              <Label for="Fax">Fax :</Label>
              <Input type="text" id="Fax" name="Fax" />
            </div>
            <div>
              <Label for="Telepone">Telephone :</Label>
              <Input type="text" id="Telepone" name="Telepone" />
            </div>
            <div>
              <Label for="Personne">Personne à contacter :</Label>
              <Input type="text" id="Personne" name="Personne" />
            </div>
          </div>
        </fieldset>
        <fieldset className="border border-gray-300 rounded-md p-4 col-span-3">
          <legend>Enlévement</legend>
          <div className="flex flex-wrap justify-between">
            <div>
              <Label for="Lieu">Lieu D'enlevement :</Label>
              <Input type="text" id="Lieu" name="Lieu" />
            </div>
            <div>
              <Label for="Adresseenv">Adresse D'enlevement :</Label>
              <Input type="text" id="Adresseenv" name="Adresseenv" />
            </div>
            <div>
              <Label for="Mailenv">Mail D'enlevement :</Label>
              <Input type="text" id="Mailenv" name="Mailenv" />
            </div>
          </div>

          <div className="flex flex-wrap justify-between">
            <div>
              <Label for="Faxenv">Fax D'enlevement :</Label>
              <Input type="text" id="Faxenv" name="Faxenv" />
            </div>
            <div>
              <Label for="Teleponeenv">Telephone D'enlevement :</Label>
              <Input type="text" id="Teleponeenv" name="Teleponeenv" />
            </div>
            <div>
              <Label for="Personneenv">
                Personne à contacter D'enlevement :
              </Label>
              <Input type="text" id="Personneenv" name="Personneenv" />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-md p-4 col-span-3">
          <legend>Destination</legend>

          <div className="flex flex-wrap justify-between">
            <div>
              <Label for="Destinaire">Destinataire :</Label>
              <Input type="text" id="Destinaire" name="Destinaire" />
            </div>
            <div>
              <Label for="Adressedes">Adresse De Destination :</Label>
              <Input type="text" id="Adressedes" name="Adressedes" />
            </div>
            <div>
              <Label for="Maildes">Mail De Destination :</Label>
              <Input type="text" id="Maildes" name="Maildes" />
            </div>
          </div>

          <div className="flex flex-wrap justify-between">
            <div>
              <Label for="Faxdes">Fax De Destination :</Label>
              <Input type="text" id="Faxdes" name="Faxdes" />
            </div>
            <div>
              <Label for="Teleponedes">Telephone De Destination :</Label>
              <Input type="text" id="Teleponedes" name="Teleponedes" />
            </div>
            <div>
              <Label for="Personnedes">
                Personne à contacter De Destination :
              </Label>
              <Input type="text" id="Personnedes" name="Personnedes" />
            </div>
          </div>
        </fieldset>
        <fieldset className="border border-gray-300 rounded-md p-4 col-span-3">
          <legend>Livraison</legend>
          <div className="flex flex-wrap justify-between">
            <div>
              <Label for="Lieuliv">Lieu De Livraison :</Label>
              <Input type="text" id="Lieuliv" name="Lieuliv" />
            </div>

            <div>
              <Label for="Adresseliv">Adresse De Livraison :</Label>
              <Input type="text" id="Adresseliv" name="Adresseliv" />
            </div>
            <div>
              <Label for="Mailliv">Mail De Livraison :</Label>
              <Input type="text" id="Mailliv" name="Mailliv" />
            </div>
          </div>

          <div className="flex flex-wrap justify-between">
            <div>
              <Label for="Faxliv">Fax De Livraison :</Label>

              <Input type="text" id="Faxliv" name="Faxliv" />
            </div>
            <div>
              <Label for="Teleponeliv">Telephone De Livraison :</Label>
              <Input type="text" id="Teleponeliv" name="Teleponeliv" />
            </div>
            <div>
              <Label for="Personneliv">
                Personne à contacter De Livraison :
              </Label>
              <Input type="text" id="Personneliv" name="Personneliv" />
            </div>
          </div>
        </fieldset>

        <div>
          <Label for="Refachat">Réf.Achat.Fret :</Label>
          <Input type="text" id="Refachat" name="Refachat" />

          <Label for="Refclient">Réf.Client :</Label>
          <Input type="text" id="Refclient" name="Refclient" />
        </div>
        <div>
          <Label for="Note">Note :</Label>
          <Input type="text" id="Note" name="Note" />
        </div>
        <div>
          <Label for="Emailro">Email RO :</Label>
          <Input type="text" id="Emailro" name="Emailro" />
        </div>

        <Button type="submit">Ajouter</Button>
      </form>
    </div>
  );
}
