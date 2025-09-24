const basicVariants = ['primary', 'disabled'] as const;
const colorsVariants = ['status', 'text', 'grayscale', 'uiComponents'] as const;
const mainVariantsAttrsNames = ['base', 'hover', 'border'] as const;
const statusColors = ['success', 'failure'] as const;
const textColors = ['base', 'black', 'white'] as const;
const grayscale = [
  'black',
  'gray26',
  'gray60',
  'gray80',
  'gray90',
  'lightGray',
  'background',
  'rowHighlight',
] as const;
const otherColors = [
  'prodCardVeil',
  'landingPageBanner',
  'grayedOut',
  'background',
  'quickNote',
  'rowGray',
  'tagBlue',
  'tagGreen',
] as const;

type ColorFormat = `#${string}` | 'none' | 'inherit' | 'transparent';

type BasicVariants = (typeof basicVariants)[number];
type ColorsVariants = (typeof colorsVariants)[number];
type ColorsVariantsAttrsNames = (typeof mainVariantsAttrsNames)[number];
type StatusColors = (typeof statusColors)[number];
type TextColors = (typeof textColors)[number];
type GrayscaleColors = (typeof grayscale)[number];
type OtherColors = (typeof otherColors)[number];

type MainColorsAttrs = Record<ColorsVariantsAttrsNames, ColorFormat>;
type StatusColorsAttrs = Record<StatusColors, ColorFormat>;
type TextColorsAttrs = Record<TextColors, ColorFormat>;
type GrayscaleColorsAttrs = Record<GrayscaleColors, ColorFormat>;
type OtherColorsAttrs = Record<OtherColors, ColorFormat>;

type ColorObject = {
  StatusColorsAttrs: StatusColorsAttrs;
  TextColorsAttrs: TextColorsAttrs;
  GrayscaleColorsAttrs: GrayscaleColorsAttrs;
  OtherColorsAttrs: OtherColorsAttrs;

  UiComponentsColorsAttrs: {
    inputs: {
      default: ColorFormat;
      active: ColorFormat;
    };
    cards: {
      background: ColorFormat;
      border: ColorFormat;
    };
    tags: {
      blue: ColorFormat;
      green: ColorFormat;
    };
    banner: ColorFormat;
    notes: ColorFormat;
    links: ColorFormat;
  };
};

type BasicObject = {
  [key in BasicVariants]: MainColorsAttrs;
};

type ColorsObject = {
  [key in ColorsVariants]: ColorObject[Capitalize<`${key}ColorsAttrs`>];
};

export type Theme = {
  id: string;
  logo: { name: string; size: [number, number]; color: string };
  colors: BasicObject & ColorsObject;
  layouts: any;
  fonts: any;
};
