'use client';

// 参考: https://github.com/khinshankhan/next-themes-app-dir-example

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import React from 'react';

// https://github.com/pacocoursey/next-themes/issues/152#issuecomment-1364280564

export const ThemeProvider = (props: ThemeProviderProps) => {
  return <NextThemesProvider {...props} />;
};
