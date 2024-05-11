import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

interface FilterButtonProps {
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
}

/**
 * Renders a filter button.
 * @returns FilterButton component.
 */
function FilterButton({ placeholder, options, onChange }: FilterButtonProps) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {placeholder}
      </MenuButton>
      <MenuList>
        {options.map((option) => (
          <MenuItem key={option} onClick={() => onChange(option)}>
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default FilterButton;
