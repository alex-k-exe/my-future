"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "./command"; // import from your Command component file
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

interface MultiSelectProps {
    categories: {
        category: string;
        selected: boolean;
    }[];
    setCategories: React.Dispatch<
        React.SetStateAction<
            {
                category: string;
                selected: boolean;
            }[]
        >
    >;
    label?: string;
}

export function MultiSelect({
    categories,
    setCategories,
    label
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);

    // Toggle selection of an item
    function toggleCategory(category: string) {
        setCategories((previousValue) =>
            previousValue.map((item) =>
                item.category === category
                    ? { ...item, selected: !item.selected }
                    : item
            )
        );
    }

    return (
        <div className="w-full">
            {label && (
                <label className="mb-1 block text-sm font-medium">
                    {label}
                </label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {categories.find((category) => category.selected)
                            ? categories.filter((category) => category.selected)
                                  .length + " categories selected"
                            : "Select categories"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Command>
                        <CommandInput placeholder="Search..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {categories.map((category) => (
                                    <CommandItem
                                        key={category.category}
                                        onSelect={toggleCategory}
                                        className="cursor-pointer"
                                    >
                                        <Check
                                            className={
                                                "mr-2 h-4 w-4 " +
                                                (category.selected
                                                    ? "opacity-100"
                                                    : "opacity-0")
                                            }
                                        />
                                        {category.category}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
