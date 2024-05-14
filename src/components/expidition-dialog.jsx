import { SendHorizontal } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFormDataByQrCode } from "@/utils/blockchain";
import { Acteur2Context } from "@/components/forms/acteur2";

export function ExpidetionDialog({ reference, date, buttonText }) {
  const [qrcode, setQrcode] = useState("");
  const { SetSubmitted, setCode } = useContext(Acteur2Context);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await getFormDataByQrCode(qrcode);
    if (qrcode === data[2]) {
      if (reference === data[0]) {
        setCode(qrcode);
        SetSubmitted(true);
      } else {
        alert("Sorry, wrong code");
      }
    } else {
      alert("Provided the wrong Code!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{reference}</DialogTitle>
          <DialogDescription>Date Demande: {date}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="qrcode" className="sr-only">
                Qr Code
              </Label>
              <Input
                id="qrcode"
                name="qrcode"
                value={qrcode}
                onChange={(e) => setQrcode(e.target.value)}
              />
            </div>
            <Button type="submit" size="sm" className="px-3">
              <span className="sr-only">Valider</span>
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}