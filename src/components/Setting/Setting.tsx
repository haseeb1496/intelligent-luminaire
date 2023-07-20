import { MarkItem, SettingProps } from "./Setting.type";
import { SettingContainer } from "./Setting.style";
import { Slider, Box } from "@mui/material";

const Setting = ({ id, heading, value, handleChange }: SettingProps) => {
  const marks: MarkItem[] = [
    {
      label: "1%",
      value: 1,
    },
  ];

  for (let i = 0; i <= 100; i = i + 5) {
    marks.push({
      label: `${i}%`,
      value: i,
    });
  }

  return (
    <SettingContainer>
      <div className="heading-container">
        <h3 id={`${id}-heading`} className="heading">
          {heading}
        </h3>
        <p id={`${id}-value`} className="setting-value">
          {value}%
        </p>
      </div>
      <Box>
        <Slider
          componentsProps={{ input: { id: `${id}-slider` } }}
          valueLabelDisplay="auto"
          min={0}
          max={100}
          marks={marks}
          step={0}
          onChange={(evt: Event, value: number | number[]) =>
            handleChange(value as number)
          }
          value={value}
        ></Slider>
      </Box>
    </SettingContainer>
  );
};

export default Setting;
