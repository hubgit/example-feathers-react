// adapted from https://github.com/ENDiGo/pagination-material-ui

import React, { PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

const styles = {
  pagination: {
    borderTop: '1px solid rgb(224, 224, 224)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  elements: {
    display: 'flex',
    alignItems: 'center',
    height: 56,
    marginLeft: 16,
  },
  label: {
    color: '#999',
    fontWeight: 300,
    fontSize: 12,
  }
}

export default class Pagination extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentPage: 1,
      count: 0,
    }
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
  }

  componentDidMount () {
    this.calculatePageCount(this.props.total)
  }

  componentWillReceiveProps (nextProps) {
    this.calculatePageCount(nextProps.total)
  }

  calculatePageCount (total) {
    const { limit } = this.props

    this.setState({
      pageCount: Math.ceil(total / limit)
    })
  }

  nextPage = () => this.changePage(1)

  previousPage = () => this.changePage(-1)

  changePage = (direction) => {
    const { currentPage, pageCount } = this.state

    let nextPage = currentPage + direction

    nextPage = Math.max(nextPage, 0)
    nextPage = Math.min(nextPage, pageCount)

    this.setState({ currentPage: nextPage })
    this.onChange(nextPage)
  }

  onChange = (nextPage) => this.props.onChange(nextPage, this.props.limit)

  render () {
    let { total, limit } = this.props
    let { currentPage, pageCount } = this.state

    if (!total) return <div/>
    // if (total < limit) return <div/>

    let to = currentPage * limit
    let _from = to - limit + 1

    to = Math.min(to, total)

    let showing = 'Showing {from} to {to} of {total}'
      .replace('{total}', String(total))
      .replace('{from}', String(_from))
      .replace('{to}', String(to))

    return (
      <div style={styles.pagination}>
        <div style={styles.elements}>
          <div style={styles.label}>{showing}</div>
          <IconButton
            disabled={currentPage === 1}
            onTouchTap={this.previousPage}>
            <ChevronLeft/>
          </IconButton>
          <IconButton
            disabled={currentPage === pageCount}
            onTouchTap={this.nextPage}>
            <ChevronRight/>
          </IconButton>
        </div>
      </div>
    )
  }
}
