import React, { Component } from 'react'

// Core
import { createAccount } from './lib/xlm'
import { getAccount, getUserPageScopedUserId } from './model'

// Material-UI
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

// Theme
import { deepOrange500 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Font
import 'typeface-roboto'

// Click handler
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// Styles
const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200
  }
}

// Theme
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
})

class App extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      psid: '0'
    }
  }

  async componentDidMount () {
    const psid = await getUserPageScopedUserId()

    // const cachedAccount = await getAccount(this.state.pin, this.state.psid)
    // const account = await createAccount()
    this.setState({
      psid
    })
  }

  onSubmit = e => {
    // No real submit
    e.preventDefault()

    // Get input value
    const pin = this.refs.pin.input.value

    // Set state
    this.setState({
      pin
    })
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <form onSubmit={this.onSubmit}>
            <TextField id='psid' ref='psid' type='text' defaultValue={this.state.psid} />
            <TextField id='pin' ref='pin' floatingLabelText='Your secret number' type='number' defaultValue={this.state.pin} />
            <br />
            <RaisedButton type='submit' label='OK' primary />
          </form>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
