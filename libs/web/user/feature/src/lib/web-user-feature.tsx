import styles from './web-user-feature.module.css'

/* eslint-disable-next-line */
export interface WebUserFeatureProps {}

export default function WebUserFeature(props: WebUserFeatureProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WebUserFeature!</h1>
    </div>
  )
}
