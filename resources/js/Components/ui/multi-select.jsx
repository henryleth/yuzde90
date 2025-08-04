import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/Components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Badge } from "@/Components/ui/badge";

const MultiSelect = ({ options, selectedValues, onSelect, placeholder }) => {
  const [open, setOpen] = React.useState(false);

  // Seçili öğelerin etiket olarak gösterilmesi
  const displaySelectedItems = () => {
    if (!selectedValues || selectedValues.length === 0) {
      return <span className="text-muted-foreground">{placeholder}</span>;
    }

    const selectedItems = selectedValues.map((value) => {
      const option = options.find((opt) => opt.value === value);
      return option ? (
        <Badge key={value} variant="default" className="flex items-center gap-1 pr-1 text-xs">
          {option.label}
        </Badge>
      ) : null;
    }).filter(Boolean); // null değerleri filtrele

    return (
      <div className="flex flex-wrap gap-1 w-full">
        {selectedItems}
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto py-2" // h-auto py-2, içeriğe göre yüksekliği ayarlar
        >
          {displaySelectedItems()}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Ara..." />
          <CommandEmpty>Hiç öğe bulunamadı.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.label}
                onSelect={() => {
                  onSelect(option.value);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedValues.includes(option.value) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect; 