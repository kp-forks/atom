import {createTheme} from '@shopify/restyle'


import SIZES from '@lib/theme/sizes'


const palette = {
  offBlack: '#252525',
  purpleLight: '#ebb0e6',
  purple: '#6B24AA',
  purplePrimary: '#6B24AA',
  pinkPrimary: '#AC2688',
  transparentPurple: 'rgba(157, 1, 144, 0.4)',
  purpleDark: '#511b80',
  red: '#fd3a69',
  lightGreen: '#bcf5bc',
  greenPrimary: '#0ECD9D',
  darkGreen: '#024502',
  textBlack: '#221D23',
  black: '#000000',
  white: '#F0F2F3',
  darkGray: '#2e2e2e',
  lightGray: '#d7d8d9',
  FACEBOOK: '#3B5998',
  TWITTER: '#5BC0DE',
  PRIMARY: '#B23AFC',
  INFO: '#1232FF',
  ERROR: '#FE2472',
  WARNING: '#FF9C09',
  SUCCESS: '#45DF31',
  INPUT: '#808080',
  PLACEHOLDER: '#9FA5AA',
  NAVBAR: '#F9F9F9',
  BLOCK: '#808080',
  shadowColor: '#AC2688',
  // '#808080'
  ICON: '#000000',
  grey: '#898989',
  MUTED: '#9FA5AA',
  WARN: '#FF963C',
  regularCardBackground: '#EEEEEE',
  transparent: 'rgba(0,0,0,0)',
  black60: 'rgba( 0, 0, 0, .6 )',
  carbs: '#e89740',
  protein: '#32a9e6',
  fat: '#8277ca',
  link: '#00376b',
  backgroundLink: '#47a5ff',
  disabled: '#EEE',
};


