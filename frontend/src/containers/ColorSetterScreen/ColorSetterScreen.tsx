import { observer } from "mobx-react-lite";
import { colorBlenderStore } from "../../stores";
import Autocomplete from "../../components/Autocomplete";
import BackgroundColorSection from "../../components/BackgroundColorSection";

const ColorSetterScreen = observer(({ index }: { index: number }) => {
  return (
    <BackgroundColorSection
      bgColor={colorBlenderStore.selectedColors[index]?.value}
    >
      <Autocomplete
        defaultSelectedValue={colorBlenderStore.selectedColors[index]}
        values={colorBlenderStore.colors}
        onChange={colorBlenderStore.getColorsByName}
        onSelect={(value) => colorBlenderStore.setSelectedColor(index, value)}
      />
    </BackgroundColorSection>
  );
});

export default ColorSetterScreen;
