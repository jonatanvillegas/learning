"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export function Provider({ children, ...props }: ThemeProviderProps) {
  // Create a client
const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        {...props}>
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
