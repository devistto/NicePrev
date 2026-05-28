import { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import type { FieldNameType } from "./sidebar";

type DataTypes = {
    fieldName: FieldNameType;
    fieldText: string;
    fieldValue: string | boolean | number;
}

type Props = {
    data: DataTypes[];
    defineValue: (key: FieldNameType, value: any) => void
}

export const CustomDropdown = ({ data, defineValue }: Props) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(data[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={dropdownRef}
            className="relative w-full"
        >
            <div
                onClick={() => setOpen(!open)}
                className="border border-zinc-800 h-10 flex items-center px-3 relative cursor-pointer bg-zinc-800/40"
            >
                <span>{selected.fieldText}</span>

                <IoMdArrowDropdown
                    className={`absolute right-3 text-xl transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            </div>

            {open && (
                <div className="absolute top-12 left-0 w-full border border-zinc-800 z-50">
                    {data.map((item) => (
                        item.fieldValue !== selected.fieldValue && <div
                            key={item.fieldText}
                            onClick={() => {
                                setSelected(item);
                                defineValue(item.fieldName, item.fieldValue)
                                setOpen(false);
                            }}
                            className="px-3 h-10 flex items-center cursor-pointer hover:bg-zinc-700 bg-zinc-800"
                        >
                            {item.fieldText}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}