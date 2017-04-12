import React from 'react'
import feathers from '../feathers'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentEditIcon from 'material-ui/svg-icons/editor/mode-edit'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Form } from 'formsy-react'
import { FormsyText } from 'formsy-material-ui'

const service = feathers.service('articles')

export default class Articles extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      article: null,
      open: false
    }
  }

  componentDidMount () {
    this.fetchArticle(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.fetchArticle(nextProps)
  }

  componentWillUnmount () {
    this.subscriber.unsubscribe()
  }

  fetchArticle = (props) => {
    const id = props.match.params.articleId

    if (this.subscriber) {
      this.subscriber.unsubscribe()
    }

    this.subscriber = service.get(id).subscribe(article => {
      this.setState({ article })
    })
  }

  openForm = () => this.setState({ open: true })

  closeForm = () => this.setState({ open: false }) && this.form.reset()

  submitForm = () => this.form.submit()

  updateItem = (data) => {
    const { article } = this.state

    service.patch(article._id, data).then(this.closeForm)
  }

  render () {
    const { article, open } = this.state

    return article && (
        <div style={{ maxWidth: 600 }}>

          <div>{ article.title }</div>

          <FloatingActionButton onTouchTap={this.openForm} style={{ margin: 10 }}>
            <ContentEditIcon/>
          </FloatingActionButton>

          <Dialog open={open} modal={true} onRequestClose={this.closeForm} title="Edit" actions={[
            <FlatButton label="Cancel" primary={false} onTouchTap={this.closeForm}/>,
            <FlatButton label="Save" primary={true} onTouchTap={this.submitForm}/>
          ]}>
            <Form onValidSubmit={this.updateItem} ref={form => (this.form = form)}>
              <FormsyText name="title" value={article.title} required autoFocus fullWidth={true}
                          floatingLabelText="Title"/>
            </Form>
          </Dialog>
        </div>
      )
  }
}