const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.textBlack,

    regularCardBackground: palette.white,
    regularCardText: palette.textBlack,

    lightRegularCardBackground: palette.transparentPurple,
    lightRegularCardText: palette.textBlack,
    lightRegularCardIcon: palette.purplePrimary,

    darkCardBackground: palette.darkGray,
    darkCardText: palette.white,

    secondaryCardBackground: palette.purpleLight,
    secondaryCardText: palette.textBlack,

    toastBreakBackground: palette.greenPrimary,

    primaryCardBackground: palette.purplePrimary,
    primaryCardText: palette.white,
    buttonIconBackground: palette.transparent,
    iconColor: palette.purplePrimary,
    link: palette.link,
    backgroundLink: palette.backgroundLink,
    greyLink: palette.darkGray,
    buttonLink: palette.purplePrimary,
    redLink: palette.red,
    buttonText: palette.white,
    primaryButtonText: palette.black,
    followingButtonText: palette.black,
    body: palette.textBlack,
    commentPost: palette.purplePrimary,
    shadowColor: palette.shadowColor,
    transparent: palette.transparent,
  },
  borderRadii: {
    cardRadius: SIZES.CARD_ROUNDED,
  },
  spacing: {
    none: 0,
      xxs: 2,
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 40,
      xxl: 80,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    backgroundText: {
      // fontFamily: tokens.fontStackBase,
      fontWeight: 'bold',
      fontSize: 48,
      // lineHeight: 42.5,
      textAlign: 'center',
      // color: 'greyLink',
    },
    header: {
      // fontFamily: tokens.fontStackBase,
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      // color: 'mainForeground',
      textAlign: 'center',
    },
    subheader: {
      // fontFamily: tokens.fontStackBase,
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      // color: 'mainForeground',
    },
    subheaderNormal: {
      // fontFamily: tokens.fontStackBase,
      fontWeight: '400',
      fontSize: 28,
      lineHeight: 36,
      // color: 'mainForeground',
    },
    rating: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: 24,
      // color: 'body',
    },
    subheaderBold: {
      // fontFamily: tokens.fontStackBase,
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: 36,
      // color: 'mainForeground',
    },
    subTitle: {
      // fontFamily: tokens.fontStackBase,
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      // color: 'greyLink',
      textTransform: 'uppercase',
    },
    primaryHeader: {
      // fontFamily: tokens.fontStackBase,
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      // color: 'primaryCardText',
      textAlign: 'center',
    },
    primarySecondaryHeader: {
      // fontFamily: tokens.fontStackBase,
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      // color: 'primaryCardText',
    },
    secondaryHeaderLink: {
      // fontFamily: tokens.fontStackBase,
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'buttonLink',
    },
    lightRegularHeader: {
      // fontFamily: tokens.fontStackBase,
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      // color: 'lightRegularCardText',
      textAlign: 'center',
    },
    lightRegularSubheader: {
      // fontFamily: tokens.fontStackBase,
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      // color: 'lightRegularCardText',
    },
    body: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 16,
      lineHeight: 24,
      // color: 'body',
    },
    bodyBold: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    google: {
      // color: 'mainBackground',
      fontSize: 19,
      lineHeight: 24,
      fontWeight: "500",
    },
    apple: {
      // color: 'mainBackground',
      // fontFamily: tokens.fontStackBase,
      fontSize: 19,
      lineHeight: 24,
      fontWeight: "500",
    }, 
    comment: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 16,
      lineHeight: 24,
      // color: 'body',
    },
    username: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 16,
      lineHeight: 24,
      // color: 'body',
      fontWeight: 'bold',
    },
    caption: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 16,
      lineHeight: 24,
      // color: 'greyLink',
    },
    toDoButton: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 12,
      lineHeight: 14,
      // color: 'greyLink',
    },
    cardCaption: {
      // fontFamily: tokens.fontStackBase,
      fontSize: SIZES.FONT * 0.875,
      lineHeight: 24,
      // color: 'greyLink',
    },
    cardTitle: {
      // fontFamily: tokens.fontStackBase,
      fontSize: SIZES.FONT * 1.2,
      lineHeight: 24,
      // color: 'body',
    },
    cardLink: {
      // fontFamily: tokens.fontStackBase,
      fontSize: SIZES.FONT * 0.875,
      lineHeight: 24,
      color: 'buttonLink',
    },
    greyComment: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 16,
      lineHeight: 24,
      // color: 'greyLink',
    },
    optionHeader: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 20,
      lineHeight: 24,
      padding: 'xs',

    },
    primaryOptionHeader: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 20,
      lineHeight: 24,

    },
    menuHeader: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 60,
      // lineHeight: 24,
      // color: 'body',
    },
    buttonLink: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 20,
      // lineHeight: 24,
      color: 'buttonLink',
    },
    greyLink: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 20,
      lineHeight: 24,
      // color: 'greyLink',
    },
    redLink: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 20,
      lineHeight: 24,
      // color: 'redLink',
    },
    buttonText: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 20,
      lineHeight: 24,
      // color: 'buttonText',
    },
    primaryButtonText: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 20,
      lineHeight: 24,
      // color: 'primaryButtonText',
    },
    followingButtonText: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 20,
      lineHeight: 24,
      // color: 'followingButtonText',
    },
    commentPost: {
      // fontFamily: tokens.fontStackBase,
      fontSize: 18,
      lineHeight: 24,
      // color: 'commentPost',
    },
  },
  cardVariants: {
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
      marginVertical: {
        phone: 's',
        tablet: 'm',
      },
      padding: {
        phone: 's',
        tablet: 'm',
      },
      borderRadius: {
        phone: 'cardRadius',
        tablet: 'cardRadius',
      },
      borderWidth: SIZES.CARD_BORDER_WIDTH,
      borderColor: 'shadowColor',
      // overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    regular: {
      // We can refer to other values in the theme here, and use responsive props
      backgroundColor: 'regularCardBackground',
      
    },
    elevated: {
      borderWidth: 0,
      shadowColor: 'shadowColor',
      shadowOpacity: SIZES.BLOCK_SHADOW_OPACITY,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: SIZES.BLOCK_SHADOW_RADIUS,
      elevation: SIZES.ANDROID_ELEVATION,
      
    },
    primaryElevated: {
      borderWidth: 0,
      backgroundColor: 'primaryCardBackground',
      shadowColor: 'shadowColor',
      shadowOpacity: SIZES.BLOCK_SHADOW_OPACITY,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: SIZES.BLOCK_SHADOW_RADIUS,
      elevation: SIZES.ANDROID_ELEVATION,
      
    },
    miniElevated: {
      borderWidth: 0,
      shadowColor: 'shadowColor',
      shadowOpacity: SIZES.BLOCK_SHADOW_OPACITY,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: SIZES.BLOCK_SHADOW_RADIUS,
      elevation: SIZES.ANDROID_ELEVATION,
      
    },
  },
});

export type Theme = typeof theme;

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.offBlack,
    mainForeground: palette.white,

    secondaryCardBackground: palette.purpleDark,
    secondaryCardText: palette.white,

    toastBreakBackground: palette.greenPrimary,

    regularCardBackground: palette.darkGray,
    regularCardText: palette.white,

    lightRegularCardBackground: palette.textBlack,
    lightRegularCardText: palette.white,
    lightRegularCardIcon: palette.white,

    darkCardBackground: palette.white,
    darkCardText: palette.textBlack,

    primaryCardBackground: palette.white,
    primaryCardText: palette.textBlack,
    buttonIconBackground: palette.transparent,
    iconColor: palette.white,
    link: palette.pinkPrimary,
    backgroundLink: palette.textBlack,
    greyLink: palette.lightGray,
    buttonLink: palette.pinkPrimary,
    buttonText: palette.white,
    redLink: palette.white,
    primaryButtonText: palette.white,
    followingButtonText: palette.white,
    body: palette.white,
    commentPost: palette.white,
    transparent: palette.transparent,
  },
}



// export default theme;
export {
  darkTheme,
  theme,
  palette,
 }
