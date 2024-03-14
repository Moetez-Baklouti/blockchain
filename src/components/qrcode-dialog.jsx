import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function QrCodeDialog({ qrcode, open, setOpen, image }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code - Expedition</DialogTitle>
          <DialogDescription>
            Anyone who has this code will be able to review your expedition.
          </DialogDescription>
          <Image alt="qrcode" width={500} height={500} src={image} />
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="qrcode" defaultValue={qrcode} readOnly />
          </div>
          <CopyToClipboard
            text={qrcode}
            onCopy={(qrcode, result) => console.log(result)}
          >
            <Button type="submit" size="sm" className="px-3">
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </CopyToClipboard>
        </div>
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
