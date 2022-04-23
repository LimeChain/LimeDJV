import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useDetectOutsideClick } from "../../hooks/useDetectClickOutside";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const Select = ({
  optionsList,
  onSelectOptionChange,
  optionsListName,
  displayFields,
  selected,
  size,
  className,
  disabled,
  placeholder,
  customEmptyText,
}: SelectProps) => {
  const selectRef: MutableRefObject<null | any> = useRef(null);
  const [expanded, setExpanded] = useDetectOutsideClick(selectRef, false);

  const [selectedOption, setSelectedOption] = useState<Option>(
    optionsList[selected ? selected : 0]
  );
  const [placeholderFlag, setPlaceholderFlag] = useState<boolean>(true);

  const { currentNetwork } = useGlobalContext();

  const handleChange = (key) => {
    const option = optionsList[key]
    setExpanded(!expanded);
    setSelectedOption(option);
    if (onSelectOptionChange) {
      onSelectOptionChange(option);
    }
    if (placeholderFlag) {
      setPlaceholderFlag(false);
    }
  };
  useEffect(() => {
    if (placeholder?.reset) {
      setPlaceholderFlag(true);
    }
  }, [placeholder?.reset]);
  useEffect(() => {
    setPlaceholderFlag(placeholder?.active as boolean);
  }, [placeholder?.active]);
  useEffect(() => {
    if (optionsList.length === 1) {
      setSelectedOption(optionsList[0]);
    } else {
      setSelectedOption(optionsList[selected ? selected : 0]);
    }
  }, [selected, optionsList]);
  return (
      <>
          <select name="networks" id="networks" value={selected} onChange={(val) => handleChange(val.target.value)}>
              {optionsList.map((option, index) => {
              const { primary, secondary, icon } = displayFields;
                  return (
                      <option value={index} key={index}>{option.chainName}</option>
                  );
              })}
          </select>
      
      
        <style jsx>{`
        select {
          font: 400 12px/1.3 sans-serif;
          -webkit-appearance: none;
          appearance: none;
          color: white;
          font-size: 16px;
          font-weight: bold;
          border: 1px solid #04E0B8;
          line-height: 1;
          outline: 0;
          padding: 0.65em 2.5em 0.55em 0.75em;
          border-radius: 16px;
          background-color: #04E0B8;
          background-image: linear-gradient(#04E0B8, #04E0B8), linear-gradient(-135deg, transparent 50%, #04E0B8 50%), linear-gradient(-225deg, transparent 50%, #04E0B8 50%), linear-gradient(#04E0B8 42%, white 42%);
          background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
          background-size: 1px 100%, 20px 22px, 20px 22px, 20px 100%;
          background-position: left, right bottom, right bottom, right bottom;   
        }

       
      `}</style>
    </>
  );
};
export default Select;
