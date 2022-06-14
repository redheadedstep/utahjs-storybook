import React from 'react';
import {MyButton} from "components/MyButton/MyButton";

export default {
  title: 'Components/MyButton',
  component: MyButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: "lg"
  },
};

const Template = (args) => <MyButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: "outline-secondary",
  size: "lg"
};
