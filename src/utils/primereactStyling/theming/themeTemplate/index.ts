import { type Theme } from './theme.types';

const THEME_NTRAL: Theme = {
  id: 'Neutral',
  logo: { name: 'neutralLogo', size: [48, 48], color: '#B9BAB6' },

  colors: {
    primary: {
      base: '#B9BAB6',
      hover: '#E6E5E1',
      border: '#2360c5',
    },
    disabled: {
      base: '#B2B2B2',
      hover: 'none',
      border: '#2360c5',
    },
    status: {
      success: '#187431',
      failure: '#ff3d32',
    },
    text: {
      base: '#38383C',
      black: '#000000',
      white: '#ffffff',
    },
    grayscale: {
      black: '#000000',
      gray26: '#262626',
      gray60: '#666666',
      gray80: '#333333',
      gray90: '#191919',
      lightGray: '#B2B2B2',
      background: '#FAFAFA',
      rowHighlight: '#3F3F3F',
    },
    uiComponents: {
      inputs: {
        default: '#96DCFA',
        active: '#63ADDF',
      },
      cards: {
        background: '#FFFFFF99',
        border: '#218076',
      },
      tags: {
        blue: '#6CB7B0',
        green: '#497E76',
      },
      banner: '#D9D9D9',
      notes: '#E8F4FC',
      links: '#0D39DF',
    },
  },

  fonts: {
    default: {
      fontFamily: 'TeleNeoWeb, FontAwesome, sans-serif ',
      color: '#38383C',
    },

    base: {
      regular: {
        'font-size': '18px',
        'font-weight': '400',
        'line-height': '27px',
      },
      bold: {
        'font-size': '18px',
        'font-weight': 'bold',
        'line-height': '27px',
      },
    },

    h1: {
      regular: {
        'font-size': '36px',
        'font-weight': '400',
        'line-height': '54px',
      },
      bold: {
        'font-size': '36px',
        'font-weight': 'bold',
        'line-height': '54px',
      },
    },

    h2: {
      regular: {
        'font-size': '28px',
        'font-weight': '400',
        'line-height': '42px',
      },
      bold: {
        'font-size': '28px',
        'font-weight': 'bold',
        'line-height': '42px',
      },
    },

    h3: {
      regular: {
        'font-size': '23px',
        'font-weight': '400',
        'line-height': '34px',
      },
      bold: {
        'font-size': '23px',
        'font-weight': 'bold',
        'line-height': '34px',
      },
    },

    text: {
      regular: {
        'font-size': '12px',
        'font-weight': '400',
        'line-height': '14px',
      },
      bold: {
        'font-size': '12px',
        'font-weight': 'bold',
        'line-height': '14px',
      },
    },

    subtext: {
      regular: {
        'font-size': '14px',
        'font-weight': '400',
        'line-height': '21px',
      },
      bold: {
        'font-size': '14px',
        'font-weight': 'bold',
        'line-height': '21px',
      },
      small: {
        'font-size': '12px',
        'font-weight': '400',
        'line-height': '18px',
      },
    },

    textlink: {
      regular: {
        'font-size': '18px',
        'font-weight': '400',
        'line-height': '27px',
      },
      bold: {
        'font-size': '18px',
        'font-weight': 'bold',
        'line-height': '27px',
      },
    },

    input: {
      regular: {
        'font-size': '18px',
        'font-weight': '400',
        'line-height': '24px',
      },
      bold: {
        'font-size': '18px',
        'font-weight': 'bold',
        'line-height': '24px',
      },
    },

    header: {
      tabs: {
        regular: {
          'font-size': '14px',
          'font-weight': '400',
          'line-height': '21px',
        },
      },
    },
  },

  layouts: {
    header: {
      base: {
        display: 'flex',
        width: '100%',
        'background-color': '#ffffff',
        padding: '0px 24px 0px 0px',
        gap: '18px',
        'box-shadow': '0px 4px 4px 0px #0000001f',

        color: '#38383C',
        activeColor: '#B9BAB6',
      },

      logo: {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        height: '120px',
        'min-width': '118px',
        'background-color': '#B9BAB6',
        color: '#ffffff',
      },

      menu: {
        base: {
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'space-between',
          padding: '10px 0px 30px 0px',
          width: '100%',
        },

        upperSection: {
          base: {
            display: 'flex',
            'justify-content': 'space-between',
            'align-items': 'center',
          },

          tabs: {
            base: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              cursor: 'pointer',
            },
            container: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              gap: '16px',
            },
          },

          clientTypes: {
            gap: '16px',
          },

          other: { gap: '16px' },
        },

        lowerSection: {
          base: {
            display: 'flex',
            'justify-content': 'space-between',
            'align-items': 'center',
          },

          tabs: {
            base: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              cursor: 'pointer',
              'text-decoration': 'none',
              'white-space': 'nowrap',
            },
            container: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              'background-color': 'transparent',
              gap: '48px',
            },

            iconsContainer: {
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              'background-color': 'transparent',
              gap: '30px',
            },
          },

          icons: {
            gap: '30px',
            width: '24px',
            height: '24px',
          },
        },
      },
    },
  },
};
type CMSThemes = { [key: string]: Theme };

const Themes: CMSThemes = {
  Neutral: THEME_NTRAL,
};

export const getTheme = (name: string) => Themes[name];
