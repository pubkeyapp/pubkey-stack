import { Program, ProgramAccount } from '@coral-xyz/anchor'
import { Counter } from '@pubkey-stack/anchor'
import { createContext, ReactNode, useContext } from 'react'
import { useCounterProgram } from './use-counter-program'

export interface CounterProgramAccountProviderContext {
  account: ProgramAccount<{ count: number }>
  program: Program<Counter>
}

const Context = createContext<CounterProgramAccountProviderContext>({} as CounterProgramAccountProviderContext)

export function CounterProgramAccountProvider({
  account,
  children,
}: {
  account: ProgramAccount<{ count: number }>
  children: ReactNode
}) {
  const program = useCounterProgram()

  return (
    <Context.Provider
      value={{
        account,
        program,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useCounterProgramAccount() {
  return useContext(Context)
}
