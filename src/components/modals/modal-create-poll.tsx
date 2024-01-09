import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { FormCreatePoll } from "@/components/forms/form-create-poll";

export function ModalCreatePoll() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create a New Poll</DialogTitle>
        </DialogHeader>
        <FormCreatePoll />
      </DialogContent>
    </Dialog>
  );
}
