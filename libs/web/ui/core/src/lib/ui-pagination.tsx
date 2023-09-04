import { Group, Pagination, Select } from '@mantine/core'
import { usePagination } from '@mantine/hooks'
import { useMemo } from 'react'

export function useUiPagination({
  page,
  limit,
  total,
  setLimit,
  setPage,
}: {
  total: number
  limit: number
  page: number
  setLimit: (limit: number) => void
  setPage: (page: number) => void
}) {
  return { page, limit, total, setLimit, setPage }
}

export type UiPaginationProps = ReturnType<typeof useUiPagination>

export function UiPagination({
  pagination: { total, page, setPage, setLimit, limit },
}: {
  pagination: UiPaginationProps
}) {
  const pagination = usePagination({
    page,
    total: total ?? 0,
    initialPage: 1,
    onChange: setPage,
  })
  const pages = useMemo(() => Math.ceil(total / (limit ?? 0)), [total, limit])

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
        value={limit.toString()}
        onChange={(value) => {
          setPage(1)
          setLimit(parseInt(value ?? '10'))
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
