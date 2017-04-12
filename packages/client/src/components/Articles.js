import React from 'react'
import feathers from '../feathers'
import { List, ListItem } from 'material-ui/List'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAddIcon from 'material-ui/svg-icons/content/add'
import ContentRemoveIcon from 'material-ui/svg-icons/action/delete'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Form } from 'formsy-react'
import { FormsyText } from 'formsy-material-ui'
import { IconButton } from 'material-ui'
import Pagination from 'pagination-material-ui'
import { Link } from 'react-router-dom'

const service = feathers.service('articles')

export default class Articles extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      items: null,
      open: false
    }
  }

  componentDidMount () {
    this.findItems()
  }

  componentWillReceiveProps () {
    this.findItems()
  }

  componentWillUnmount () {
    this.subscriber.unsubscribe()
  }

  findItems = (currentPage = 1, limit = 5) => {
    if (this.subscriber) {
      this.subscriber.unsubscribe()
    }

    this.subscriber = service.find({
      query: {
        $sort: { title: 1 },
        $limit: limit,
        $skip: (currentPage - 1) * limit
      },
      rx: {
        listStrategy: 'always' // always re-fetch list, to handle removed items
      }
    }).subscribe(items => {
      this.setState({ items })
    })
  }

  paginationChange = (currentPage, limit) => this.findItems(currentPage, limit)

  openForm = () => this.setState({ open: true })

  closeForm = () => this.setState({ open: false }) && this.form.reset()

  submitForm = () => this.form.submit()

  createItem = (data) => service.create(data).then(this.closeForm)

  removeItem = (id) => service.remove(id)

  render () {
    const { items, open } = this.state

    return items && (
      <div style={{ maxWidth: 600 }}>
        <List>
          { items.data.map(item => (
            <ListItem key={item._id} primaryText={item.title} rightIconButton={
              <IconButton touch={true} onTouchTap={() => this.removeItem(item._id)}>
                <ContentRemoveIcon color="#aaa"/>
              </IconButton>
            } containerElement={<Link to={`/articles/${item._id}`}/>}/>
          )) }
        </List>

        <Pagination onChange={this.paginationChange} total={items.total} limit={items.limit}/>

        <FloatingActionButton onTouchTap={this.openForm} style={{ margin: 10 }}>
          <ContentAddIcon/>
        </FloatingActionButton>

        <Dialog open={open} modal={true} onRequestClose={this.closeForm} title="Add" actions={[
          <FlatButton label="Cancel" primary={false} onTouchTap={this.closeForm} />,
          <FlatButton label="Save" primary={true} onTouchTap={this.submitForm} />
        ]}>
          <Form onValidSubmit={this.createItem} ref={form => (this.form = form)}>
            <FormsyText name="title" required autoFocus fullWidth={true} floatingLabelText="Title"/>
          </Form>
        </Dialog>
      </div>
    )
  }
}
