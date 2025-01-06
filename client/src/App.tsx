import { Header } from './Header';
import { EntryForm } from './EntryForm';
import { EntriesList } from './EntriesList';
import { NoEntries } from './NoEntries';
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<EntriesList />} />
          <Route path="entry-form/:id?" element={<EntryForm />} />
          <Route path="*" element={<NoEntries />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
