import { Link, Outlet } from 'react-router-dom'
// import HomePage from './HomePage'

function App() {
  return (
    <>
      <div className="app">
        {/* <h1 className="text-red-500">Fullstack Boilerplate - with Fruits!</h1> */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
