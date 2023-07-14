"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};
export default function QueryClientContext({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>
  );
}
