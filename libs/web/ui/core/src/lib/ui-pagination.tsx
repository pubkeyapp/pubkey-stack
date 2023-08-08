import { Group, Pagination, Select } from '@mantine/core'
import { usePagination } from '@mantine/hooks'
import { useMemo } from 'react'

export function useUiPagination({
  skip,
  take,
  total,
  setTake,
  setSkip,
}: {
  total: number
  take: number
  skip: number
  setTake: (take: number) => void
  setSkip: (skip: number) => void
}) {
  return { skip, take, total, setTake, setSkip }
}

export type UiPaginationProps = ReturnType<typeof useUiPagination>

export function UiPagination({
  pagination: { total, skip, setSkip, setTake, take },
}: {
  pagination: UiPaginationProps
}) {
  const page = useMemo(() => (skip ?? 0) / (take ?? 0) + 1, [skip, take])
  const pagination = usePagination({
    page,
    total: total ?? 0,
    initialPage: 1,
    onChange: (page) => {
      setSkip((page - 1) * (take ?? 0))
    },
  })
  const pages = useMemo(() => Math.ceil(total / (take ?? 0)), [total, take])

  return (
    <Group position="apart">
      <Pagination
        value={pagination.active}
        total={pages}
        onChange={(page) => pagination.setPage(page)}
        onNextPage={() => pagination.next()}
        onPreviousPage={() => pagination.previous()}
      />
      <Select
        sx={{ width: 90 }}
        value={take.toString()}
        onChange={(value) => {
          setSkip(0)
          setTake(parseInt(value ?? '10'))
        }}
        data={[
          { value: '5', label: '5' },
          { value: '10', label: '10' },
          { value: '20', label: '20' },
          { value: '50', label: '50' },
          { value: '100', label: '100' },
          { value: '200', label: '200' },
          { value: '500', label: '500' },
          { value: '1000', label: '1000' },
        ]}
      />
    </Group>
  )
}
