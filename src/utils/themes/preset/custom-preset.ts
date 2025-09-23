import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import presetVariables from './preset-variables';

export const CustomPreset = definePreset(Aura, presetVariables);
export default CustomPreset;
