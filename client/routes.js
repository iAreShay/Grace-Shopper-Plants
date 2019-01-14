import React from 'react'
import {connect} from 'react-redux'
import {Redirect, withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import AllPlants from './components/AllPlants'
import SinglePlant from './components/SinglePlant'
import AllOrders from './components/AllOrders'
import SingleOrder from './components/SingleOrder'
import Home from './components/Home'
import Cart from './components/Cart'

/**
 * COMPONENT
 */
class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div id="switch">
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/" component={Home} />
          <Route exact path="/plants" component={AllPlants} />
          <Route exact path="/plants/:plantId" component={SinglePlant} />
          <Route exact path="/users/:userId/orders" component={AllOrders} />
          <Route exact path="/cart" component={Cart} />
          <Route
            exact
            path="/users/:userId/orders/:orderId"
            component={SingleOrder}
          />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/home" component={UserHome} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          {/* <Redirect from="*" to="/" /> */}
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
