import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Icon from "./Icon";
const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];
export type Option = { id: number; name: string; unavailable?: boolean; value?: string };
type SelectProps = {
  options: Option[];
  value: Option;
  onChange: (value: Option) => void;
};
function Select({ options, value, onChange }: SelectProps) {
  //   const [selectedPerson, setSelectedPerson] = useState(people[0]);
  return (
    <Listbox as={'div'} value={value} onChange={onChange} className="relative inline-flex">
      <Listbox.Button className="relative w-auto min-w-24 items-center flex cursor-default rounded-lg bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span className="block truncate mr-auto flex-1">{value.name}</span>
        <Icon name="select" ></Icon>
      </Listbox.Button>
      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
        <Listbox.Options className="z-10 absolute top-1/1 left-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map((option) => (
            <Listbox.Option
              className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`}
              key={option.id}
              value={option}
              disabled={option.unavailable}
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{option.name}</span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                      {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
export default Select;
