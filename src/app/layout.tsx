import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { ReduxProvider } from '@/store/ReduxProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Perago - Employee Hierarchy",
  description: "Organizational Structure Management System",
};

const theme = createTheme({
  primaryColor: 'teal',
  colors: {
    teal: [
      '#e6fcf5',
      '#c3fae8',
      '#96f2d7',
      '#63e6be',
      '#38d9a9',
      '#20c997',
      '#12b886',
      '#0ca678',
      '#099268',
      '#087f5b',
    ],
  },
  fontFamily: inter.style.fontFamily,
  headings: {
    fontFamily: inter.style.fontFamily,
  },
  defaultRadius: 'md',
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <MantineProvider theme={theme}>
            <Notifications position="top-right" zIndex={1000} />
            <ModalsProvider>
              {children}
            </ModalsProvider>
          </MantineProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
