import React, { ComponentType, useState } from "react";

// Define the types for the HOC
interface WithSelectionProps {
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const withSelection = <P extends object>(
  WrappedComponent: ComponentType<P & WithSelectionProps>
) => {
  return (props: Omit<P, keyof WithSelectionProps>) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleSelect = (index: number) => {
      setSelectedIndex(index);
    };

    return (
      <WrappedComponent
        {...(props as P)}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
      />
    );
  };
};

export default withSelection;
