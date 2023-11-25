import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { v4 as uuidv4 } from 'uuid';


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

type Option ={
    value: string;
    label: string;
  }
  
type DropdownProps ={
    name: string;
    options: Option[];
    onSelect: (value: string) => void;
  }


  const Dropdown: React.FC<DropdownProps> = ({ options, onSelect,name }) => {
    
  return (
    <Menu key={uuidv4()} as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center w-full sm:h-[40px] justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {name}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-[40] right-0  mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 ">
            {options && options.map(({label,value}) => (
                <Menu.Item>
                {({ active }) => (
                  <option
                    key={label}
                    onClick={() => onSelect(value)}  
                    value={value}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}>
                    {label}
                  </option>
                )}
              </Menu.Item> 
            ))} 
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown;