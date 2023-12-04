import { Anchor, AnchorProps, Button, Group, Menu, Modal, Select, Table, Text, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ClusterNetwork, useCluster } from '@pubkey-stack/web-solana-data-access'
import { UiWarning } from '@pubkey-ui/core'
import { useConnection } from '@solana/wallet-adapter-react'
import { IconNetwork, IconNetworkOff, IconTrash } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'

export function ExplorerLink({ path, label, ...props }: { path: string; label: string } & AnchorProps) {
  const { getExplorerUrl } = useCluster()
  return (
    <Anchor href={getExplorerUrl(path)} target="_blank" rel="noopener noreferrer" {...props}>
      {label}
    </Anchor>
  )
}

export function ClusterUiSelect() {
  const { clusters, setCluster, cluster } = useCluster()
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>{cluster.name}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {clusters.map((item) => (
          <Menu.Item
            key={item.name}
            onClick={() => setCluster(item)}
            leftSection={item.active ? <IconNetwork /> : <IconNetworkOff />}
          >
            {item.name}
          </Menu.Item>
        ))}
        <Menu.Divider />
        <Menu.Item component={Link} to="/clusters">
          Manage Clusters
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export function ClusterChecker({ children }: { children: ReactNode }) {
  const { cluster } = useCluster()
  const { connection } = useConnection()

  const query = useQuery({
    queryKey: ['version', { cluster, endpoint: connection.rpcEndpoint }],
    queryFn: () => connection.getVersion(),
    retry: 1,
  })
  if (query.isLoading) {
    return null
  }
  if (query.isError || !query.data) {
    return (
      <UiWarning
        styles={{
          root: { display: 'flex', justifyContent: 'center' },
          title: { justifyContent: 'center' },
        }}
        title="Error connecting to cluster"
        icon={<IconNetworkOff />}
        message={
          <Group justify="center">
            <Text>
              Error connecting to cluster <strong>{cluster.name}</strong>
            </Text>
            <Button variant="light" color="yellow" size="xs" onClick={() => query.refetch()}>
              Refresh
            </Button>
          </Group>
        }
      />
    )
  }
  return children
}

export function ClusterUiModal() {
  const { addCluster } = useCluster()
  const [opened, { close, open }] = useDisclosure(false)
  const [name, setName] = useState('')
  const [network, setNetwork] = useState<ClusterNetwork | undefined>()
  const [endpoint, setEndpoint] = useState('')

  return (
    <>
      <Button onClick={open}>Add Cluster</Button>
      <Modal opened={opened} onClose={close} title="Add Cluster">
        <TextInput type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextInput type="text" placeholder="Endpoint" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
        <Select value={network} onChange={(value) => setNetwork(value as ClusterNetwork)}>
          <option value={undefined}>Select a network</option>
          <option value={ClusterNetwork.Devnet}>Devnet</option>
          <option value={ClusterNetwork.Testnet}>Testnet</option>
          <option value={ClusterNetwork.Mainnet}>Mainnet</option>
        </Select>
        <Button
          onClick={() => {
            addCluster({ name, network, endpoint })
            close()
          }}
        >
          Save
        </Button>
      </Modal>
    </>
  )
}

export function ClusterUiTable() {
  const { clusters, setCluster, deleteCluster } = useCluster()
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name / Network / Endpoint</Table.Th>
          <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {clusters.map((item) => (
          <Table.Tr key={item.name}>
            <Table.Td>
              <Text size="lg">
                {item?.active ? (
                  item.name
                ) : (
                  <Anchor component="button" title="Select cluster" onClick={() => setCluster(item)}>
                    {item.name}
                  </Anchor>
                )}
              </Text>
              <Text size="xs">Network: {item.network ?? 'custom'}</Text>
              <div>{item.endpoint}</div>
            </Table.Td>
            <Table.Td align="right">
              <Button
                disabled={item?.active}
                onClick={() => {
                  if (!window.confirm('Are you sure?')) return
                  deleteCluster(item)
                }}
              >
                <IconTrash size={16} />
              </Button>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
