import './App.css';
import { ArticlesList } from './components/ArticlesList';
import {SearchBar} from './components/SearchBar'

function App() {
  return (
    <div className='flex flex-col items-center p-10 min-h-screen'>
        <h1 className='m-10 text-5xl font-extrabold'>Gossip Search 🤫</h1>
        <SearchBar/>
        <ArticlesList/>
    </div>
  );
}

export default App;
