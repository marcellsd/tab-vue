import TabItens from "../components/TabItens.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Tabs/Item',
  component: TabItens,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TabItens },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<TabItens v-bind="args" />',
});

export const Item1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Item1.args = {
  tabNames: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'],
  tabTexts: ['Texto Tab 1', 'Texto Tab 2', 'Texto Tab 3', 'Texto Tab 4', 'Texto Tab 5'],
  selection: 0
};

export const Item2 = Template.bind({});
Item2.args = {
  tabNames: ['Tab 1', 'Tab 2', 'Tab 3'],
  tabTexts: ['Texto Tab 1', 'Texto Tab 2', 'Texto Tab 3'],
  selection:1
};