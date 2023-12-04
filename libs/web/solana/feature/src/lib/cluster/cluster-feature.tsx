import { UiPage } from '@pubkey-ui/core'

import { ClusterUiModal, ClusterUiTable } from './cluster-ui'

export default function ClusterFeature() {
  return (
    <UiPage title="Clusters" rightAction={<ClusterUiModal />}>
      <ClusterUiTable />
    </UiPage>
  )
}
