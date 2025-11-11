import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: { code: string; name: string }[];
}

export function Combobox({ value, setValue, options }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-11 sm:h-10"
        >
          <span className="truncate text-left flex-1 min-w-0">
            {value
              ? options.find((option) => option.name === value)?.name
              : "Select country..."}
          </span>
          <ChevronsUpDown className="opacity-50 ml-2 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[280px] sm:w-[320px] md:w-[400px] p-0 overscroll-contain"
        onWheel={(e) => e.stopPropagation()}
        side="bottom"
        sideOffset={8}
        align="start"
        alignOffset={0}
      >
        <Command>
          <CommandInput placeholder="Search countries..." className="h-9" />
          <CommandList className="max-h-40 sm:max-h-48 md:max-h-60 overflow-y-auto overscroll-contain scroll-smooth relative z-10">
            <CommandEmpty>No countries found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.code}
                  value={option.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
