import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'

// Store type from Redux
import { Store } from 'redux'

// Import the store function and state
import configureStore from './store/configureStore'
import { IAppState } from './reducers/rootReducer'
// import './index.css'
import './styles/_main.scss'

import App from './components/App'

interface IProps {
  store: Store<IAppState>
}

/* 
Create a root component that receives the store via props
and wraps the App component with Provider, giving props to containers
*/
const Root = (props: IProps) => {
  return (
    <Provider store={props.store}>
      <App />
    </Provider>
  )
}

// Generate the store
const store = configureStore()

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<Root store={store} />)
