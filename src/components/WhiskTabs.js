import { withStyles } from '@material-ui/core/styles'
import { Tabs } from '@material-ui/core'

const WhiskTabs = withStyles({
  indicator: {
    backgroundColor: '#00d1ff',
  },
})(Tabs);

export default WhiskTabs